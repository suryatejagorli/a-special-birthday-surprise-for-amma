import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface BirthdayCakeProps {
  onWishMade?: () => void;
  cakeTag?: string;
  cakeGarland?: string;
  makeWishBtn?: string;
  wishBlownMsg?: string;
  relightBtn?: string;
}

export default function BirthdayCake({
  onWishMade,
  cakeTag = 'For Amma ❤️',
  cakeGarland = 'Forever Cherished',
  makeWishBtn = 'Make a Wish 🎂',
  wishBlownMsg = 'Candles Blown! May all your wishes come true, Amma! ✨',
  relightBtn = 'Light the candles again 🕯️',
}: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [wishConfirmed, setWishConfirmed] = useState(false);

  const handleMakeWish = () => {
    if (isBlown) return;
    setIsBlown(true);
    soundManager.playWishFanfare();

    // Trigger confetti bursts with luxury gold, rose pink, and cream colors
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#d4af37', '#ffd700', '#f4c2c2', '#e8a2af', '#ffffff', '#faebd7'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Secondary big starburst from center
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
      setWishConfirmed(true);
      if (onWishMade) onWishMade();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 relative">
      {/* Warm cake plate ambient glow */}
      <div className="absolute w-72 h-48 rounded-full bg-[#d4af37]/15 blur-2xl -bottom-4 pointer-events-none" />

      {/* The Animated Cake Structure */}
      <div className="relative flex flex-col items-center">
        {/* Candles Container (3 Candles) */}
        <div className="flex items-end justify-center gap-6 mb-1 z-20">
          {[
            { height: 'h-10', delay: 0 },
            { height: 'h-13', delay: 0.15 }, // central taller candle
            { height: 'h-10', delay: 0.3 },
          ].map((candle, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Flame or Smoke */}
              <AnimatePresence mode="wait">
                {!isBlown ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: [1, 1.4, 0],
                      y: -10,
                      opacity: 0,
                      transition: { duration: 0.5 },
                    }}
                    className="animate-candle relative mb-1"
                  >
                    {/* Flame Outer Glow */}
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-[#ff4500] via-[#ffa500] to-[#ffff99] shadow-[0_0_18px_rgba(255,180,50,0.9)]" />
                    {/* Inner hot core */}
                    <div className="absolute inset-x-1 bottom-0.5 h-3 rounded-full bg-white opacity-85" />
                    {/* Tiny base blue wick glow */}
                    <div className="absolute inset-x-1.5 bottom-0 h-1 rounded-full bg-blue-400 opacity-70" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0.8, 0.4, 0],
                      y: -25,
                      scale: [0.5, 1.3, 2],
                      x: (idx - 1) * 6,
                    }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className="w-3 h-6 mb-1 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-2 h-4 rounded-full bg-[#ecd38c]/40 blur-xs" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-stone-700 -mb-0.5 z-10" />

              {/* Candle Body (Champagne Gold Striped) */}
              <div
                className={`w-3 ${candle.height} rounded-t-sm shadow-md bg-gradient-to-b from-[#fff6e6] via-[#f5deb3] to-[#d4af37] border-x border-[#d4af37]/40 relative overflow-hidden`}
              >
                {/* Spiral Gold Stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(212,175,55,0.4)_3px,rgba(212,175,55,0.4)_6px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="relative w-36 md:w-44 h-12 md:h-14 rounded-t-2xl bg-gradient-to-b from-[#2d1722] via-[#210f18] to-[#1a0a13] border-t-2 border-x border-[#e5c158]/40 shadow-lg flex items-center justify-center z-10">
          {/* Icing Frosting Drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-between px-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#fff6ea] to-[#f3df95] -mt-1 shadow-xs border border-[#d4af37]/30"
              />
            ))}
          </div>
          {/* Gold Decorative Swirl */}
          <div className="absolute inset-x-2 bottom-2 h-0.5 bg-gradient-to-r from-transparent via-[#ffd978] to-transparent opacity-80" />
          <span className="font-serif italic text-xs tracking-wider text-[#fcedbe] font-medium opacity-90">
            {cakeTag}
          </span>
        </div>

        {/* Bottom Cake Tier */}
        <div className="relative w-48 md:w-56 h-16 md:h-18 rounded-t-xl bg-gradient-to-b from-[#230f1a] via-[#1a0a13] to-[#12050c] border-t-2 border-x border-[#d4af37]/45 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Cream Drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-between px-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#fffaf3] to-[#ecd38c] -mt-1 shadow-xs border border-[#b89326]/40"
              />
            ))}
          </div>

          {/* Pearl & Rose Gold Bead Garland */}
          <div className="absolute inset-x-3 bottom-3 flex justify-around items-center opacity-85">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#fff2db] to-[#e8a2af] shadow-[0_0_4px_rgba(255,215,0,0.6)]"
              />
            ))}
          </div>

          <div className="text-center">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#ecd38c] font-medium opacity-85">
              {cakeGarland}
            </span>
          </div>
        </div>

        {/* Cake Stand / Porcelain Gold Rim Platter */}
        <div className="relative w-56 md:w-68 h-4 rounded-full bg-gradient-to-r from-[#8a6b18] via-[#ffd978] to-[#8a6b18] shadow-[0_6px_20px_rgba(0,0,0,0.7)] border-t border-[#fff2db]/60 flex items-center justify-center">
          <div className="w-52 md:w-64 h-2 rounded-full bg-[#150a10]" />
        </div>
        {/* Cake Stand Pedestal Base */}
        <div className="w-20 md:w-24 h-3 bg-gradient-to-b from-[#d4af37] via-[#997517] to-[#59420b] rounded-b-md shadow-md" />
      </div>

      {/* Make a Wish Action Button */}
      <div className="mt-6 flex flex-col items-center">
        {!isBlown ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleMakeWish}
            className="luxury-button-gold px-8 py-3.5 rounded-full font-serif text-lg tracking-wide font-semibold flex items-center gap-2.5 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.5)] border border-[#fff2db]/40"
          >
            <Sparkles className="w-5 h-5 text-[#38200b]" />
            <span>{makeWishBtn}</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="px-6 py-2.5 rounded-full bg-[#2a131e]/80 border border-[#ecd38c]/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 text-[#fcedbe] font-serif text-base md:text-lg">
              <Heart className="w-4 h-4 text-[#e8a2af] fill-[#e8a2af]" />
              <span>{wishBlownMsg}</span>
            </div>
            {wishConfirmed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setIsBlown(false);
                  setWishConfirmed(false);
                }}
                className="text-xs text-[#dfc282]/80 hover:text-[#fff] mt-3 underline underline-offset-4 transition-colors cursor-pointer"
              >
                {relightBtn}
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
