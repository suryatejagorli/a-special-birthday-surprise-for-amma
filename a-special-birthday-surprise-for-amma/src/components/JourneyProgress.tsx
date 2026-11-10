import { motion } from 'motion/react';

interface JourneyProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  stepLabels?: string[];
  partLabel?: string;
  ofLabel?: string;
}

const DEFAULT_STEP_LABELS = [
  'Welcome',
  'A Question',
  'A Reminder',
  'Appreciation',
  'Birthday Wish',
];

export default function JourneyProgress({
  currentStep,
  totalSteps,
  onStepClick,
  stepLabels = DEFAULT_STEP_LABELS,
  partLabel = 'Part',
  ofLabel = 'of',
}: JourneyProgressProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none pointer-events-auto">
      {/* Dots and Connecting Track */}
      <div className="flex items-center gap-2 md:gap-3 bg-black/40 px-4 py-2 rounded-full border border-[#d4af37]/20 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={index} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  // Only allow clicking to visited steps or if onStepClick provided
                  if (onStepClick && stepNum <= currentStep) {
                    onStepClick(stepNum);
                  }
                }}
                disabled={stepNum > currentStep}
                className={`relative flex items-center justify-center transition-all duration-300 focus:outline-none ${
                  stepNum <= currentStep ? 'cursor-pointer' : 'cursor-default opacity-40'
                }`}
                title={`Step ${stepNum}: ${stepLabels[index] || ''}`}
              >
                {/* Active Outer Halo */}
                {isActive && (
                  <motion.div
                    layoutId="activeHalo"
                    className="absolute -inset-1.5 rounded-full bg-[#d4af37]/30 blur-xs animate-pulse"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Dot */}
                <div
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#ffe082] via-[#ffd54f] to-[#fff] scale-125 shadow-[0_0_10px_rgba(255,215,0,0.9)]'
                      : isCompleted
                      ? 'bg-[#d4af37]/80'
                      : 'bg-white/20'
                  }`}
                />
              </button>

              {/* Connecting line */}
              {index < totalSteps - 1 && (
                <div
                  className={`w-3 md:w-5 h-[1.5px] mx-1 md:mx-1.5 transition-colors duration-300 ${
                    stepNum < currentStep ? 'bg-[#d4af37]/60' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Label Text */}
      <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-serif tracking-widest uppercase text-[#dfc282]/85 font-medium">
        <span>{partLabel} {currentStep} {ofLabel} {totalSteps}</span>
        <span className="opacity-40">·</span>
        <span className="text-[#fffaf0]">{stepLabels[currentStep - 1] || ''}</span>
      </div>
    </div>
  );
}
