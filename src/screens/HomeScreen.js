import { DECKS } from '../data/decks';
import { loadBest } from '../utils/storage';

export function HomeScreen({ theme, onToggleTheme, onSelectDeck }) {
  return (
    <div className="shell shell--home">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark" aria-hidden>
            ◐
          </span>
          <div>
            <p className="eyebrow">PulseQuiz / 2026</p>
            <h1 className="headline">Adaptive knowledge runs</h1>
          </div>
        </div>
        <button
          type="button"
          className="icon-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? '☼' : '☾'}
        </button>
      </header>

      <p className="lede">
        Pick a deck. Each round shuffles answers, enforces a focused timer, and surfaces an
        explanation — closer to how modern learning products teach, not just score.
      </p>

      <div className="deck-grid">
        {DECKS.map((deck) => {
          const best = loadBest(deck.id);
          const bestPct =
            best != null ? `${Math.round(best * 100)}% personal best` : 'No run yet';

          return (
            <button
              key={deck.id}
              type="button"
              className="deck-card"
              onClick={() => onSelectDeck(deck)}
              style={{ '--deck-accent': deck.accent }}
            >
              <span className="deck-card__icon" aria-hidden>
                {deck.icon}
              </span>
              <div className="deck-card__body">
                <h2>{deck.title}</h2>
                <p>{deck.subtitle}</p>
                <span className="deck-card__meta">{bestPct}</span>
              </div>
              <span className="deck-card__chevron" aria-hidden>
                →
              </span>
            </button>
          );
        })}
      </div>

      <footer className="footnote">
        Keyboard hints in-run: <kbd>1</kbd>–<kbd>4</kbd> choose, <kbd>Enter</kbd> continues after
        reveal.
      </footer>
    </div>
  );
}
