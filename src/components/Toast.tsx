import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300">
      <div className="bg-[#090909] text-white border border-[#FFBE24]/60 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-2 h-2 rounded-full bg-[#FFBE24] animate-ping" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-100">
          {toastMessage}
        </span>
      </div>
    </div>
  );
};
