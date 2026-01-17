import React from 'react';
import { SectionProps } from '../../types';

interface ExtendedSectionProps extends SectionProps {
  dark?: boolean;
}

export const Section: React.FC<ExtendedSectionProps> = ({ id, className = '', children, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`
        relative py-20 px-6 md:px-12 overflow-hidden
        ${dark ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'}
        ${className}
      `}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-noise mix-blend-overlay opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};