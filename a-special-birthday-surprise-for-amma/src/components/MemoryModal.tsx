import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Plus, Trash2 } from 'lucide-react';
import type { Translations } from '../utils/translations';

interface MemoryCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  isCustom?: boolean;
}

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  texts?: Translations['memoriesModal'];
}

export default function MemoryModal({ isOpen, onClose, texts }: MemoryModalProps) {
  const [customMemories, setCustomMemories] = useState<MemoryCard[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('');

  // Combine default translated cards with any user-added custom cards
  const activeDefaultCards: MemoryCard[] = texts?.defaultCards || [];
  const displayMemories = [...customMemories, ...activeDefaultCards];

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newCard: MemoryCard = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      tag: newTag.trim() || (texts?.tagPlaceholder || 'Memory'),
      isCustom: true,
    };

    setCustomMemories([newCard, ...customMemories]);
    setNewTitle('');
    setNewDesc('');
    setNewTag('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setCustomMemories(customMemories.filter((m) => m.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-[#180d15] border border-[#d4af37]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4af37]/15 bg-[#1f101b]/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#f4c2c2] fill-[#f4c2c2]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-[#fff4ea]">
                    {texts?.title || 'Treasured Memories & Blessings'}
                  </h3>
                  <p className="text-xs text-[#dfc282]">
                    {texts?.subtitle || 'Little reasons why you are the best Amma'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Add Custom Memory Toggle */}
              {!isAdding ? (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="w-full py-3 px-4 rounded-xl border border-dashed border-[#d4af37]/40 hover:border-[#ffd978] bg-[#d4af37]/5 hover:bg-[#d4af37]/10 text-xs text-[#ecd38c] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{texts?.addBtn || 'Add a Personal Memory or Note for Amma'}</span>
                </button>
              ) : (
                <form
                  onSubmit={handleAddMemory}
                  className="p-4 rounded-xl bg-black/40 border border-[#d4af37]/30 space-y-3 text-xs"
                >
                  <div className="flex justify-between items-center text-xs font-semibold text-[#ecd38c]">
                    <span>{texts?.addHeading || 'Add New Special Memory'}</span>
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="text-white/40 hover:text-white cursor-pointer"
                    >
                      {texts?.cancel || 'Cancel'}
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={texts?.titlePlaceholder || 'Title'}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-[#180d15] border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-[#ecd38c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder={texts?.descPlaceholder || 'Write your heartfelt memory or message here...'}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-[#180d15] border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-[#ecd38c] focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={texts?.tagPlaceholder || 'Tag'}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 bg-[#180d15] border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-[#ecd38c] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold hover:bg-[#ffe082] transition-colors cursor-pointer"
                    >
                      {texts?.saveBtn || 'Save Memory ✨'}
                    </button>
                  </div>
                </form>
              )}

              {/* Memory Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayMemories.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#23121d]/70 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 relative group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] tracking-widest uppercase font-serif text-[#ecd38c] px-2 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
                          {item.tag}
                        </span>
                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="opacity-0 group-hover:opacity-70 hover:opacity-100 text-white/50 hover:text-red-400 transition-opacity cursor-pointer"
                            title="Remove card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-semibold text-[#fff4ea] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        "{item.description}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#dfc282]/60">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" /> {texts?.withLove || 'With infinite love'}
                      </span>
                      <span>❤️</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#d4af37]/15 bg-[#1a0c16]/70 flex justify-between items-center text-xs text-[#dfc282]">
              <span>{texts?.footerNote || 'Made with love for Amma'}</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-[#ffd978] transition-colors cursor-pointer"
              >
                {texts?.closeBtn || 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
