import React from 'react';
import { ButtonProps } from '../../types';

export const RetroButton: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  size = 'md'
}) => {
  
  let bgColors = '';
  let borderColors = '';
  let textColors = '';

  // Matching the brand colors from the request
  switch (variant) {
    case 'primary': // Brand Red #A63A42
      bgColors = 'bg-brand-red hover:bg-[#B8454D]';
      borderColors = 'border-brand-redDark';
      textColors = 'text-white';
      break;
    case 'green': // Brand Green #3E7C67
      bgColors = 'bg-brand-green hover:bg-[#4A8D76]';
      borderColors = 'border-brand-greenDark';
      textColors = 'text-white';
      break;
    case 'secondary': // Dark #1C1C1C
      bgColors = 'bg-brand-dark hover:bg-gray-800';
      borderColors = 'border-black';
      textColors = 'text-white';
      break;
  }

  const sizeClasses = size === 'lg' 
    ? 'px-10 py-5 text-xl' 
    : size === 'sm' 
      ? 'px-4 py-2 text-sm' 
      : 'px-8 py-3 text-lg';

  return (
    <button
      onClick={onClick}
      className={`
        relative 
        font-display font-bold tracking-wider uppercase
        rounded-lg
        transition-all duration-100 ease-out
        border-b-[6px] border-r-[6px]
        active:border-b-0 active:border-r-0 active:border-t-2 active:border-l-2
        active:translate-y-[4px] active:translate-x-[4px]
        shadow-xl
        ${bgColors}
        ${borderColors}
        ${textColors}
        ${sizeClasses}
        ${className}
      `}
    >
      {children}
    </button>
  );
};