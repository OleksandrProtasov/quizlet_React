export function ResultScreen({ deck, run, onReplay, onHome }) {
  const { correct, total, maxStreak, xp, newRecord } = run;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="shell shell--result">
      <div className="result-hero" style={{ '--deck-accent': deck.accent }}>
        <p className="eyebrow">Run complete</p>
        <h1 className="headline">{newRecord ? 'New personal best' : 'Solid attempt'}</h1>
        <p className="lede lede--tight">
          {deck.title} · {correct}/{total} correct · {accuracy}% accuracy
        </p>
      </div>

      <div className="stat-board">
        <div className="stat-tile">
          <span className="stat-tile__label">XP earned</span>
          <span className="stat-tile__value">{xp}</span>
          <span className="stat-tile__hint">Weighted by streak peaks</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Best streak</span>
          <span className="stat-tile__value">×{maxStreak}</span>
          <span className="stat-tile__hint">Consecutive correct</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Focus grade</span>
          <span className="stat-tile__value">{gradeLabel(accuracy)}</span>
          <span className="stat-tile__hint">{accuracy}% precision</span>
        </div>
      </div>

      <div className="actions-row">
        <button type="button" className="btn btn--ghost" onClick={onHome}>
          All decks
        </button>
        <button type="button" className="btn btn--primary" onClick={onReplay}>
          Replay deck
        </button>
      </div>
    </div>
  );
}

function gradeLabel(accuracy) {
  if (accuracy >= 90) return 'S';
  if (accuracy >= 75) return 'A';
  if (accuracy >= 60) return 'B';
  if (accuracy >= 40) return 'C';
  return 'D';
}
