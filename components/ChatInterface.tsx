import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BrainCircuit, Zap, Sparkles, Copy, Palette, Check, Bookmark, BookMarked, Trash2, X, ChevronRight } from 'lucide-react';
import { ChatMessage, SavedPrompt, ThemeColor } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { getSavedPrompts, savePrompt, deleteSavedPrompt } from '../services/storageService';

interface ChatInterfaceProps {
  onUsePrompt?: (prompt: string) => void;
  themeColor: ThemeColor;
  isDarkMode?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onUsePrompt, themeColor, isDarkMode = true }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Lumina. I can help you design prompts, suggest styles, or plan your next creative project. Toggle 'Thinking Mode' for complex requests!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);
  
  // Saved Prompts State
  const [showSavedPrompts, setShowSavedPrompts] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setSavedPrompts(getSavedPrompts());
  }, [showSavedPrompts]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendChatMessage(history, userMsg.text, thinkingMode);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat interface caught error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: error.message || "Sorry, I encountered an error connecting to Gemini. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrompt = (text: string) => {
    savePrompt(text);
    setSavedPrompts(getSavedPrompts()); // refresh
    
    // Visual feedback
    const btn = document.getElementById('save-success-toast');
    if (btn) {
      btn.classList.remove('hidden');
      setTimeout(() => btn.classList.add('hidden'), 2000);
    }
  };

  const handleDeletePrompt = (id: string) => {
    deleteSavedPrompt(id);
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  const extractStyles = (text: string): string[] => {
    const styleMatch = text.match(/(?:\*\*?Style Suggestions:?\*\*?)([\s\S]*?)(?=$|---)/i);
    if (!styleMatch || !styleMatch[1]) return [];

    return styleMatch[1]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.match(/^[\*\-•\d\.]/))
      .map(line => line.replace(/^[\*\-•\d\.]+\s*/, ''));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStyle(text);
    setTimeout(() => setCopiedStyle(null), 2000);
  };

  // UI Helpers
  const headerClass = isDarkMode ? 'bg-gray-900/60 border-white/5' : 'bg-white/80 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const toggleInactive = isDarkMode ? 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300';
  
  const botBubble = isDarkMode 
    ? 'bg-gray-800/80 text-gray-200 border-white/10' 
    : 'bg-white text-gray-800 border-gray-200 shadow-sm';
  
  const userBubble = `bg-${themeColor}-600 text-white`;
  
  const styleChip = isDarkMode 
    ? 'bg-gray-900/80 border-white/10' 
    : 'bg-gray-100 border-gray-200';

  const inputContainer = isDarkMode ? 'bg-gray-900/80 border-white/5' : 'bg-white/90 border-gray-200';
  const inputBox = isDarkMode 
    ? 'bg-gray-800/50 text-white border-white/10' 
    : 'bg-gray-100 text-gray-900 border-gray-200';

  const sidebarBg = isDarkMode ? 'bg-gray-900/95 border-white/10' : 'bg-white/95 border-gray-200';

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Toast Notification */}
      <div id="save-success-toast" className="hidden absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2">
        Prompt Saved!
      </div>

      {/* Header / Mode Toggle */}
      <div className={`p-4 border-b flex justify-between items-center backdrop-blur-md sticky top-0 z-10 ${headerClass}`}>
        <h2 className={`text-lg font-semibold ${textPrimary}`}>AI Assistant</h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSavedPrompts(!showSavedPrompts)}
            className={`p-2 rounded-full transition-all relative ${
              showSavedPrompts 
                ? `bg-${themeColor}-600 text-white shadow-lg` 
                : toggleInactive
            }`}
            title="Saved Prompts"
          >
            <BookMarked size={18} />
          </button>
          
          <button
            onClick={() => setThinkingMode(!thinkingMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              thinkingMode 
                ? `bg-${themeColor}-600 text-white ring-2 ring-${themeColor}-400 ring-offset-2 ${isDarkMode ? 'ring-offset-gray-900 shadow-lg shadow-' + themeColor + '-900/50' : 'ring-offset-white'}` 
                : toggleInactive
            }`}
          >
            {thinkingMode ? <BrainCircuit size={16} /> : <Zap size={16} />}
            <span className="hidden sm:inline">{thinkingMode ? 'Thinking Mode' : 'Fast Mode'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => {
            const styles = msg.role === 'model' ? extractStyles(msg.text) : [];
            const isEnhancedMsg = msg.role === 'model' && (msg.text.includes("Enhanced Prompt:") || msg.text.includes("**Enhanced Prompt"));
            
            return (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className={`w-8 h-8 rounded-full bg-${themeColor}-600 flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] lg:max-w-[75%] rounded-2xl p-4 shadow-lg backdrop-blur-sm ${
                    msg.role === 'user'
                      ? `${userBubble} rounded-tr-none`
                      : `${botBubble} rounded-tl-none border`
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  
                  {isEnhancedMsg && (
                     <div className="flex flex-wrap gap-2 mt-4">
                       <button 
                         onClick={() => {
                           const match = msg.text.match(/\*\*?Enhanced Prompt:?\*\*?\s*([\s\S]+?)(?=\n\s*(\*\*?Style|\*\*?Options|---|$))/i);
                           let extracted = "";
                           if (match && match[1]) {
                              extracted = match[1].trim();
                           } else {
                              const simpleMatch = msg.text.split(/Enhanced Prompt:?/i)[1];
                              if (simpleMatch) extracted = simpleMatch.trim();
                           }
                           
                           if (extracted && onUsePrompt) onUsePrompt(extracted);
                         }}
                         className={`flex-1 text-xs px-3 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 border ${
                            isDarkMode 
                             ? `bg-gray-900/50 hover:bg-gray-900 text-${themeColor}-300 border-${themeColor}-500/30` 
                             : `bg-${themeColor}-50 hover:bg-${themeColor}-100 text-${themeColor}-700 border-${themeColor}-200`
                         }`}
                       >
                         <Sparkles size={14} /> Use Enhanced Prompt
                       </button>

                       <button 
                         onClick={() => {
                           const match = msg.text.match(/\*\*?Enhanced Prompt:?\*\*?\s*([\s\S]+?)(?=\n\s*(\*\*?Style|\*\*?Options|---|$))/i);
                           let extracted = "";
                           if (match && match[1]) {
                              extracted = match[1].trim();
                           } else {
                              const simpleMatch = msg.text.split(/Enhanced Prompt:?/i)[1];
                              if (simpleMatch) extracted = simpleMatch.trim();
                           }
                           
                           if (extracted) handleSavePrompt(extracted);
                         }}
                         className={`px-3 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 border ${
                            isDarkMode 
                             ? 'bg-gray-900/50 hover:bg-gray-900 text-gray-300 border-white/10' 
                             : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200'
                         }`}
                         title="Save to Library"
                       >
                         <Bookmark size={14} /> Save
                       </button>
                     </div>
                  )}

                  {styles.length > 0 && (
                    <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <p className={`text-xs font-medium mb-2 uppercase tracking-wider ${textSecondary}`}>Style Options</p>
                      <div className="flex flex-wrap gap-2">
                        {styles.map((style, idx) => (
                          <div key={idx} className={`flex items-center rounded-lg border overflow-hidden ${styleChip}`}>
                            <span className={`px-3 py-1.5 text-xs border-r truncate max-w-[150px] ${
                              isDarkMode ? 'text-gray-300 border-white/10' : 'text-gray-700 border-gray-300'
                            }`} title={style}>
                              {style}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(style)}
                              className={`p-1.5 transition-colors ${
                                isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-900'
                              }`}
                              title="Copy Style"
                            >
                              {copiedStyle === style ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                 {msg.role === 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-400 border border-white/10' : 'bg-gray-200 text-gray-600'}`}>
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-full bg-${themeColor}-600 flex items-center justify-center flex-shrink-0 animate-pulse`}>
                <Bot size={16} className="text-white" />
              </div>
              <div className={`rounded-2xl rounded-tl-none p-4 ${botBubble} flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Saved Prompts Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-full sm:w-80 backdrop-blur-xl border-l transform transition-transform duration-300 ease-in-out z-20 flex flex-col ${sidebarBg} ${showSavedPrompts ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <BookMarked size={18} className={`text-${themeColor}-500`} />
                <h3 className={`font-semibold ${textPrimary}`}>Saved Prompts</h3>
              </div>
              <button 
                onClick={() => setShowSavedPrompts(false)}
                className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X size={18} />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedPrompts.length === 0 ? (
                <div className="text-center py-12 px-4">
                   <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                     <Bookmark className="text-gray-400" size={20} />
                   </div>
                   <p className={`text-sm ${textSecondary}`}>No saved prompts yet.</p>
                   <p className={`text-xs mt-1 opacity-60 ${textSecondary}`}>Save "Enhanced Prompts" from the chat to access them here.</p>
                </div>
              ) : (
                savedPrompts.map(prompt => (
                  <div key={prompt.id} className={`p-3 rounded-xl border group transition-all ${isDarkMode ? 'bg-gray-800/40 border-white/5 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                    <p className={`text-sm mb-3 line-clamp-3 leading-relaxed ${textPrimary}`}>{prompt.text}</p>
                    <div className="flex gap-2">
                       <button 
                         onClick={() => {
                           setInput(prompt.text);
                           setShowSavedPrompts(false);
                         }}
                         className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                            isDarkMode 
                            ? `bg-${themeColor}-900/30 text-${themeColor}-300 hover:bg-${themeColor}-900/50` 
                            : `bg-${themeColor}-50 text-${themeColor}-700 hover:bg-${themeColor}-100`
                         }`}
                       >
                         <ChevronRight size={12} /> Load to Chat
                       </button>
                       <button 
                         onClick={() => handleDeletePrompt(prompt.id)}
                         className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                         title="Delete"
                       >
                         <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t backdrop-blur-md ${inputContainer}`}>
        <div className="relative flex items-center">
           <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={thinkingMode ? "Ask for a complex image plan..." : "Ask me anything..."}
            className={`w-full rounded-full pl-6 pr-14 py-4 shadow-lg focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none transition-all ${inputBox}`}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-full transition-all ${
              !input.trim() || isLoading 
                ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed' 
                : `bg-${themeColor}-600 text-white hover:bg-${themeColor}-500 hover:scale-105 shadow-lg shadow-${themeColor}-900/30`
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className={`text-[10px] text-center mt-3 ${textSecondary}`}>
          {thinkingMode ? 'Using Gemini 3 Pro (Thinking)' : 'Using Gemini 2.5 Flash'} • AI can make mistakes.
        </p>
      </div>
    </div>
  );
};