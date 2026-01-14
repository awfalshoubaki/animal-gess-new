
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LevelConfig, Animal } from '../types';
import { ANIMALS, SFX } from '../constants';
import { ArrowLeft, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  level: LevelConfig;
  onComplete: (stars: number, score: number) => void;
  onBack: () => void;
}

const QUESTIONS_PER_LEVEL = 10;

const GameScreen: React.FC<Props> = ({ level, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<Animal[]>([]);
  const [targetAnimal, setTargetAnimal] = useState<Animal | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.play().catch(() => {});
    }
  };

  const playSFX = (url: string) => {
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current.src = url;
      sfxRef.current.play().catch(() => {});
    }
  };

  const generateQuestion = useCallback(() => {
    const pool = level.animalPool;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const targetId = shuffledPool[0];
    const target = ANIMALS[targetId];

    const others = pool.filter(id => id !== targetId);
    // تأكد من وجود 3 خيارات خاطئة فريدة
    const uniqueOthers = Array.from(new Set(others));
    const wrongIds = uniqueOthers.sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = wrongIds.map(id => ANIMALS[id]);

    const allOptions = [target, ...wrongOptions].sort(() => Math.random() - 0.5);

    setTargetAnimal(target);
    setOptions(allOptions);
    setIsCorrect(null);
    setSelectedIdx(null);
    setIsLocked(false);

    // تشغيل الصوت تلقائياً بشكل أسرع
    setTimeout(() => playSound(target.sound), 300);
  }, [level]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleOptionClick = (animal: Animal, idx: number) => {
    if (isLocked) return;
    
    setSelectedIdx(idx);
    setIsLocked(true);

    const isMatch = animal.id === targetAnimal?.id;
    setIsCorrect(isMatch);

    if (isMatch) {
      setScore(s => s + 1);
      playSFX(SFX.correct);
    } else {
      playSFX(SFX.incorrect);
    }
    
    // تقليل وقت الانتظار لجعل اللعبة أكثر سرعة (من 1500 إلى 1000)
    setTimeout(() => {
      if (currentQuestion + 1 >= QUESTIONS_PER_LEVEL) {
        const finalScore = isMatch ? score + 1 : score;
        const stars = finalScore >= 9 ? 3 : finalScore >= 7 ? 2 : finalScore >= 4 ? 1 : 0;
        onComplete(stars, finalScore);
      } else {
        setCurrentQuestion(q => q + 1);
        generateQuestion();
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center w-full h-full max-h-screen overflow-hidden py-4 justify-between" style={{ transform: 'translateZ(0)' }}>
      <audio ref={audioRef} preload="auto" />
      <audio ref={sfxRef} preload="auto" />

      {/* Header */}
      <div className="flex justify-between items-center w-full px-2">
        <button 
          onClick={onBack}
          className="p-2 bg-white rounded-xl shadow-md border-b-4 border-slate-200 text-blue-500 active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 text-center">
          <div className="text-slate-500 font-bold uppercase tracking-tight text-[10px]">المستوى {level.id} • {currentQuestion + 1}/10</div>
          <div className="text-lg font-bold text-blue-600 truncate px-2">أي حيوان يصدر هذا الصوت؟</div>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Play Button Container */}
      <motion.div 
        key={targetAnimal?.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="my-2 p-4 bg-white rounded-[2.5rem] shadow-xl border-b-8 border-yellow-400 w-full max-w-[200px] flex flex-col items-center"
      >
        <button 
          onClick={() => playSound(targetAnimal?.sound || '')} 
          className="w-20 h-20 bg-yellow-400 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          <Volume2 size={40} className="animate-pulse" />
        </button>
      </motion.div>

      {/* Options Grid Optimized for Speed */}
      <div className="grid grid-cols-2 gap-3 w-full px-2 max-w-sm">
        {options.map((option, idx) => (
          <motion.button
            key={`${currentQuestion}-${option.id}-${idx}`}
            whileTap={{ scale: isLocked ? 1 : 0.92 }}
            onClick={() => handleOptionClick(option, idx)}
            className={`
              relative aspect-square p-1 bg-white rounded-3xl shadow-md overflow-hidden border-b-4 transition-all duration-200
              ${selectedIdx === idx 
                ? isCorrect === true ? 'border-green-500 bg-green-50' 
                : isCorrect === false ? 'border-red-400 bg-red-50' : 'border-blue-400' 
                : 'border-blue-200'
              }
            `}
            style={{ willChange: 'transform, opacity' }}
          >
            <img 
              src={option.image} 
              alt="حيوان" 
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
              loading="eager"
            />
            <AnimatePresence>
              {selectedIdx === idx && isCorrect !== null && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]"
                >
                  {isCorrect ? (
                    <CheckCircle className="text-green-500 drop-shadow-md" size={50} />
                  ) : (
                    <XCircle className="text-red-500 drop-shadow-md" size={50} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Progress Footer */}
      <div className="w-full max-w-[260px] flex flex-col items-center mb-2">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner mb-1">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-400 to-green-400"
            animate={{ width: `${(currentQuestion / QUESTIONS_PER_LEVEL) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-slate-400 font-bold text-[10px]">النتيجة: {score}</span>
      </div>
    </div>
  );
};

export default GameScreen;
