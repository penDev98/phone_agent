import React from 'react';
import { Section } from './ui/Section';
import { Phone, CalendarCheck, Database, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-brand-red transition-all duration-300 hover:-translate-y-1 shadow-lg group">
    <div className="w-16 h-16 bg-brand-light rounded-xl flex items-center justify-center mb-6 text-brand-dark group-hover:bg-brand-red group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="font-display font-bold text-xl mb-3 text-brand-dark">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </div>
);

export const Explanation: React.FC = () => {
  return (
    <Section id="features" className="bg-brand-light">
      <div className="text-center mb-16">
        <h2 className="text-brand-red font-bold tracking-widest uppercase mb-4 text-sm">Какво Получавате</h2>
        <h3 className="font-display text-3xl md:text-5xl font-bold text-brand-dark mb-4">Work Smart, Not Hard</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Помагаме ви да спрете напълно загубата на клиенти заради пропуснати или забравени обаждания,
          внедрявайки интелигентна автоматизация.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Phone size={32} />}
          title="Персонализиран AI рецепционист 24/7"
          description="Винаги на линия, без почивки и болнични. Отговаря на български с професионален тон, независимо от часа или деня."
        />
        <FeatureCard
          icon={<CalendarCheck size={32} />}
          title="Автоматично записване & препланиране"
          description="Записва и преподрежда часове без човешка намеса. Интегрира се директно с вашия календар в реално време."
        />
        <FeatureCard
          icon={<Database size={32} />}
          title="CRM интеграции & база данни"
          description="Пълна база данни с всички клиенти и история на комуникациите. Автоматично обновяване на клиентските профили."
        />
      </div>

      <div className="mt-20 p-8 bg-brand-dark rounded-3xl relative overflow-hidden text-brand-light">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h4 className="font-display text-2xl font-bold mb-2">Защо да изберете Adaptica?</h4>
            <p className="text-gray-400">
              Отговаря мигновено, консултира професионално и автоматично записва часове - без необходимост от допълнителен персонал.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://adaptica-ai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-green font-bold hover:text-brand-light transition-colors cursor-pointer"
            >
              Научете повече <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};