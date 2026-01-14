
import React, { useEffect } from 'react';
import { Star, RotateCcw, Map as MapIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SFX } from '../constants';

interface Props {
  stars: number;
  score: number;
  onReplay: () => void;
  onNext: () => void;
  onMap: () => void;
  hasNext: boolean;
}

const LevelComplete: React.FC<Props> = ({ stars, score, onReplay, onNext, onMap, hasNext }) => {
  useEffect(() => {
    // تشغيل صوت النصر العام
    const victoryAudio = new Audio(SFX.victory);
    victoryAudio.play().catch(() => {});

    // تشغيل صوت لكل نجمة تظهر بشكل متتابع
    for (let i = 1; i <= stars; i++) {
      setTimeout(() => {
        const starAudio = new Audio(SFX.star);
        starAudio.volume = 0.8;
        starAudio.play().catch(() => {});
      }, 600 + (i * 400)); // توقيت متزامن مع حركة النجوم في Framer Motion
    }
  }, [stars]);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-b-[10px] border-sky-400 w-full text-center max-w-sm mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-4"
      >
        <h2 className="text-3xl font-bold text-sky-600 mb-1">أحسنت!</h2>
        <p className="text-slate-400 font-bold uppercase tracking-tighter text-sm">النتيجة: {score}/10</p>
      </motion.div>

      {/* Stars Display */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3 + (i * 0.4), // زيادة التأخير قليلاً لجعل التأثير أكثر وضوحاً
              type: 'spring',
              stiffness: 260,
              damping: 20 
            }}
          >
            <Star 
              size={56} 
              className={`${i <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'} drop-shadow-sm`} 
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {hasNext && (
          <button
            onClick={onNext}
            className="w-full py-4 bg-green-500 text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-2 border-b-6 border-green-700 active:translate-y-1 transition-transform custom-shadow"
          >
            <ArrowRight size={24} />
            المرحلة التالية
          </button>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onReplay}
            className="py-3 bg-orange-400 text-white rounded-2xl text-base font-bold flex items-center justify-center gap-2 border-b-6 border-orange-600 active:translate-y-1 transition-transform custom-shadow"
          >
            <RotateCcw size={20} />
            إعادة
          </button>
          
          <button
            onClick={onMap}
            className="py-3 bg-blue-400 text-white rounded-2xl text-base font-bold flex items-center justify-center gap-2 border-b-6 border-blue-600 active:translate-y-1 transition-transform custom-shadow"
          >
            <MapIcon size={20} />
            الخريطة
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        أنت الآن خبير في أصوات الحيوانات!
      </div>
    </div>
  );
};

export default LevelComplete;
