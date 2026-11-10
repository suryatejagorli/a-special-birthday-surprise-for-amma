import { Languages } from 'lucide-react';
import type { Language } from '../utils/translations';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: () => void;
}

export default function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-serif tracking-wide bg-black/45 hover:bg-[#2a131e]/70 border border-[#d4af37]/35 hover:border-[#ecd38c]/70 text-[#fcedbe] hover:text-white backdrop-blur-md transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
      title={currentLang === 'en' ? 'తెలుగులోకి మార్చండి (Switch to Telugu)' : 'Switch to English (ఇంగ్లీష్ లోకి మార్చండి)'}
    >
      <Languages className="w-3.5 h-3.5 text-[#dfc282] shrink-0" />
      <span className="font-semibold text-[11px] sm:text-xs">
        {currentLang === 'en' ? 'తెలుగు' : 'English'}
      </span>
    </button>
  );
}
