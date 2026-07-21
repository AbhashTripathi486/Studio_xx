import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, RefreshCw, ChevronDown, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What is STUDIO_X?",
  "Show me core services",
  "Tell me about SmyleXL project",
  "How can I hire STUDIO_X?",
];

const getLocalFallbackAnswer = (userText: string): string | null => {
  const clean = userText.toLowerCase().trim().replace(/[?.!,]/g, '');
  
  if (clean.includes('what is studio_x') || clean.includes('what is studio x') || clean.includes('about studio_x') || clean.includes('who are you')) {
    return "STUDIO_X is an elite, high-performance digital design & technology atelier founded in 2024. We have flagship studios in New York, London, Tokyo, and Paris, specializing in crafting bespoke digital ecosystems that combine editorial luxury aesthetics with deep technical precision.";
  }
  
  if (clean.includes('core services') || clean.includes('show me services') || clean.includes('what services') || clean.includes('capabilities') || clean.includes('what do you do')) {
    return "Our core services include:\n1. UI/UX & Design Systems (Editorial layout, motion guidelines, component libraries, accessibility compliance)\n2. Full-Stack Web Engineering (High-throughput React/TypeScript, edge deployment, <100ms response targets)\n3. Brand Strategy & Direction (Identity positioning, creative direction)\n4. Motion & Interactive Experiences (WebGL/3D shaders, fluid canvas rendering, Framer Motion choreography)";
  }
  
  if (clean.includes('smylexl') || clean.includes('dental clinic website') || clean.includes('dental network')) {
    return "SmyleXL is a modern, responsive website designed for a multi-location dental clinic network. The primary focus is to establish trust, educate patients about available treatments, and simplify appointment booking through an intuitive user experience. It features doctor profiles, a centralized clinic locator, and a conversion-oriented booking flow.";
  }

  if (clean.includes('unique wholefood') || clean.includes('organic grocery') || clean.includes('organic food')) {
    return "Unique Wholefood is a premium e-commerce platform built for an Australian organic grocery retailer. The website enables customers to discover, purchase, and have certified organic produce, pantry essentials, wellness products, and eco-friendly goods delivered across Australia, while also supporting physical store locations.";
  }

  if (clean.includes('creative property stylist') || clean.includes('interior design') || clean.includes('home staging')) {
    return "Creative Property Stylist is a premium business website for an Australian interior design and home staging company. The platform showcases professional property styling, interior design, and consultation services while building trust through an elegant design, portfolio galleries, testimonials, and clear calls-to-action.";
  }

  if (clean.includes('holy dental care') || clean.includes('dental clinic website')) {
    return "Holy Dental Care is a modern healthcare website developed for a multi-specialty dental clinic in Mumbai. The platform is designed to build patient trust, showcase comprehensive dental treatments, and simplify appointment booking through a clean, informative, and user-friendly interface.";
  }
  
  if (clean.includes('hire') || clean.includes('contact') || clean.includes('brief') || clean.includes('start a project') || clean.includes('proposal') || clean.includes('work with you')) {
    return "You can start a project brief directly by clicking the 'Open Brief' link at the bottom of this chat, or by navigating to our 'Contact' section on the website. We customize high-end digital solutions tailored to your luxury brand or enterprise requirements.";
  }
  
  return null;
};

interface AIChatBotProps {
  onNavigateToContact?: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ onNavigateToContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to STUDIO_X. I am the atelier's AI Concierge. Ask me anything about our design capabilities, selected works, methodology, or how to launch a project with us.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Map messages for backend payload
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text || "I apologize, but I couldn't process your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to send chat message:", error);
      const fallbackText = getLocalFallbackAnswer(text);
      const textToDisplay = fallbackText 
        ? `${fallbackText}\n\n[Note: This response is served from the local archive because the connection to the STUDIO_X core system is currently offline.]`
        : "I am currently unable to reach the STUDIO_X core system. Please try again shortly or send a direct inquiry via our Contact section.";

      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: textToDisplay,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        text: "Welcome to STUDIO_X. How can I assist you with our agency services, projects, or team today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING TRIGGER BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger-btn"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#0a0b0e] text-[var(--text-primary)] border border-white/15 shadow-2xl backdrop-blur-xl hover:border-[#f27d26]/50 transition-all cursor-pointer"
            id="ai-chat-trigger"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#f27d26]/20 text-[#f27d26]">
              <Sparkles className="w-4 h-4 animate-pulse" />
              {hasUnread && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#f27d26] ring-2 ring-[#0a0b0e]" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sans">
                STUDIO_X AI
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Concierge Assistant
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHATBOT DIALOG / PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] sm:w-[400px] h-[520px] max-h-[80vh] rounded-2xl bg-[#0a0b0e] border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
            id="ai-chat-dialog"
          >
            {/* PANEL HEADER */}
            <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f27d26]/20 border border-[#f27d26]/40 flex items-center justify-center text-[#f27d26]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs uppercase font-extrabold tracking-widest text-[var(--text-primary)] font-sans">
                      STUDIO_X AI
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">
                    Ask about agency & works
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MESSAGES LIST AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      msg.role === 'user'
                        ? 'bg-white/10 text-[var(--text-primary)]'
                        : 'bg-[#f27d26]/20 text-[#f27d26] border border-[#f27d26]/30'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#f27d26] text-white rounded-tr-xs font-sans shadow-md'
                        : 'bg-white/5 border border-white/10 text-[var(--text-primary)] rounded-tl-xs font-serif leading-relaxed'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[9px] text-white/50 block mt-1.5 font-mono text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* TYPING / LOADING INDICATOR */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#f27d26]/20 border border-[#f27d26]/30 flex items-center justify-center text-[#f27d26]">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f27d26] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f27d26] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f27d26] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* SUGGESTED QUICK PROMPT PILLS */}
            {messages.length < 4 && !isLoading && (
              <div className="px-4 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#f27d26]/50 text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT FOOTER */}
            <div className="p-3 bg-white/5 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 bg-[#121318] border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-[#f27d26]/60 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about STUDIO_X services, portfolio..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none py-1"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-1.5 rounded-lg bg-[#f27d26] text-white disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] font-mono px-1">
                <span>Direct AI Concierge • STUDIO_X Only</span>
                {onNavigateToContact && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigateToContact();
                    }}
                    className="text-[#f27d26] hover:underline"
                  >
                    Open Brief &rarr;
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
