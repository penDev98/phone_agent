import React from 'react';
import { RetroButton } from './ui/RetroButton';

import logo from '../assets/adaptica-logo-white.png';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="Adaptica" className="h-24 w-auto" />
        </div>

        {/* CTA Button */}
        <div>
          <RetroButton size="sm" variant="primary" onClick={onOpenContact}>
            Свържи се
          </RetroButton>
        </div>
      </div>
    </nav>
  );
};