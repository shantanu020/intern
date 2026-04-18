"use client";

import React, { useState } from "react";
import { Paperclip, Smile, Send, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessengerInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function MessengerInput({ onSend, disabled }: MessengerInputProps) {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    setShowEmojis(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-8 bg-background border-t border-edge">
      <div className="max-w-4xl mx-auto flex items-end gap-3 bg-zinc-950 border border-zinc-900 rounded-2xl p-2.5 shadow-premium group focus-within:border-accent/40 transition-all">
        
        <button className="p-3 text-zinc-600 hover:text-white transition-colors hover:bg-white/5 rounded-xl">
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
           <textarea 
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Transmit secure signal..."
            className="w-full bg-transparent border-none focus:ring-0 text-copy-primary py-3 px-2 resize-none text-[0.95rem] font-medium placeholder:text-zinc-700 min-h-[48px] max-h-[150px] scrollbar-hide"
            disabled={disabled}
          />
        </div>

        <div className="flex items-center gap-1.5 pr-1.5 pb-1">
          <div className="relative">
             {showEmojis && (
               <div className="absolute bottom-16 right-0 bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl shadow-premium flex gap-2.5 z-50 animate-in fade-in slide-in-from-bottom-2">
                 {['👍','🔥','🚀','⚡','🙌','💼'].map(emoji => (
                   <button 
                    key={emoji} 
                    onClick={() => { setText(prev => prev + emoji); setShowEmojis(false); }}
                    className="hover:bg-white/10 p-2 rounded-xl transition-all text-xl active:scale-90"
                   >
                     {emoji}
                   </button>
                 ))}
               </div>
             )}
             <button 
              onClick={() => setShowEmojis(!showEmojis)}
              className={cn(
                "p-3 rounded-xl transition-all",
                showEmojis ? "text-accent bg-accent/10" : "text-zinc-600 hover:text-white hover:bg-white/5"
              )}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all",
              text.trim() && !disabled
                ? "bg-accent text-zinc-950 shadow-glow-accent scale-100 hover:scale-105" 
                : "bg-zinc-900 text-zinc-700 pointer-events-none"
            )}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-between mt-4 px-2">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow-emerald" /> Encryption Active
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" /> High Signal Node
            </div>
         </div>
         <div className="text-[9px] font-bold text-zinc-800 uppercase tracking-widest">
            Shift + Enter for new line
         </div>
      </div>
    </div>
  );
}
