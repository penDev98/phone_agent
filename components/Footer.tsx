import React from 'react';
import logo from '../assets/adaptica-logo-white.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Adaptica" className="h-24 w-auto" />
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Adaptica. Всички права запазени.
        </div>

        <div className="flex gap-6">
          {/* Social placeholders */}
          <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-brand-red transition-colors">FB</a>
          <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-brand-red transition-colors">IN</a>
          <a href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-brand-red transition-colors">LI</a>
        </div>
      </div>
    </footer>
  );
};