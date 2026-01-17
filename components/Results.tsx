import React, { useRef } from 'react';
import { Section } from './ui/Section';
import { StatProps } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';

const StatBox: React.FC<StatProps & { index: number }> = ({ value, label, subLabel, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5 }}
    className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#232323] border border-white/5 hover:border-brand-red/50 transition-all duration-300 shadow-xl"
  >
    {/* Tech accents */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-brand-red/50 transition-all duration-500"></div>
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-dark rounded-b-2xl overflow-hidden">
        <div className="h-full w-0 group-hover:w-full bg-brand-red transition-all duration-700 ease-out"></div>
    </div>
    
    <div className="relative z-10">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 + (index * 0.2), duration: 0.5 }}
        className="font-display font-bold text-6xl md:text-7xl mb-4 text-white tracking-tight"
      >
        {value}
      </motion.div>
      
      <h4 className="text-sm font-bold text-brand-green uppercase tracking-[0.2em] mb-4">{label}</h4>
      
      {subLabel && (
        <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] mx-auto border-t border-white/5 pt-4">
          {subLabel}
        </p>
      )}
    </div>
  </motion.div>
);

export const Results: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const barsY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  return (
    <Section id="results" dark className="border-t border-white/10 overflow-hidden py-32 bg-[#181818]">
      
      {/* Content */}
      <div ref={containerRef} className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded text-[10px] font-bold uppercase tracking-widest text-brand-red">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></div>
               Impact Analysis
             </div>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Реални Резултати
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Оптимизирайте процесите си и увеличете приходите без да наемате допълнителен персонал.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-20">
          <StatBox 
            index={0}
            value="0"
            label="Пропуснати"
            subLabel="Нито един потенциален клиент не остава без връзка."
          />
          <StatBox 
            index={1}
            value="+40%"
            label="Приход"
            subLabel="Ръст в записаните часове още през първия месец."
          />
          <StatBox 
            index={2}
            value="24/7"
            label="Активност"
            subLabel="Работа без почивка, отпуск или болнични."
          />
        </div>

        {/* Abstract Tech Graphic Background */}
        <div className="mt-24 relative h-24 w-full max-w-5xl mx-auto flex items-end justify-between gap-1 opacity-20 mask-linear-gradient pointer-events-none">
          {[...Array(40)].map((_, i) => (
             <motion.div 
                key={i} 
                style={{ y: barsY }}
                className={`w-full rounded-t-sm ${i % 3 === 0 ? 'bg-brand-red' : 'bg-brand-light'}`}
                initial={{ height: "5%" }}
                whileInView={{ 
                  height: `${Math.random() * 80 + 10}%`,
                  transition: { duration: 1, delay: i * 0.02 } 
                }}
                viewport={{ once: false }}
             ></motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};