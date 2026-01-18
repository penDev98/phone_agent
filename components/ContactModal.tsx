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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop with tech grid pattern */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500 min-h-full"
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
      <div className="relative w-full max-w-5xl group animate-in fade-in zoom-in-95 duration-500 ease-out my-4 md:my-6">

        {/* Animated Glowing Border */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-brand-red via-brand-dark to-brand-green rounded-xl md:rounded-[2rem] opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

        <div className="relative w-full bg-[#0F0F0F] rounded-xl md:rounded-[1.9rem] overflow-hidden flex flex-col md:flex-row min-h-0 md:min-h-[600px] max-h-[95vh] md:max-h-none shadow-2xl border border-white/5">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-50 text-gray-500 hover:text-white transition-all bg-black/20 hover:bg-brand-red/20 p-2 rounded-full backdrop-blur-md border border-white/5 hover:border-brand-red/50 touch-manipulation"
          >
            <X size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Left Side: Visual & Context */}
          <div className="w-full md:w-5/12 relative p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[200px] md:min-h-auto bg-[#0a0a0a]">

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 md:mb-6 leading-tight md:leading-[1.1]">
                  Адаптирайте <br className="hidden sm:block" /> Бизнеса си <br className="hidden sm:block" />
                  <span className="text-brand-red drop-shadow-[0_0_15px_rgba(166,58,66,0.5)]">преди да е късно!</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed border-l-2 border-brand-green/50 pl-3 md:pl-4">
                  Времето е най-ценният ресурс. Не позволявайте на пропуснатите обаждания да забавят растежа ви.
                </p>
              </div>

              <div className="mt-8 md:mt-0">
                <div className="flex items-center gap-2 md:gap-3 text-xs font-bold text-brand-green tracking-widest uppercase mb-2">
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
          <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-12 bg-[#0a0a0a] relative flex flex-col justify-center overflow-y-auto max-h-[calc(95vh-200px)] md:max-h-none">
            {/* Scanline overlay for subtle texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] md:h-full text-center space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-8 relative z-10 py-8 md:py-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-2 border border-brand-green/20 shadow-[0_0_30px_rgba(62,124,103,0.3)]">
                  <Check size={40} className="sm:w-12 sm:h-12" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">Успешно изпратено!</h3>
                <p className="text-sm sm:text-base text-gray-400 max-w-xs px-4">Данните са обработени. Очаквайте свързване от наш агент до 24 часа.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10 relative z-10">
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2.5 rounded-lg text-xs sm:text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Plan Selector */}
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                    <Zap size={10} className="sm:w-3 sm:h-3 text-brand-red" /> Избран План
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={`
                            relative px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border touch-manipulation
                            ${selectedPlan === plan
                            ? 'bg-brand-red/10 text-white border-brand-red shadow-[0_0_20px_rgba(166,58,66,0.4)] scale-105'
                            : 'bg-white/5 text-gray-400 border-white/5 active:border-white/20 active:bg-white/10'
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
                <div className="space-y-6 sm:space-y-8">
                  {['name', 'email', 'phone'].map((field) => (
                    <div key={field} className="group relative">
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        required
                        value={(formData as any)[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        placeholder=" "
                        className="block py-3.5 sm:py-4 px-0 w-full text-base sm:text-lg text-white bg-transparent border-0 border-b border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-brand-green peer transition-all duration-300 placeholder-transparent touch-manipulation"
                      />

                      {/* Floating Label */}
                      <label className={`
                            absolute text-xs sm:text-sm text-gray-500 duration-300 transform -translate-y-7 sm:-translate-y-8 scale-75 top-3.5 sm:top-4 -z-10 origin-[0] 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-7 sm:peer-focus:-translate-y-8 peer-focus:text-brand-green peer-focus:font-bold uppercase tracking-wider
                          `}>
                        {field === 'name' ? 'Име и Фамилия' : field === 'email' ? 'Email Адрес' : 'Телефон'}
                      </label>

                      {/* Glowing underline effect */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-green scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 shadow-[0_0_10px_#3E7C67]"></div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 sm:pt-6">
                  <RetroButton
                    className="w-full justify-center group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 group-active:scale-105 transition-transform duration-200 block text-sm sm:text-base md:text-xl">
                      {isSubmitting ? 'Изпращане...' : 'Изпрати Запитване'}
                    </span>
                    {/* Button Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
                  </RetroButton>
                  <div className="flex justify-center mt-4 sm:mt-6">
                    <p className="text-gray-600 text-[9px] sm:text-[10px] uppercase tracking-widest active:text-gray-400 transition-colors cursor-pointer touch-manipulation">
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