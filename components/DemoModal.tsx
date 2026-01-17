import React, { useState, useEffect } from 'react';
import { X, Smartphone, Check, Loader2 } from 'lucide-react';
import { RetroButton } from './ui/RetroButton';
import { supabase } from '../lib/supabase';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMount(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setMount(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase
        .from('demo_submissions')
        .insert([{ phone }]);

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSuccess(false);
          setPhone('');
        }, 300);
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting demo request:', error);
      setErrorMessage(error.message || 'Възникна грешка. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mount) return null;

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

      {/* 1. Blur Backdrop (High-end Apple Style) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-500"
        onClick={onClose}
      ></div>

      {/* 2. Modal Card */}
      <div className={`
        relative w-full max-w-[400px] bg-[#1C1C1C] rounded-[32px] shadow-2xl overflow-hidden
        border border-white/5
        transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
        ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'}
      `}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">

          {!isSuccess ? (
            <>
              {/* Visual Icon */}
              <div className="mb-8 p-5 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/5 relative group">
                <div className="absolute inset-0 rounded-full bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Smartphone size={36} className="text-gray-200 relative z-10" strokeWidth={1.5} />
              </div>

              {/* Typography: Premium, Sexy, Material */}
              <h3 className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-3 tracking-wide">
                Безплатен Тест
              </h3>

              <p className="text-gray-400 text-[15px] leading-relaxed max-w-[280px] mx-auto mb-8 font-medium">
                Въведете вашият номер и нашият <span className="text-white">AI</span> ще се свърже с вас <span className="text-brand-green">веднага</span>.
              </p>

              {/* Minimalist Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 to-brand-green/20 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500"></div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+359 888 888 888"
                    className="relative block w-full px-4 py-4 bg-[#252525] border border-white/5 focus:border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-0 text-center text-lg tracking-wide transition-all shadow-inner"
                  />
                </div>

                {errorMessage && (
                  <div className="text-red-500 text-xs text-center">
                    {errorMessage}
                  </div>
                )}

                <RetroButton
                  variant="green" // Using green for positive action in this clean UI
                  className="w-full justify-center !rounded-2xl !py-4 shadow-[0_10px_40px_-10px_rgba(62,124,103,0.4)] hover:shadow-[0_10px_40px_-5px_rgba(62,124,103,0.6)]"
                  size="md"
                  onClick={() => { }} // Form handles submit
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Свързване...
                    </span>
                  ) : (
                    "Обади ми се"
                  )}
                </RetroButton>
              </form>

              <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] opacity-60">
                Powered by Adaptica AI
              </p>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] relative">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <Check size={48} className="text-white stroke-[3] drop-shadow-md" />
              </div>

              <h3 className="text-3xl font-display font-bold text-white mb-3">Готово!</h3>
              <p className="text-gray-400 font-medium">Телефонът ви ще позвъни след секунди.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};