import { useCallback, useEffect, useMemo, useState } from 'react';
import { SECONDS_PER_QUESTION } from '../data/decks';
import { shuffleQuestionOptions } from '../utils/shuffleQuestionOptions';

export function GameScreen({ deck, onExit, onFinish }) {
  const total = deck.questions.length;
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [phase, setPhase] = useState('playing'); // playing | revealed
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);

  const question = deck.questions[index];

  const shuffled = useMemo(
    () => shuffleQuestionOptions(question),
    [question]
  );

  const isLast = index >= total - 1;

  const finalizeRun = useCallback(
    (nextCorrect, nextMaxStreak) => {
      const xpBase = nextCorrect * 14;
      const xpStreak = nextMaxStreak * 5;
      const xp = Math.round(xpBase + xpStreak);
      onFinish({
        correct: nextCorrect,
        total,
        maxStreak: nextMaxStreak,
        xp,
      });
    },
    [onFinish, total]
  );

  const goReveal = useCallback(
    (pickedIndex, wasTimeout) => {
      const isCorrect = !wasTimeout && pickedIndex === shuffled.correctShuffledIndex;
      setPhase('revealed');
      setSelectedIndex(pickedIndex ?? -1);
      setTimedOut(wasTimeout);

      if (isCorrect) {
        setStreak((s) => {
          const ns = s + 1;
          setMaxStreak((m) => Math.max(m, ns));
          return ns;
        });
      } else {
        setStreak(0);
      }
    },
    [shuffled.correctShuffledIndex]
  );

  useEffect(() => {
    if (phase !== 'playing') return undefined;

    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          goReveal(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [phase, index, question.id, goReveal]);

  const advance = useCallback(() => {
    if (phase !== 'revealed') return;

    const isCorrect = !timedOut && selectedIndex === shuffled.correctShuffledIndex;
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);

    if (isLast) {
      finalizeRun(nextCorrect, maxStreak);
      return;
    }

    setCorrectCount(nextCorrect);
    setIndex((i) => i + 1);
    setPhase('playing');
    setSelectedIndex(null);
    setTimedOut(false);
    setTimeLeft(SECONDS_PER_QUESTION);
  }, [
    phase,
    timedOut,
    selectedIndex,
    shuffled.correctShuffledIndex,
    isLast,
    correctCount,
    maxStreak,
    finalizeRun,
  ]);

  useEffect(() => {
    const onKey = (e) => {
      if (phase === 'playing') {
        const n = Number(e.key);
        if (n >= 1 && n <= 4) {
          const choice = n - 1;
          if (choice < shuffled.options.length) {
            goReveal(choice, false);
          }
        }
        return;
      }

      if (phase === 'revealed' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        advance();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, shuffled.options.length, goReveal, advance]);

  const onPick = (i) => {
    if (phase !== 'playing') return;
    goReveal(i, false);
  };

  const pct = Math.round(((index + (phase === 'revealed' ? 1 : 0)) / total) * 100);
  const timerRing = Math.max(0, Math.min(1, timeLeft / SECONDS_PER_QUESTION));

  return (
    <div className="shell shell--game">
      <header className="game-top">
        <button type="button" className="linkish" onClick={onExit}>
          ← Decks
        </button>
        <div className="game-top__meta">
          <span className="pill pill--ghost">{deck.title}</span>
          {streak > 1 && (
            <span className="pill pill--hot" aria-live="polite">
              Streak ×{streak}
            </span>
          )}
        </div>
      </header>

      <div className="progress-line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="game-grid">
        <div className="question-card">
          <div className="question-card__toolbar">
            <span className={`diff diff--${question.difficulty}`}>{question.difficulty}</span>
            <span className="q-index">
              {index + 1} / {total}
            </span>
          </div>

          <h2 className="question-title">{question.text}</h2>

          <div className="options" role="list">
            {shuffled.options.map((label, i) => {
              const locked = phase !== 'playing';
              const isSel = selectedIndex === i;
              const isCorrect = i === shuffled.correctShuffledIndex;
              let state = '';
              if (phase === 'revealed') {
                if (isCorrect) state = 'is-correct';
                else if (isSel && !isCorrect) state = 'is-wrong';
                else if (!isCorrect) state = 'is-muted';
              }

              return (
                <button
                  key={label}
                  type="button"
                  role="listitem"
                  className={`option ${state}`}
                  disabled={locked}
                  onClick={() => onPick(i)}
                >
                  <span className="option__kbd" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="option__text">{label}</span>
                </button>
              );
            })}
          </div>

          {phase === 'revealed' && (
            <div className="explain" role="status">
              <p className="explain__title">
                {timedOut
                  ? 'Time expired — here is the ideal pick'
                  : selectedIndex === shuffled.correctShuffledIndex
                    ? 'Exactly right'
                    : 'Here is why the marked answer wins'}
              </p>
              <p className="explain__body">{question.explanation}</p>
              <button type="button" className="btn btn--primary btn--block" onClick={advance}>
                {isLast ? 'View results' : 'Next question'}
              </button>
            </div>
          )}
        </div>

        <aside className="side-panel" aria-label="Timer">
          <div
            className="timer"
            style={{ '--ring': deck.accent, '--p': timerRing }}
            data-low={timeLeft <= 6 && phase === 'playing' ? 'true' : 'false'}
          >
            <svg viewBox="0 0 120 120" className="timer__svg" aria-hidden>
              <circle className="timer__track" cx="60" cy="60" r="52" />
              <circle className="timer__arc" cx="60" cy="60" r="52" />
            </svg>
            <div className="timer__label">
              <span className="timer__value">{timeLeft}</span>
              <span className="timer__unit">sec</span>
            </div>
          </div>
          <p className="side-panel__hint">
            Momentum scoring rewards streaks. Wrong answers reset the chain but never hide the
            teaching moment.
          </p>
        </aside>
      </div>
    </div>
  );
}
