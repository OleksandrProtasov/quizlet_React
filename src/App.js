import { useEffect, useState } from 'react';
import './index.scss';
import { HomeScreen } from './screens/HomeScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { loadTheme, saveTheme, saveBestIfBetter } from './utils/storage';

export default function App() {
  const [theme, setTheme] = useState(loadTheme);
  const [screen, setScreen] = useState('home');
  const [deck, setDeck] = useState(null);
  const [lastRun, setLastRun] = useState(null);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  const startDeck = (d) => {
    setDeck(d);
    setRunKey((k) => k + 1);
    setScreen('game');
  };

  const handleFinish = (run) => {
    if (!deck) return;
    const newRecord = saveBestIfBetter(deck.id, run.correct, run.total);
    setLastRun({ ...run, newRecord });
    setScreen('result');
  };

  return (
    <div className="app-root">
      {screen === 'home' && (
        <HomeScreen theme={theme} onToggleTheme={toggleTheme} onSelectDeck={startDeck} />
      )}

      {screen === 'game' && deck && (
        <GameScreen
          key={`${deck.id}-${runKey}`}
          deck={deck}
          onExit={() => {
            setScreen('home');
            setDeck(null);
          }}
          onFinish={handleFinish}
        />
      )}

      {screen === 'result' && deck && lastRun && (
        <ResultScreen
          deck={deck}
          run={lastRun}
          onReplay={() => {
            setRunKey((k) => k + 1);
            setScreen('game');
          }}
          onHome={() => {
            setScreen('home');
            setDeck(null);
            setLastRun(null);
          }}
        />
      )}
    </div>
  );
}
