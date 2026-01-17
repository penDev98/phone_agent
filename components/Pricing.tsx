import React from 'react';
import { Section } from './ui/Section';
import { RetroButton } from './ui/RetroButton';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
  onSelect: (plan: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, subtitle, features, isPopular = false, onSelect }) => (
  <div className={`
    relative flex flex-col h-full p-8 rounded-2xl transition-transform duration-300 hover:scale-[1.02]
    ${isPopular 
      ? 'bg-brand-dark text-brand-light shadow-[0_20px_50px_rgba(28,28,28,0.5)] ring-4 ring-brand-green/20' 
      : 'bg-white text-brand-dark border-2 border-gray-100'
    }
  `}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
        Популярен
      </div>
    )}
    
    <h3 className={`font-display text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-brand-dark'}`}>{title}</h3>
    <div className="mb-1">
      <span className="text-3xl font-bold">{price}</span>
    </div>
    <p className={`text-sm mb-8 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
    
    <div className="flex-grow space-y-4 mb-8">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`mt-1 p-0.5 rounded-full ${isPopular ? 'bg-brand-green text-white' : 'bg-brand-light text-brand-dark'}`}>
            <Check size={12} strokeWidth={4} />
          </div>
          <span className={`text-sm ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
        </div>
      ))}
    </div>

    <RetroButton 
      variant={isPopular ? 'green' : 'secondary'} 
      className="w-full justify-center"
      size="sm"
      onClick={() => onSelect(title)}
    >
      Избери план
    </RetroButton>
  </div>
);

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <Section id="pricing" className="bg-brand-light border-t border-gray-200">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold text-brand-dark mb-4">Ценoви Планове</h2>
        <p className="text-gray-600">Прозрачно ценообразуване без скрити такси</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PricingCard 
          title="Setup & Go"
          price="2000-5000 EUR"
          subtitle="Еднократно Заплащане"
          features={[
            "Създаване на вашият Агент",
            "Настройване според нуждите ви",
            "Показваме как да го използвате",
            "Обучение за управление"
          ]}
          onSelect={onSelectPlan}
        />
        <PricingCard 
          title="Retainer"
          price="500-1300 EUR/мес"
          subtitle="Месечен Абонамент"
          isPopular={true}
          features={[
            "Създаване и настройване на Агент",
            "Поемаме цялото му управление",
            "Включени разходи (Минути, AI Токени, Такси)",
            "24/7 Поддръжка и обновяване"
          ]}
          onSelect={onSelectPlan}
        />
      </div>
    </Section>
  );
};