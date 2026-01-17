import React, { useState, useEffect } from 'react';
import { RetroButton } from './ui/RetroButton';
import { X, Check, Zap } from 'lucide-react';
import logo from '../assets/adaptica-logo-white.png';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const plans = ["General Inquiry", "Setup & Go", "Retainer"];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || "General Inquiry");
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialPlan) setSelectedPlan(initialPlan);
  }, [initialPlan]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            plan: selectedPlan
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ name: '', email: '', phone: '' });
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'Възникна грешка. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop with tech grid pattern */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>

      {/* Modal Content Wrapper for Gradient Border */}
      <div className="relative w-full max-w-5xl group animate-in fade-in zoom-in-95 duration-500 ease-out">

        {/* Animated Glowing Border */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-brand-red via-brand-dark to-brand-green rounded-[2rem] opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

        <div className="relative w-full bg-[#0F0F0F] rounded-[1.9rem] overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-2xl border border-white/5">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-gray-500 hover:text-white transition-all bg-black/20 hover:bg-brand-red/20 p-2 rounded-full backdrop-blur-md border border-white/5 hover:border-brand-red/50"
          >
            <X size={20} />
          </button>

          {/* Left Side: Visual & Context */}
          <div className="w-full md:w-5/12 relative p-10 flex flex-col justify-between overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-[#141414] z-0"></div>
            {/* Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.07]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}>
            </div>
            {/* Ambient Orbs */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-red/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-green/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 leading-[1.1]">
                  Адаптирайте <br /> Бизнеса си <br />
                  <span className="text-brand-red drop-shadow-[0_0_15px_rgba(166,58,66,0.5)]">преди да е късно!</span>
                </h2>
                <p className="text-gray-400 leading-relaxed border-l-2 border-brand-green/50 pl-4">
                  Времето е най-ценният ресурс. Не позволявайте на пропуснатите обаждания да забавят растежа ви.
                </p>
              </div>

              <div className="mt-12 md:mt-0">
                <div className="flex items-center gap-3 text-xs font-bold text-brand-green tracking-widest uppercase mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                  </span>
                  System Online
                </div>
                <div className="h-px w-full bg-gradient-to-r from-brand-green/50 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-[#0a0a0a] relative flex flex-col justify-center">
            {/* Scanline overlay for subtle texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 relative z-10">
                <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-2 border border-brand-green/20 shadow-[0_0_30px_rgba(62,124,103,0.3)]">
                  <Check size={48} />
                </div>
                <h3 className="font-display text-3xl text-white">Успешно изпратено!</h3>
                <p className="text-gray-400 max-w-xs">Данните са обработени. Очаквайте свързване от наш агент до 24 часа.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Plan Selector */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                    <Zap size={12} className="text-brand-red" /> Избран План
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={`
                            relative px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border
                            ${selectedPlan === plan
                            ? 'bg-brand-red/10 text-white border-brand-red shadow-[0_0_20px_rgba(166,58,66,0.4)] scale-105'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10'
                          }
                          `}
                      >
                        {plan}
                        {selectedPlan === plan && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-brand-red blur-[2px]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-8">
                  {['name', 'email', 'phone'].map((field) => (
                    <div key={field} className="group relative">
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        required
                        value={(formData as any)[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        placeholder=" "
                        className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-brand-green peer transition-all duration-300 placeholder-transparent"
                      />

                      {/* Floating Label */}
                      <label className={`
                            absolute text-gray-500 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-brand-green peer-focus:font-bold uppercase tracking-wider
                          `}>
                        {field === 'name' ? 'Име и Фамилия' : field === 'email' ? 'Email Адрес' : 'Телефон'}
                      </label>

                      {/* Glowing underline effect */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-green scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 shadow-[0_0_10px_#3E7C67]"></div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <RetroButton
                    className="w-full justify-center group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 group-hover:scale-105 transition-transform duration-200 block">
                      {isSubmitting ? 'Изпращане...' : 'Изпрати Запитване'}
                    </span>
                    {/* Button Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
                  </RetroButton>
                  <div className="flex justify-center mt-6">
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest hover:text-gray-400 transition-colors cursor-pointer">
                      Общи условия & Поверителност
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};