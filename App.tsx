import React, { useState, useEffect } from 'react';
import { AppMode, ThemeColor } from './types';
import { Navigation } from './components/Navigation';
import { ChatInterface } from './components/ChatInterface';
import { Generator } from './components/Generator';
import { FreeGenerator } from './components/FreeGenerator';
import { Editor } from './components/Editor';
import { LogoDesigner } from './components/LogoDesigner';
import { History } from './components/History';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.ASSISTANT);
  const [genPrompt, setGenPrompt] = useState<string>('');
  const [themeColor, setThemeColor] = useState<ThemeColor>('purple');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('lumina_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('lumina_theme', newMode ? 'dark' : 'light');
  };

  // Handler to move from Chat to Generator with a specific prompt
  const handleUsePrompt = (prompt: string) => {
    setGenPrompt(prompt);
    setCurrentMode(AppMode.GENERATOR);
  };

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.ASSISTANT:
        return <ChatInterface onUsePrompt={handleUsePrompt} themeColor={themeColor} isDarkMode={isDarkMode} />;
      case AppMode.GENERATOR:
        return <Generator initialPrompt={genPrompt} themeColor={themeColor} isDarkMode={isDarkMode} />;
      case AppMode.FREE_GEN:
        return <FreeGenerator themeColor={themeColor} isDarkMode={isDarkMode} />;
      case AppMode.EDITOR:
        return <Editor themeColor={themeColor} isDarkMode={isDarkMode} />;
      case AppMode.LOGO:
        return <LogoDesigner themeColor={themeColor} isDarkMode={isDarkMode} />;
      case AppMode.HISTORY:
        return <History themeColor={themeColor} isDarkMode={isDarkMode} />;
      default:
        return <ChatInterface themeColor={themeColor} isDarkMode={isDarkMode} />;
    }
  };

  // Helper for background definition
  const getBackgroundClass = () => {
     if (!isDarkMode) {
       return 'bg-gradient-to-br from-gray-50 via-white to-gray-100';
     }

     // Dark Mode Gradients
     if (themeColor === 'gray') return 'bg-gradient-to-br from-gray-900 via-black to-gray-950';
     if (themeColor === 'yellow') return 'bg-gradient-to-br from-yellow-950/30 via-gray-950 to-black';
     
     return `bg-gradient-to-br from-${themeColor}-950/60 via-gray-950 to-black`;
  };

  return (
    <div className={`fixed inset-0 h-[100dvh] flex overflow-hidden selection:bg-${themeColor}-500/30 ${isDarkMode ? 'text-white bg-black' : 'text-gray-900 bg-white'}`}>
      
      {/* Noise Texture Overlay */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${isDarkMode ? 'opacity-20' : 'opacity-5'} bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay`}></div>

      {/* Dynamic Theme Background Layer - Primary Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out -z-20 ${getBackgroundClass()}`}></div>
      
      {/* Ambient Theme Blobs for extra depth - Positioned without negative coordinates using transforms */}
      <div className={`absolute top-0 left-0 w-[60%] h-[60%] rounded-full bg-${themeColor === 'gray' ? 'gray' : themeColor}-${isDarkMode ? '900' : '200'}/10 blur-[150px] transition-colors duration-1000 pointer-events-none -z-10 -translate-x-[20%] -translate-y-[20%]`}></div>
      <div className={`absolute bottom-0 right-0 w-[60%] h-[60%] rounded-full bg-${themeColor === 'gray' ? 'gray' : themeColor}-${isDarkMode ? '900' : '200'}/10 blur-[150px] transition-colors duration-1000 pointer-events-none -z-10 translate-x-[20%] translate-y-[20%]`}></div>

      <div className="hidden md:flex flex-col h-full z-10 relative">
        <Navigation 
          currentMode={currentMode} 
          setMode={setCurrentMode} 
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 z-0 relative">
        {/* Mobile Header / Nav Switcher */}
        <div className={`md:hidden flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-900/80 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b z-20`}>
          <div className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-${themeColor}-400 to-${isDarkMode ? 'white' : 'gray-600'}`}>
            Lumina
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               {isDarkMode ? '☀️' : '🌙'}
            </button>
            <select 
              value={currentMode}
              onChange={(e) => setCurrentMode(e.target.value as AppMode)}
              className={`border-none rounded-lg text-sm p-2 focus:ring-2 focus:ring-${themeColor}-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              <option value={AppMode.ASSISTANT}>Assistant</option>
              <option value={AppMode.GENERATOR}>Generate</option>
              <option value={AppMode.FREE_GEN}>Free Gen</option>
              <option value={AppMode.EDITOR}>Edit</option>
              <option value={AppMode.LOGO}>Logo Studio</option>
              <option value={AppMode.HISTORY}>History</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative z-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;