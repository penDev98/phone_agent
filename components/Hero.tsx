import React, { useRef } from 'react';
import { RetroButton } from './ui/RetroButton';
import { Section } from './ui/Section';
import { Bot } from 'lucide-react';
import heroAvatar from '../assets/hero-avatar.png';

interface HeroProps {
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenDemo }) => {

  return (
    <Section dark className="min-h-screen flex flex-col justify-center pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/20 border border-brand-green/50 text-brand-green text-sm font-medium tracking-wide">
            <span>More Clients, Less Work</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            AI Телефонен <span className="text-brand-red">Рецепционист</span> <br />
            за Клиники и Салони в България
          </h1>

          <p className="text-xl text-gray-400 max-w-lg">
            Подходящо за всякакъв вид клиники, центрове, салони за красота и уелнес.
          </p>

          <div className="py-6 w-full flex justify-center lg:justify-start">
            <RetroButton size="lg" variant="primary" onClick={onOpenDemo}>
              Тествай Безплатно
            </RetroButton>
          </div>

          <div className="flex flex-col gap-2 border-l-4 border-brand-green pl-4">
            <span className="text-brand-green font-display font-bold text-2xl">20 - 40%</span>
            <span className="text-gray-300 text-sm">повече записани часове още от първия месец</span>
          </div>
        </div>

        {/* Visual Content - Abstract/Tech Representation */}
        <div className="order-1 lg:order-2 relative flex justify-center items-center">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-red/20 blur-[100px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-green/20 blur-[80px] rounded-full translate-x-20 -translate-y-20"></div>

          {/* Main Image Container */}
          <div className="relative z-10 w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-white/10 bg-[#1C1C1C] shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
            <img
              src={heroAvatar}
              alt="AI Receptionist Avatar"
              className="w-full h-full object-cover opacity-80 mix-blend-normal group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay UI Interface Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center animate-pulse">
                  <Bot className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-brand-green font-bold uppercase tracking-widest mb-1">Incoming Call</div>
                  <div className="text-white font-display text-lg">AI Assistant Active</div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};