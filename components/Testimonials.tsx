import React from 'react';
import { Section } from './ui/Section';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, image }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group">
    <div className="absolute top-6 right-8 text-brand-green/10 group-hover:text-brand-green/20 transition-colors">
      <Quote size={48} />
    </div>
    
    <div className="flex gap-1 mb-6 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
    
    <p className="text-gray-600 mb-6 italic relative z-10 leading-relaxed min-h-[80px]">
      "{quote}"
    </p>
    
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-brand-green/20">
        <img src={image} alt={author} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-display font-bold text-brand-dark text-lg">{author}</h4>
        <p className="text-xs text-brand-red font-bold uppercase tracking-wide">{role}</p>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <Section className="bg-brand-light border-b border-gray-200">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-dark mb-6">
          Какво Казват Нашите Клиенти:
        </h2>
        <div className="h-1.5 w-24 bg-brand-red mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TestimonialCard
          quote="Откакто използваме Adaptica, не сме изпуснали нито едно обаждане. Пациентите са впечатлени от бързината на реакцията."
          author="Д-р Иванова"
          role='Дентална Клиника "Усмивка"'
          image="https://randomuser.me/api/portraits/women/44.jpg"
        />
        <TestimonialCard
          quote="Рецепцията ни беше претоварена. Сега AI поема рутинните въпроси, а екипът ми се фокусира изцяло върху клиентите в салона."
          author="Мария Петрова"
          role="Beauty Lounge Sofia"
          image="https://randomuser.me/api/portraits/women/68.jpg"
        />
        <TestimonialCard
          quote="Интеграцията беше изключително лесна. Записванията ни се увеличиха с 30% още първия месец от използването на системата."
          author="Александър Димитров"
          role="Derma Pro Center"
          image="https://randomuser.me/api/portraits/men/32.jpg"
        />
      </div>
    </Section>
  );
};