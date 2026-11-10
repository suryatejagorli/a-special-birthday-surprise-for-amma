import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
  promptText?: string;
}

export default function GiftBox({ onOpen, promptText = 'Click to open your surprise' }: GiftBoxProps) {
  return (
    <div className="relative flex flex-col items-center justify-center my-6 group cursor-pointer" onClick={onOpen}>
      {/* Ambient glow behind the box */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#d4af37]/25 via-[#e8a2af]/20 to-transparent blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Floating sparkles */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-2 text-[#f3df95] pointer-events-none"
      >
        <Sparkles className="w-6 h-6 drop-shadow-[0_0_8px_rgba(243,223,149,0.8)]" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.9, 0.5],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-2 -left-4 text-[#f4c2c2] pointer-events-none"
      >
        <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(244,194,194,0.8)]" />
      </motion.div>

      {/* The Gift Box Container */}
      <motion.div
        whileHover={{ scale: 1.05, y: -6 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center"
      >
        {/* Ribbon Bow on Top */}
        <div className="absolute -top-6 z-20 flex items-center justify-center">
          {/* Left loop */}
          <div className="w-10 h-8 md:w-12 md:h-10 rounded-full border-2 border-[#f3df95] bg-gradient-to-br from-[#ffd978] to-[#b89326] -rotate-45 shadow-[0_4px_12px_rgba(212,175,55,0.4)]" />
          {/* Right loop */}
          <div className="w-10 h-8 md:w-12 md:h-10 rounded-full border-2 border-[#f3df95] bg-gradient-to-bl from-[#ffd978] to-[#b89326] rotate-45 -ml-4 shadow-[0_4px_12px_rgba(212,175,55,0.4)]" />
          {/* Central Knot with glowing Ruby Heart */}
          <div className="absolute w-7 h-7 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fff2db] to-[#b89326] shadow-lg flex items-center justify-center border border-[#fff2db]/60">
            <Heart className="w-3.5 h-3.5 text-[#8b1e3f] fill-[#b82d54]" />
          </div>
        </div>

        {/* Gift Box Lid */}
        <div className="absolute top-4 w-44 md:w-52 h-10 md:h-12 rounded-t-xl bg-gradient-to-b from-[#2a131e] via-[#1f0d16] to-[#170910] border border-[#d4af37]/40 shadow-xl z-10 flex items-center justify-center overflow-hidden">
          {/* Lid Horizontal Golden Ribbon */}
          <div className="absolute inset-x-0 h-3 bg-gradient-to-r from-[#b89326] via-[#ffd978] to-[#b89326] opacity-90 shadow-sm" />
          {/* Lid Vertical Golden Ribbon */}
          <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#ffd978] via-[#e5c158] to-[#b89326] opacity-95 shadow-sm" />
          {/* Subtle light reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Gift Box Body */}
        <div className="absolute bottom-2 w-40 md:w-48 h-36 md:h-40 rounded-b-2xl bg-gradient-to-b from-[#1c0c14] via-[#14080e] to-[#0d0509] border-x border-b border-[#d4af37]/35 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Subtle Velvet Texture Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#b76e79]/15 via-transparent to-transparent pointer-events-none" />

          {/* Vertical Ribbon */}
          <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#ffd978] via-[#e5c158] to-[#b89326] shadow-[0_0_12px_rgba(212,175,55,0.3)]" />

          {/* Horizontal Ribbon */}
          <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-[#b89326] via-[#ffd978] to-[#b89326] shadow-[0_0_12px_rgba(212,175,55,0.3)]" />

          {/* Central Golden Medallion with pulsing Amma Heart */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#997517] via-[#f3df95] to-[#ffe599] p-0.5 shadow-[0_0_20px_rgba(243,223,149,0.7)] flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-[#1e0a15] flex items-center justify-center border border-[#ffd978]/40">
              <Heart className="w-5 h-5 text-[#f4c2c2] fill-[#e8a2af] drop-shadow-[0_0_6px_rgba(244,194,194,0.9)]" />
            </div>
          </motion.div>
        </div>

        {/* Shadow underneath */}
        <div className="absolute -bottom-1 w-36 h-4 bg-black/60 rounded-full blur-md" />
      </motion.div>

      {/* Gentle helper prompt below box */}
      <p className="text-xs tracking-widest uppercase text-[#dfc282]/80 mt-2 font-medium flex items-center gap-1.5 transition-colors group-hover:text-[#ffd978]">
        <Sparkles className="w-3 h-3 text-[#d4af37]" /> {promptText}
      </p>
    </div>
  );
}
