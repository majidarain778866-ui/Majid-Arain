import React, { useState } from 'react';
import { Download, Zap, Loader2, AlertCircle, Settings2, Maximize, FileImage, Sparkles, RotateCcw } from 'lucide-react';
import { generateImage, getClosestAspectRatio, sendChatMessage } from '../services/geminiService';
import { addToHistory } from '../services/storageService';
import { ThemeColor, ImageSize } from '../types';

interface FreeGeneratorProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
}

export const FreeGenerator: React.FC<FreeGeneratorProps> = ({ themeColor, isDarkMode }) => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsEnhancing(true);
    setError(null);
    
    try {
      const response = await sendChatMessage(
        [], 
        `Enhance this image generation prompt to be highly detailed, artistic, and descriptive. Input: "${prompt}"`, 
        false
      );

      let enhanced = response;
      const match = response.match(/\*\*?Enhanced Prompt:?\*\*?\s*([\s\S]+?)(?=\n\s*(\*\*?Style|\*\*?Options|---|$))/i);
      if (match && match[1]) {
        enhanced = match[1].trim();
      } else {
        const simpleMatch = response.split(/Enhanced Prompt:?/i)[1];
        if (simpleMatch) enhanced = simpleMatch.trim();
      }

      if (enhanced) {
        setPrompt(enhanced);
      }
    } catch (err: any) {
      console.error("Enhancement failed", err);
      setError("Failed to enhance prompt. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleReset = () => {
    setPrompt('');
    setWidth(1024);
    setHeight(1024);
    setResultImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      // 1. Determine closest aspect ratio for the model config
      const ratio = getClosestAspectRatio(width, height);
      
      // 2. Append specific pixel dimensions to prompt to guide the model
      const finalPrompt = `${prompt}. High quality, detailed. Specific resolution: ${width}x${height} pixels.`;

      // 3. Generate using Flash model (usePro = false)
      const base64 = await generateImage(
        finalPrompt, 
        ratio, 
        ImageSize.K1, // Size param ignored by Flash model
        false // usePro
      );

      setResultImage(base64);
      addToHistory(
        'GENERATED', 
        base64, 
        prompt, 
        `Free Gen • ${width}x${height}`
      );

    } catch (err: any) {
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `lumina-free-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Styles
  const sidebarBg = isDarkMode ? 'bg-gray-900/60 border-white/5' : 'bg-white/60 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDarkMode ? 'bg-gray-800/50 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';
  const containerBg = isDarkMode ? 'bg-gray-800/30 border-white/5' : 'bg-gray-50 border-gray-200';

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Controls */}
      <div className={`w-full lg:w-96 p-6 border-r overflow-y-auto backdrop-blur-xl ${sidebarBg}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg border shadow-lg ${isDarkMode ? 'bg-yellow-900/20 border-yellow-500/20 shadow-yellow-900/10' : 'bg-yellow-50 border-yellow-200'}`}>
              <Zap size={24} className="text-yellow-500" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${textPrimary}`}>Free Gen</h2>
              <p className="text-[10px] text-yellow-500 font-medium uppercase tracking-wider">Gemini Flash • Fast & Unlimited</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            title="Reset to defaults"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={`text-sm font-medium ${textSecondary}`}>Prompt</label>
              <button 
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !prompt}
                className={`text-xs flex items-center gap-1 transition-colors ${isEnhancing ? 'text-yellow-500' : 'text-yellow-500 hover:text-yellow-600'} disabled:opacity-50`}
              >
                {isEnhancing ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} 
                Enhance
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`w-full h-32 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none resize-none backdrop-blur-sm transition-all border ${inputBg}`}
              placeholder="Describe your image..."
            />
          </div>

          <div className={`p-4 rounded-xl border space-y-4 ${containerBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={16} className={`text-${themeColor}-500`} />
              <span className={`text-sm font-semibold ${textPrimary}`}>Custom Dimensions</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                 <label className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-1">
                    <Maximize size={10} className="rotate-90"/> Width (px)
                 </label>
                 <input 
                   type="number" 
                   value={width}
                   onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                   className={`w-full rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${inputBg}`}
                 />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-1">
                    <Maximize size={10}/> Height (px)
                 </label>
                 <input 
                   type="number" 
                   value={height}
                   onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                   className={`w-full rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${inputBg}`}
                 />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              * The system will map these dimensions to the closest supported aspect ratio and guide the model to compose for your specific size.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 shadow-orange-900/20 hover:scale-[1.02]`}
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Zap />}
            Generate Free Image
          </button>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl flex gap-3 text-red-400 text-xs items-start backdrop-blur-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {isGenerating ? (
          <div className="text-center space-y-4 z-10">
            <Loader2 className={`mx-auto animate-spin text-${themeColor}-500`} size={48} />
            <p className={`font-medium animate-pulse ${textSecondary}`}>Creating your custom image...</p>
          </div>
        ) : resultImage ? (
           <div className="relative max-w-full max-h-full group z-10 flex flex-col items-center">
             <div className={`p-2 rounded-2xl border shadow-2xl backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                <img
                  src={resultImage}
                  alt="Generated"
                  className="max-w-full max-h-[75vh] rounded-xl"
                />
             </div>
             
             <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
               <button
                  onClick={downloadImage}
                  className={`bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg flex items-center gap-2 backdrop-blur-md transition-colors`}
                >
                  <Download size={18} /> Download
                </button>
             </div>
             
             <div className="mt-3 text-xs text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                {width}x{height}px requested
             </div>
           </div>
        ) : (
          <div className="text-center text-gray-500 max-w-md z-10">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border border-dashed backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/30 border-white/10' : 'bg-white/50 border-gray-300'}`}>
              <FileImage className={`text-${themeColor}-500/50`} size={32} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Custom Size Generator</h3>
            <p className={textSecondary}>Specify exact dimensions for your image. Powered by the fast and free Gemini Flash model.</p>
          </div>
        )}
      </div>
    </div>
  );
};