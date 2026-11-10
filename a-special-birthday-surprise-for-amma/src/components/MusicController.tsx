import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MusicControllerProps {
  hasStartedAudio: boolean;
  onUserInitiatedPlay?: () => void;
  texts?: {
    musicOn: string;
    musicOff: string;
    title: string;
    soundtrackType: string;
    pianoTitle: string;
    pianoDesc: string;
    customTitle: string;
    customDesc: string;
    urlLabel: string;
    urlPlaceholder: string;
    tip: string;
    volume: string;
  };
}

export default function MusicController({ hasStartedAudio, onUserInitiatedPlay, texts }: MusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    setIsPlaying(soundManager.getIsPlaying());
    setVolume(soundManager.getVolume());
  }, [hasStartedAudio]);

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setIsPlaying(newState);
    setVolume(soundManager.getVolume());
    if (newState && onUserInitiatedPlay) {
      onUserInitiatedPlay();
    }
  };

  const handleSaveCustomUrl = () => {
    if (customUrl.trim()) {
      soundManager.setCustomAudioUrl(customUrl.trim());
      soundManager.setUseCustomAudio(true);
      setUseCustom(true);
    } else {
      soundManager.setUseCustomAudio(false);
      setUseCustom(false);
    }
    setShowSettings(false);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundManager.setVolume(newVol);
    if (newVol > 0 && !isPlaying) {
      soundManager.play();
      setIsPlaying(true);
      if (onUserInitiatedPlay) {
        onUserInitiatedPlay();
      }
    } else if (newVol === 0 && isPlaying) {
      soundManager.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative flex items-center gap-1.5 sm:gap-2">
      {/* Sound Settings Button */}
      <button
        type="button"
        onClick={() => setShowSettings(!showSettings)}
        className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-[#d4af37]/30 text-[#dfc282] hover:text-[#fff] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
        title="Music Settings & Custom Track"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Main Music Toggle Pill */}
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer ${
          isPlaying
            ? 'bg-[#2a131e]/70 border-[#e5c158]/50 text-[#fff2db] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            : 'bg-black/50 border-white/20 text-[#a39097] hover:text-white'
        }`}
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#ecd38c]" />
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-[#ffd978] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-[#ecd38c] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-3.5 bg-[#fff2db] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
            <span className="text-xs font-serif tracking-wider hidden sm:inline text-[#ecd38c]">
              {texts?.musicOn || 'Music On'}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-xs font-serif tracking-wider hidden sm:inline">
              {texts?.musicOff || 'Music Off'}
            </span>
          </>
        )}
      </button>

      {/* Music Settings Modal Popover */}
      {showSettings && (
        <div className="absolute top-12 right-0 w-80 p-5 rounded-2xl bg-[#180c13]/95 border border-[#d4af37]/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#fffaf0] z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2 text-sm font-serif font-semibold text-[#ecd38c]">
              <Music className="w-4 h-4" />
              <span>{texts?.title || 'Background Music'}</span>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="text-white/40 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Mode Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#dfc282]/80 font-medium mb-1.5">
                {texts?.soundtrackType || 'Soundtrack Type'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUseCustom(false);
                    soundManager.setUseCustomAudio(false);
                  }}
                  className={`px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                    !useCustom
                      ? 'bg-[#d4af37]/20 border-[#ecd38c] text-[#fff]'
                      : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <p className="font-medium text-xs text-[#ecd38c] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {texts?.pianoTitle || 'Piano Lullaby'}
                  </p>
                  <p className="text-[10px] text-white/50">{texts?.pianoDesc || 'Procedural acoustic tone'}</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseCustom(true);
                    soundManager.setUseCustomAudio(true);
                  }}
                  className={`px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                    useCustom
                      ? 'bg-[#d4af37]/20 border-[#ecd38c] text-[#fff]'
                      : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <p className="font-medium text-xs text-[#ecd38c]">{texts?.customTitle || 'Custom MP3'}</p>
                  <p className="text-[10px] text-white/50">{texts?.customDesc || 'Your own track URL'}</p>
                </button>
              </div>
            </div>

            {/* Custom URL Input if Custom selected */}
            {useCustom && (
              <div>
                <label className="block text-[11px] text-white/70 mb-1">
                  {texts?.urlLabel || 'MP3 Audio URL (CORS enabled):'}
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder={texts?.urlPlaceholder || 'https://example.com/mothers-song.mp3'}
                    className="flex-1 bg-black/50 border border-white/15 rounded-md px-2.5 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#ecd38c] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveCustomUrl}
                    className="px-2.5 py-1.5 bg-[#d4af37] text-black font-semibold rounded-md hover:bg-[#ffe082] transition-colors cursor-pointer flex items-center justify-center"
                    title="Apply track"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-white/40 mt-1">
                  {texts?.tip || 'Tip: Plays automatically in loop. Falls back to soothing piano if unavailable.'}
                </p>
              </div>
            )}

            {/* Volume Control */}
            <div>
              <div className="flex justify-between items-center text-[11px] text-white/70 mb-1">
                <span>{texts?.volume || 'Volume'}</span>
                <span className="font-mono text-[#ecd38c]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer h-1.5 bg-black/40 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
