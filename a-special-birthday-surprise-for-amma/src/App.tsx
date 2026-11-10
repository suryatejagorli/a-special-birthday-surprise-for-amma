/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import AmbientBackground from './components/AmbientBackground';
import GiftBox from './components/GiftBox';
import BirthdayCake from './components/BirthdayCake';
import JourneyProgress from './components/JourneyProgress';
import MusicController from './components/MusicController';
import LanguageToggle from './components/LanguageToggle';
import MemoryModal from './components/MemoryModal';
import { soundManager } from './utils/audio';
import { translations, type Language } from './utils/translations';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('en');
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [questionReaction, setQuestionReaction] = useState<string | null>(null);

  const t = translations[language];

  // Start audio on first user touch/click
  const triggerAudioStart = () => {
    if (!hasStartedAudio) {
      soundManager.play();
      setHasStartedAudio(true);
    }
  };

  const handleNextStep = () => {
    triggerAudioStart();
    soundManager.playChime();
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleStepJump = (step: number) => {
    triggerAudioStart();
    soundManager.playChime();
    setCurrentStep(step);
  };

  // Toggle Language between English and Telugu
  const handleToggleLanguage = () => {
    soundManager.playChime();
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // Screen 2 Question Buttons Handler
  const handleAnswerQuestion = (answer: 'of_course' | 'tell_me') => {
    triggerAudioStart();
    soundManager.playHeartSound();

    if (answer === 'of_course') {
      setQuestionReaction(t.screen2.reactionOfCourse);
    } else {
      setQuestionReaction(t.screen2.reactionTellMe);
    }

    setTimeout(() => {
      setQuestionReaction(null);
      setCurrentStep(3);
    }, 2000);
  };

  const handleRestart = () => {
    soundManager.playChime();
    setCurrentStep(1);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c070a] text-[#fff6ee] flex flex-col justify-between select-none">
      {/* Dynamic Ambient Background Canvas */}
      <AmbientBackground activeStep={currentStep} />

      {/* Floating Top-Right Controls Bar: Language Toggle & Music Controls */}
      <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2">
        <LanguageToggle
          currentLang={language}
          onToggle={handleToggleLanguage}
        />
        <MusicController
          hasStartedAudio={hasStartedAudio}
          onUserInitiatedPlay={() => setHasStartedAudio(true)}
          texts={t.music}
        />
      </div>

      {/* Top Header & Journey Progress Indicator */}
      <header className="relative z-30 pt-3 sm:pt-4 md:pt-6 px-4 flex flex-col items-center justify-center shrink-0">
        <JourneyProgress
          currentStep={currentStep}
          totalSteps={5}
          onStepClick={handleStepJump}
          stepLabels={t.journey.steps}
          partLabel={t.journey.part}
          ofLabel={t.journey.of}
        />
      </header>

      {/* Main Interactive Stage Container */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-8 py-2 md:py-4 max-w-4xl mx-auto w-full overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {/* ========================================================
              SCREEN 1 – The Welcome
             ======================================================== */}
          {currentStep === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-xl mx-auto w-full"
            >
              {/* Subtle Kicker */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#d4af37]/20 text-[#ecd38c] text-xs font-serif tracking-widest uppercase mb-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.screen1.kicker}</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#fffaf3] drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)] mb-3"
              >
                {t.screen1.heading} <span className="inline-block text-[#f4c2c2] animate-pulse">❤️</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-sm sm:text-base md:text-xl font-light text-[#dfc282] max-w-md mx-auto mb-2 leading-relaxed"
              >
                {t.screen1.subtitle}
              </motion.p>

              {/* Animated Gift Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
              >
                <GiftBox
                  onOpen={handleNextStep}
                  promptText={t.screen1.giftPrompt}
                />
              </motion.div>

              {/* Primary Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="mt-3 sm:mt-4"
              >
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="luxury-button-gold px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-serif text-base sm:text-lg font-semibold tracking-wide flex items-center gap-3 cursor-pointer group shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-[#fff2db]/50"
                >
                  <Sparkles className="w-5 h-5 text-[#301c0c] group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t.screen1.button}</span>
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ========================================================
              SCREEN 2 – A Little Question
             ======================================================== */}
          {currentStep === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-lg mx-auto w-full relative"
            >
              {/* Question Reaction Overlay */}
              <AnimatePresence>
                {questionReaction && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="absolute -top-16 inset-x-0 z-30 flex justify-center px-2"
                  >
                    <div className="px-5 sm:px-6 py-3 rounded-2xl bg-[#2e1320]/95 border border-[#ffd978]/60 shadow-[0_10px_35px_rgba(212,175,55,0.4)] backdrop-blur-md text-[#fffaf0] font-serif text-sm sm:text-base md:text-lg flex items-center gap-2.5">
                      <Heart className="w-5 h-5 text-[#f4c2c2] fill-[#f4c2c2] shrink-0 animate-bounce" />
                      <span>{questionReaction}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glowing Heart Emblem */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  filter: [
                    'drop-shadow(0 0 15px rgba(232,162,175,0.5))',
                    'drop-shadow(0 0 30px rgba(244,194,194,0.85))',
                    'drop-shadow(0 0 15px rgba(232,162,175,0.5))',
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#3b1728] via-[#240e19] to-[#160810] border border-[#d4af37]/40 flex items-center justify-center mb-5 sm:mb-6 shadow-xl"
              >
                <Heart className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#f4c2c2] fill-[#e8a2af]" />
              </motion.div>

              {/* Kicker */}
              <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#dfc282] mb-3">
                {t.screen2.kicker}
              </span>

              {/* Question Text */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-semibold text-[#fffaf3] leading-snug mb-8 sm:mb-10 max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {t.screen2.question}
              </h2>

              {/* Two Interactive Choices */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-sm">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswerQuestion('of_course')}
                  className="luxury-button-gold w-full sm:w-auto flex-1 py-3 sm:py-3.5 px-6 rounded-full font-serif text-base md:text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-[#fff2db]/40"
                >
                  <Heart className="w-4 h-4 text-[#8b1e3f] fill-[#b82d54]" />
                  <span>{t.screen2.btnOfCourse}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswerQuestion('tell_me')}
                  className="luxury-button-outline w-full sm:w-auto flex-1 py-3 sm:py-3.5 px-6 rounded-full font-serif text-base md:text-lg font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#ecd38c]" />
                  <span>{t.screen2.btnTellMe}</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              SCREEN 3 – A Small Reminder
             ======================================================== */}
          {currentStep === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto w-full"
            >
              {/* Subtle Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-serif tracking-[0.2em] uppercase text-[#dfc282] mb-6">
                <span className="w-6 h-[1px] bg-[#d4af37]/40" />
                <span>{t.screen3.kicker}</span>
                <span className="w-6 h-[1px] bg-[#d4af37]/40" />
              </div>

              {/* Mother & Child Loving Silhouette Motif */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Outer glowing ring */}
                <div className="w-26 h-26 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-[#331422] to-[#170910] border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                  {/* Two Interlocking Hearts */}
                  <div className="relative flex items-center justify-center">
                    <Heart className="w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#f4c2c2] fill-[#b76e79]/40 drop-shadow-[0_0_15px_rgba(244,194,194,0.6)]" />
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#ffd978] fill-[#d4af37] absolute -bottom-1 -right-1 drop-shadow-[0_0_10px_rgba(255,217,120,0.8)]" />
                  </div>
                </div>

                {/* Orbiting micro-sparkles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                    <Sparkles className="w-4 h-4 text-[#fcedbe]" />
                  </div>
                </motion.div>
              </div>

              {/* Heartfelt Line Display */}
              <div className="relative px-5 md:px-8 py-6 rounded-3xl bg-black/35 border border-[#d4af37]/25 backdrop-blur-md shadow-2xl mb-8 max-w-xl">
                <div className="absolute -top-4 left-6 text-4xl font-serif text-[#d4af37]/40">“</div>
                <blockquote className="font-serif text-xl sm:text-2xl md:text-4xl text-[#fff8f0] font-medium leading-relaxed italic tracking-wide">
                  {t.screen3.quote}
                </blockquote>
                <div className="absolute -bottom-6 right-6 text-4xl font-serif text-[#d4af37]/40">”</div>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextStep}
                className="luxury-button-gold px-8 py-3.5 rounded-full font-serif text-base md:text-lg font-semibold flex items-center gap-2.5 cursor-pointer shadow-lg border border-[#fff2db]/40"
              >
                <span>{t.screen3.button}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* ========================================================
              SCREEN 4 – The Appreciation
             ======================================================== */}
          {currentStep === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto w-full px-2"
            >
              {/* Kicker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 text-xs font-serif tracking-[0.25em] uppercase text-[#dfc282] mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.screen4.kicker}</span>
              </motion.div>

              {/* Gradual Text Reveal Card */}
              <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#230f1b]/60 via-[#180913]/60 to-[#10050c]/80 border border-[#d4af37]/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-8 w-full max-w-xl relative">
                {/* Ambient corner accents */}
                <div className="absolute top-3 left-4 text-xs font-serif text-[#d4af37]/30">✦</div>
                <div className="absolute top-3 right-4 text-xs font-serif text-[#d4af37]/30">✦</div>
                <div className="absolute bottom-3 left-4 text-xs font-serif text-[#d4af37]/30">✦</div>
                <div className="absolute bottom-3 right-4 text-xs font-serif text-[#d4af37]/30">✦</div>

                <div className="space-y-4">
                  {t.screen4.clauses.map((clause, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: clause.delay, duration: 0.9, ease: 'easeOut' }}
                      className={`font-serif leading-relaxed ${
                        idx === t.screen4.clauses.length - 1
                          ? 'text-xl sm:text-2xl md:text-3xl font-semibold text-[#fcedbe] pt-2'
                          : 'text-lg sm:text-xl md:text-2xl text-[#fff5ea] font-normal'
                      }`}
                    >
                      {clause.text}
                    </motion.p>
                  ))}
                </div>

                {/* Gratitude heart indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.6, duration: 0.6 }}
                  className="mt-6 flex justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f4c2c2]/10 border border-[#f4c2c2]/30 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#f4c2c2] fill-[#f4c2c2]" />
                  </div>
                </motion.div>
              </div>

              {/* Button: "One Last Thing..." */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 0.6 }}
              >
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="luxury-button-gold px-8 py-3.5 rounded-full font-serif text-base md:text-lg font-semibold flex items-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-[#fff2db]/40 group"
                >
                  <span>{t.screen4.button}</span>
                  <Sparkles className="w-4 h-4 text-[#38200b] group-hover:rotate-12 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ========================================================
              SCREEN 5 – The Final Surprise (Grand Climax)
             ======================================================== */}
          {currentStep === 5 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto w-full py-4 relative"
            >
              {/* Grand Dramatic Heading */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9 }}
                className="mb-2"
              >
                <span className="text-xs md:text-sm font-serif uppercase tracking-[0.3em] text-[#ecd38c] font-medium block mb-2">
                  {t.screen5.kicker}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#fffaf0] drop-shadow-[0_4px_25px_rgba(212,175,55,0.5)]">
                  {t.screen5.heading} <span className="text-[#f4c2c2] inline-block animate-pulse">❤️</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="font-serif italic text-base sm:text-xl md:text-2xl text-[#fcedbe] font-normal max-w-xl mx-auto mb-5 leading-relaxed"
              >
                {t.screen5.subtitle}
              </motion.p>

              {/* Animated Birthday Cake with Candles & Blow Wish Action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="w-full flex justify-center mb-5"
              >
                <BirthdayCake
                  cakeTag={t.screen5.cakeTag}
                  cakeGarland={t.screen5.cakeGarland}
                  makeWishBtn={t.screen5.makeWishBtn}
                  wishBlownMsg={t.screen5.wishBlownMsg}
                  relightBtn={t.screen5.relightBtn}
                />
              </motion.div>

              {/* Long Heartfelt Message Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-[#1b0b14]/75 border border-[#d4af37]/35 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-left max-w-2xl mx-auto mb-6"
              >
                {/* Card Corner Ornaments */}
                <div className="absolute top-3 left-4 text-xs text-[#d4af37]/40">✤</div>
                <div className="absolute top-3 right-4 text-xs text-[#d4af37]/40">✤</div>

                <div className="font-serif text-base sm:text-lg md:text-xl text-[#fff8f2] leading-relaxed space-y-4">
                  <p>{t.screen5.letterP1}</p>
                  <p>{t.screen5.letterP2}</p>
                  <p className="font-semibold text-[#fcedbe] text-lg sm:text-xl pt-1">
                    {t.screen5.letterP3}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-[#dfc282]/80">
                  <span className="font-serif italic">{t.screen5.signature}</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> {t.screen5.badge}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons: Memory Book & Relive Journey */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-3 pb-6"
              >
                <button
                  type="button"
                  onClick={() => setIsMemoryModalOpen(true)}
                  className="luxury-button-outline px-6 py-2.5 rounded-full text-xs md:text-sm font-serif tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <BookOpen className="w-4 h-4 text-[#ffd978]" />
                  <span>{t.screen5.btnMemories}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="luxury-button-outline px-6 py-2.5 rounded-full text-xs md:text-sm font-serif tracking-wider flex items-center gap-2 cursor-pointer shadow-md opacity-80 hover:opacity-100"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ecd38c]" />
                  <span>{t.screen5.btnRelive}</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Memory Modal */}
      <MemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        texts={t.memoriesModal}
      />

      {/* Subtle Bottom Ambient Note */}
      <footer className="relative z-30 py-3 text-center text-[11px] text-[#dfc282]/50 font-serif tracking-widest shrink-0 pointer-events-none">
        {t.footer}
      </footer>
    </div>
  );
}
