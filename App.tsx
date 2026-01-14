
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, LevelProgress } from './types';
import { LEVELS } from './constants';
import LevelMap from './components/LevelMap';
import GameScreen from './components/GameScreen';
import LevelComplete from './components/LevelComplete';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'guess_the_animal_progress_v3';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MAP);
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  const [progress, setProgress] = useState<LevelProgress[]>([]);
  const [lastResults, setLastResults] = useState<{ stars: number; score: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      const initialProgress: LevelProgress[] = LEVELS.map((level) => ({
        levelId: level.id,
        stars: 0,
        unlocked: true
      }));
      setProgress(initialProgress);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
    }
  }, []);

  const handleStartLevel = useCallback((levelId: number) => {
    setActiveLevelId(levelId);
    setGameState(GameState.PLAYING);
  }, []);

  const handleLevelComplete = useCallback((stars: number, score: number) => {
    setLastResults({ stars, score });
    
    setProgress(prev => {
      const updated = prev.map(p => {
        if (p.levelId === activeLevelId) {
          return { ...p, stars: Math.max(p.stars, stars) };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    
    setGameState(GameState.LEVEL_COMPLETE);
  }, [activeLevelId]);

  const handleBackToMap = useCallback(() => {
    setGameState(GameState.MAP);
    setActiveLevelId(null);
  }, []);

  const handleReplay = useCallback(() => {
    if (activeLevelId) {
      setGameState(GameState.PLAYING);
    }
  }, [activeLevelId]);

  const handleNextLevel = useCallback(() => {
    const nextId = (activeLevelId || 0) + 1;
    if (nextId <= LEVELS.length) {
      setActiveLevelId(nextId);
      setGameState(GameState.PLAYING);
    } else {
      handleBackToMap();
    }
  }, [activeLevelId, handleBackToMap]);

  return (
    <div className="fixed inset-0 bg-sky-100 flex flex-col items-center overflow-hidden font-sans select-none touch-none">
      {/* Background Decor - Simplified for performance */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-48 h-48 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {gameState === GameState.MAP && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <LevelMap 
                levels={LEVELS} 
                progress={progress} 
                onSelectLevel={handleStartLevel} 
              />
            </motion.div>
          )}

          {gameState === GameState.PLAYING && activeLevelId && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full max-w-lg mx-auto flex flex-col justify-center px-4"
            >
              <GameScreen 
                level={LEVELS.find(l => l.id === activeLevelId)!} 
                onComplete={handleLevelComplete}
                onBack={handleBackToMap}
              />
            </motion.div>
          )}

          {gameState === GameState.LEVEL_COMPLETE && lastResults && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex items-center justify-center px-4"
            >
              <LevelComplete 
                stars={lastResults.stars} 
                score={lastResults.score} 
                onReplay={handleReplay} 
                onNext={handleNextLevel}
                onMap={handleBackToMap}
                hasNext={activeLevelId! < LEVELS.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
