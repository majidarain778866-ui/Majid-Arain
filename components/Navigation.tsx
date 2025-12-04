import React from 'react';
import { MessageSquare, Image as ImageIcon, Wand2, Sparkles, LayoutGrid, Clock, Sun, Moon, Zap } from 'lucide-react';
import { AppMode, ThemeColor } from '../types';

interface NavigationProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentMode, setMode, themeColor, setThemeColor, isDarkMode, toggleTheme }) => {
  const navItems = [
    { mode: AppMode.ASSISTANT, label: 'Assistant', icon: <MessageSquare size={20} /> },
    { mode: AppMode.GENERATOR, label: 'Generate', icon: <ImageIcon size={20} /> },
    { mode: AppMode.FREE_GEN, label: 'Free Gen', icon: <Zap size={20} /> },
    { mode: AppMode.EDITOR, label: 'Edit', icon: <Wand2 size={20} /> },
    { mode: AppMode.LOGO, label: 'Logo Studio', icon: <LayoutGrid size={20} /> },
    { mode: AppMode.HISTORY, label: 'History', icon: <Clock size={20} /> },
  ];

  const themes: { id: ThemeColor; color: string; label: string }[] = [
    { id: 'red', color: 'bg-red-500', label: 'Red' },
    { id: 'blue', color: 'bg-blue-500', label: 'Blue' },
    { id: 'green', color: 'bg-green-500', label: 'Green' },
    { id: 'yellow', color: 'bg-yellow-500', label: 'Yellow' },
    { id: 'purple', color: 'bg-purple-500', label: 'Purple' },
    { id: 'gray', color: isDarkMode ? 'bg-gray-200' : 'bg-gray-800', label: 'Mono' },
  ];

  return (
    <div className={`w-full md:w-64 flex flex-col h-full flex-shrink-0 backdrop-blur-2xl border-r transition-colors duration-300 shadow-2xl ${
      isDarkMode 
        ? 'bg-gray-950/40 border-white/5' 
        : 'bg-white/60 border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className={`text-${themeColor}-500`} />
            <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${themeColor}-400 to-${themeColor === 'purple' ? 'pink' : (isDarkMode ? 'white' : 'gray-600')}`}>
              Lumina
            </h1>
          </div>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Theme Selector */}
        <div className={`mb-6 p-3 rounded-xl border backdrop-blur-sm ${
          isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white/50 border-gray-200'
        }`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>Theme Color</p>
          <div className="flex justify-between px-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeColor(t.id)}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${t.color} ${
                  themeColor === t.id 
                    ? `ring-2 ring-offset-2 scale-110 ${isDarkMode ? 'ring-white ring-offset-gray-900 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'ring-gray-400 ring-offset-white shadow-md'}`
                    : 'opacity-50 hover:opacity-100 hover:scale-110'
                }`}
                title={t.label}
              />
            ))}
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => setMode(item.mode)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentMode === item.mode
                ? `bg-${themeColor}-600 text-white shadow-lg shadow-${themeColor}-900/50 border border-${themeColor}-500/30`
                : `${isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'}`
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={`p-4 border-t text-xs text-center opacity-60 ${
        isDarkMode ? 'border-white/5 text-gray-500' : 'border-gray-200 text-gray-400'
      }`}>
        Powered by Gemini 2.5 & 3.0
      </div>
    </div>
  );
};