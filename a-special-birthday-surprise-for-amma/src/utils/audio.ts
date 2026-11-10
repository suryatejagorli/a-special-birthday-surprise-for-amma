/**
 * Ambient Audio & Sound Synthesizer using Web Audio API
 * Generates peaceful, emotional music-box / piano chord progression without external assets.
 * Also supports custom audio URL playback.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private musicInterval: number | null = null;
  private volume: number = 0.6;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio: boolean = false;
  private customAudioUrl: string = '';

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      const currentGain = this.isPlaying ? this.volume : 0;
      this.masterGain.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudioUrl(url: string) {
    this.customAudioUrl = url;
    if (this.customAudio) {
      this.customAudio.src = url;
      if (this.isPlaying && this.useCustomAudio) {
        this.customAudio.play().catch(() => {});
      }
    }
  }

  public setUseCustomAudio(enable: boolean) {
    this.useCustomAudio = enable;
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  public getUseCustomAudio(): boolean {
    return this.useCustomAudio;
  }

  public getCustomAudioUrl(): string {
    return this.customAudioUrl;
  }

  public play() {
    this.initContext();
    this.isPlaying = true;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.05);
    }

    if (this.useCustomAudio && this.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customAudioUrl);
        this.customAudio.loop = true;
      } else {
        this.customAudio.src = this.customAudioUrl;
      }
      this.customAudio.volume = this.volume;
      this.customAudio.play().catch(() => {
        // Fallback to synth if custom audio fails or blocked
        this.startProceduralMelody();
      });
      return;
    }

    if (!this.musicInterval) {
      this.startProceduralMelody();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);
    }
    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      if (this.volume === 0) {
        this.setVolume(0.6);
      }
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      const target = this.isPlaying ? this.volume : 0;
      this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.04);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  // Plays a delicate, resonant musical tone (like a music box/harp/rhodes)
  private playTone(freq: number, startTime: number, duration: number, gainMultiplier = 1) {
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft sine + subtle harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Low pass filter for warm, rounded, gentle sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, startTime);
      filter.frequency.linearRampToValueAtTime(300, startTime + duration);

      const targetGain = 0.12 * gainMultiplier;
      gain.gain.setValueAtTime(0.0001, startTime);
      // Gentle soft attack
      gain.gain.linearRampToValueAtTime(targetGain, startTime + 0.04);
      // Long gentle ringing decay
      gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    } catch {
      // Audio error safe ignore
    }
  }

  private startProceduralMelody() {
    this.initContext();
    if (!this.ctx) return;

    // A tender, uplifting lullaby chord progression in F Major / D Minor
    // Fmaj9 -> C/E -> Dm7 -> Bbmaj7 -> F/A -> Gm7 -> C7sus -> F
    const chords = [
      // Fmaj9 (F3, C4, E4, A4, G4)
      [174.61, 261.63, 329.63, 440.0, 392.0],
      // C/E (E3, G3, C4, E4, G4)
      [164.81, 196.0, 261.63, 329.63, 392.0],
      // Dm9 (D3, A3, F4, C5, E5)
      [146.83, 220.0, 349.23, 523.25, 659.25],
      // Bbmaj7 (Bb2, F3, D4, A4, D5)
      [116.54, 174.61, 293.66, 440.0, 587.33],
      // F/A (A2, F3, C4, F4, A4)
      [110.0, 174.61, 261.63, 349.23, 440.0],
      // Gm7 (G2, D3, Bb3, F4, Bb4)
      [98.0, 146.83, 233.08, 349.23, 466.16],
      // C11 / Csus4 (C3, G3, C4, F4, D5)
      [130.81, 196.0, 261.63, 349.23, 587.33],
      // Fmaj7 resolve (F2, C3, A3, E4, A4)
      [87.31, 130.81, 220.0, 329.63, 440.0],
    ];

    let chordIndex = 0;

    const playNextArpeggio = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentNotes = chords[chordIndex % chords.length];
      const now = this.ctx.currentTime;

      // Play bass note
      this.playTone(currentNotes[0], now, 3.2, 1.2);

      // Play rippling arpeggio
      currentNotes.slice(1).forEach((freq, i) => {
        const offset = 0.28 * (i + 1);
        this.playTone(freq, now + offset, 2.6, 0.9);
      });

      // Extra sparkling octave note
      this.playTone(currentNotes[currentNotes.length - 1] * 1.5, now + 1.2, 2.0, 0.6);

      chordIndex++;
    };

    playNextArpeggio();
    if (this.musicInterval) window.clearInterval(this.musicInterval);
    this.musicInterval = window.setInterval(playNextArpeggio, 2400);
  }

  // Sound Effect: Gentle golden chime for button transitions
  public playChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.08, 1.2, 0.7);
    });
  }

  // Sound Effect: Sweet heart pop
  public playHeartSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.playTone(440, now, 0.3, 0.5);
    this.playTone(659.25, now + 0.09, 0.6, 0.7);
  }

  // Sound Effect: Candle blow whoosh and wish chime
  public playWishFanfare() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Soft breath/wind whoosh using noise buffer
    try {
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.7);
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.75);

      noise.connect(filter);
      filter.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      } else {
        gain.connect(this.ctx.destination);
      }

      noise.start(now);
    } catch {
      // ignore
    }

    // Triumphant sparkling celestial arpeggio
    const fanfareNotes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5, 1318.5];
    fanfareNotes.forEach((freq, i) => {
      this.playTone(freq, now + 0.45 + i * 0.11, 2.5, 0.9);
    });
  }
}

export const soundManager = new SoundController();
