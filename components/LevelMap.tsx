
import React from 'react';
import { LevelConfig, LevelProgress } from '../types';
import { Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  levels: LevelConfig[];
  progress: LevelProgress[];
  onSelectLevel: (id: number) => void;
}

const LevelMap: React.FC<Props> = ({ levels, progress, onSelectLevel }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-sky-400 via-sky-300 to-green-300 pb-20 pt-6" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block bg-white/30 backdrop-blur-md px-6 py-2 rounded-full mb-2 border border-white/40"
          >
            <h1 className="text-2xl font-bold text-white drop-shadow-md tracking-wider uppercase">
              مغامرة الغابة
            </h1>
          </motion.div>
          <p className="text-white/80 font-medium text-sm">اختر أي مستوى للبدء!</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {levels.map((level, index) => {
            const p = progress.find(item => item.levelId === level.id);
            const stars = p?.stars || 0;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full flex flex-col items-center">
                  <button
                    onClick={() => onSelectLevel(level.id)}
                    className={`
                      relative w-full aspect-square max-w-[100px] rounded-[2rem] flex flex-col items-center justify-center
                      transition-all duration-200 active:scale-90 border-b-8 custom-shadow bg-white
                      ${stars === 3 ? 'border-yellow-400 text-yellow-600' : 'border-blue-400 text-blue-600'}
                    `}
                    style={{ willChange: 'transform' }}
                  >
                    <span className="text-3xl font-bold mb-1">{level.id}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(s => (
                        <Star 
                          key={s} 
                          size={14} 
                          className={s <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}
                        />
                      ))}
                    </div>
                    
                    {stars === 3 && (
                       <Trophy className="absolute -top-2 -right-2 text-yellow-500 fill-yellow-200 drop-shadow-sm" size={24} />
                    )}
                  </button>

                  <div className="mt-2 text-center">
                    <span className="bg-blue-500/80 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase truncate max-w-[90px] block">
                      {level.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
