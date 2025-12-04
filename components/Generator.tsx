import React, { useState, useRef, useEffect } from 'react';
import { Download, Sparkles, AlertCircle, Loader2, Zap, PenTool, X, Palette, Type, Briefcase, Upload, Image as ImageIcon, Settings2, Ban, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { AspectRatio, ImageSize, ThemeColor } from '../types';
import { generateImage, sendChatMessage, fileToBase64, getClosestAspectRatio, extractDimensionsFromPrompt } from '../services/geminiService';
import { addToHistory } from '../services/storageService';

interface GeneratorProps {
  initialPrompt?: string;
  themeColor: ThemeColor;
  isDarkMode: boolean;
}

export const Generator: React.FC<GeneratorProps> = ({ initialPrompt = '', themeColor, isDarkMode }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [size, setSize] = useState<ImageSize>(ImageSize.K1);
  const [usePro, setUsePro] = useState(false); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // Custom Dimensions
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);

  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showLogoWizard, setShowLogoWizard] = useState(false);
  const [logoBrand, setLogoBrand] = useState('');
  const [logoColors, setLogoColors] = useState('');
  const [logoStyle, setLogoStyle] = useState('');

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
  }, [initialPrompt]);

  // Mock progress timer
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return prev;
          // Pro model takes longer, so increment slower
          const increment = usePro ? 0.5 : 2.5; 
          return Math.min(prev + increment, 98);
        });
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating, usePro]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToBase64(e.target.files[0]);
        setReferenceImage(base64);
      } catch (err) {
        console.error("File upload failed", err);
      }
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let finalAspectRatio = aspectRatio;
      let finalSize = size;
      let finalPrompt = prompt;

      // Handle Custom Dimensions Logic
      if (useCustomSize) {
        // 1. Calculate closest aspect ratio
        finalAspectRatio = getClosestAspectRatio(customWidth, customHeight);
        
        // 2. Auto-select quality tier for Pro model
        const maxDim = Math.max(customWidth, customHeight);
        if (maxDim > 2048) finalSize = ImageSize.K4;
        else if (maxDim > 1024) finalSize = ImageSize.K2;
        else finalSize = ImageSize.K1;

        // 3. Append to prompt
        finalPrompt += ` in specific resolution: ${customWidth}x${customHeight} pixels`;
      } else {
        // Try to parse dimensions from natural language prompt
        const extracted = extractDimensionsFromPrompt(prompt);
        if (extracted) {
           console.log("Extracted dimensions from prompt:", extracted);
           finalAspectRatio = getClosestAspectRatio(extracted.width, extracted.height);
           // Set explicit quality for Pro
           const maxDim = Math.max(extracted.width, extracted.height);
           if (maxDim > 2048) finalSize = ImageSize.K4;
           else if (maxDim > 1024) finalSize = ImageSize.K2;
        }
      }

      const base64 = await generateImage(
        finalPrompt, 
        finalAspectRatio, 
        finalSize, 
        usePro, 
        referenceImage,
        negativePrompt
      );
      setGeneratedImage(base64);
      
      addToHistory(
        'GENERATED', 
        base64, 
        prompt, 
        `${usePro ? 'Pro' : 'Flash'} • ${useCustomSize ? `${customWidth}x${customHeight}` : finalAspectRatio} • ${usePro ? finalSize : 'Std'}`
      );

    } catch (err: any) {
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

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

  const applyLogoPrompt = () => {
    const brandPart = logoBrand ? `for "${logoBrand}"` : "";
    const colorPart = logoColors ? `using ${logoColors} color palette` : "";
    const stylePart = logoStyle ? `in ${logoStyle} style` : "minimalist modern vector";
    
    const finalPrompt = `Professional vector logo design ${brandPart}, ${stylePart}, ${colorPart}. Clean lines, high contrast, white background, vector graphics.`;
    
    setPrompt(finalPrompt);
    setAspectRatio(AspectRatio.SQUARE);
    setShowLogoWizard(false);
    setLogoBrand('');
    setLogoColors('');
    setLogoStyle('');
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `lumina-gen-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Styles
  const sidebarClass = isDarkMode ? 'bg-gray-900/60 border-white/5' : 'bg-white/60 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const inputBg = isDarkMode ? 'bg-gray-800/50 border-white/10' : 'bg-white border-gray-200';
  const inputText = isDarkMode ? 'text-white' : 'text-gray-900';
  const buttonInactive = isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  const containerBg = isDarkMode ? 'bg-gray-800/50 border-white/10' : 'bg-gray-50 border-gray-200';

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Controls Panel */}
      <div className={`w-full lg:w-1/3 p-6 border-r overflow-y-auto backdrop-blur-xl ${sidebarClass}`}>
        <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>Create</h2>
        
        <div className="space-y-6">
          
          {/* Model Selector */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${textSecondary}`}>Model Tier</label>
            <div className={`flex p-1 rounded-xl border backdrop-blur-sm ${containerBg}`}>
              <button 
                onClick={() => setUsePro(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !usePro 
                    ? `bg-gray-600 text-white shadow ring-1 ring-gray-400` 
                    : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <Zap size={16} className={!usePro ? "text-yellow-400" : ""} />
                Flash (Free)
              </button>
              <button 
                onClick={() => setUsePro(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  usePro 
                    ? `bg-${themeColor}-600 text-white shadow ring-1 ring-${themeColor}-400` 
                    : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <Sparkles size={16} className={usePro ? "text-white" : ""} />
                Pro (High Res)
              </button>
            </div>
            {usePro ? (
               <p className={`text-xs text-${themeColor}-500 px-1`}>Pro model (Gemini 3) requires a paid API plan.</p>
            ) : (
               <p className="text-xs text-gray-500 px-1">Gemini 2.5 Flash is fast and free to use.</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className={`text-sm font-medium ${textSecondary}`}>Prompt</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !prompt}
                    className={`text-xs flex items-center gap-1 transition-colors ${isEnhancing ? 'text-yellow-500' : 'text-yellow-500 hover:text-yellow-600'} disabled:opacity-50`}
                  >
                    {isEnhancing ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} 
                    Enhance
                  </button>
                  <button 
                    onClick={() => setShowLogoWizard(!showLogoWizard)}
                    className={`text-xs flex items-center gap-1 transition-colors ${showLogoWizard ? `text-${themeColor}-500` : `text-${themeColor}-500 hover:text-${themeColor}-600`}`}
                  >
                    <PenTool size={12}/> Logo Helper
                  </button>
                </div>
            </div>

            {showLogoWizard && (
              <div className={`border border-${themeColor}-500/30 rounded-xl p-4 mb-2 space-y-3 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md ${isDarkMode ? 'bg-gray-800/80' : 'bg-white shadow-lg'}`}>
                <div className="flex justify-between items-center mb-1">
                   <h3 className={`text-sm font-semibold text-${themeColor}-500`}>Logo Creator</h3>
                   <button onClick={() => setShowLogoWizard(false)} className="text-gray-500 hover:text-gray-700"><X size={14}/></button>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 flex items-center gap-1"><Briefcase size={10}/> Brand Name</label>
                  <input 
                    type="text" 
                    value={logoBrand}
                    onChange={(e) => setLogoBrand(e.target.value)}
                    placeholder="e.g. Lumina AI"
                    className={`w-full rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${inputBg} ${inputText}`}
                  />
                </div>

                <div className="space-y-1">
                   <label className="text-xs text-gray-400 flex items-center gap-1"><Type size={10}/> Style</label>
                   <input 
                    type="text" 
                    value={logoStyle}
                    onChange={(e) => setLogoStyle(e.target.value)}
                    placeholder="e.g. Minimalist"
                    className={`w-full rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${inputBg} ${inputText}`}
                  />
                </div>

                <div className="space-y-1">
                   <label className="text-xs text-gray-400 flex items-center gap-1"><Palette size={10}/> Colors</label>
                   <input 
                    type="text" 
                    value={logoColors}
                    onChange={(e) => setLogoColors(e.target.value)}
                    placeholder="e.g. Purple and Gold"
                    className={`w-full rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${inputBg} ${inputText}`}
                  />
                </div>

                <button 
                  onClick={applyLogoPrompt}
                  className={`w-full bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white text-xs font-bold py-2 rounded-lg mt-2 transition-colors`}
                >
                  Create Logo Prompt
                </button>
              </div>
            )}

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`w-full h-32 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none resize-none backdrop-blur-sm transition-all border ${inputBg} ${inputText}`}
              placeholder="Describe your image (e.g., 'Cyberpunk city 1920x1080')..."
            />
            
            {/* Advanced / Negative Prompt */}
            <div className="pt-2">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className={`text-xs font-medium flex items-center gap-1 transition-colors ${textSecondary} hover:${textPrimary}`}
              >
                {showAdvanced ? <ChevronUp size={12}/> : <ChevronDown size={12}/>} 
                Advanced Settings (Negative Prompt)
              </button>
              
              {showAdvanced && (
                <div className={`mt-2 p-3 rounded-xl border space-y-2 animate-in slide-in-from-top-2 duration-200 backdrop-blur-sm ${containerBg}`}>
                   <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-red-400/80">
                     <Ban size={10}/> Negative Prompt
                   </label>
                   <textarea 
                     value={negativePrompt}
                     onChange={e => setNegativePrompt(e.target.value)}
                     placeholder="Elements to exclude (e.g. blurry, watermark, text, bad anatomy, deformed)..."
                     className={`w-full h-16 rounded-lg p-2 text-sm focus:outline-none bg-transparent resize-none placeholder-gray-500 ${inputText}`}
                   />
                </div>
              )}
            </div>

            <div className="mt-2">
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
               {!referenceImage ? (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center gap-2 text-xs transition-colors ${textSecondary} hover:${textPrimary}`}
                  >
                    <Upload size={14} /> Add Reference Image (Optional)
                  </button>
               ) : (
                 <div className={`flex items-center gap-3 p-2 rounded-lg border mt-2 backdrop-blur-sm ${containerBg}`}>
                    <img src={referenceImage} alt="Ref" className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                       <p className={`text-xs font-medium truncate ${textPrimary}`}>Reference Attached</p>
                    </div>
                    <button onClick={() => setReferenceImage(null)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-red-400">
                      <X size={14} />
                    </button>
                 </div>
               )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
               <label className={`text-sm font-medium ${textSecondary}`}>Dimensions</label>
               <button 
                 onClick={() => setUseCustomSize(!useCustomSize)}
                 className={`text-xs flex items-center gap-1 ${useCustomSize ? `text-${themeColor}-500` : 'text-gray-500 hover:text-gray-400'}`}
               >
                 <Settings2 size={12} /> {useCustomSize ? 'Custom On' : 'Custom Off'}
               </button>
            </div>

            {useCustomSize ? (
              <div className={`grid grid-cols-2 gap-3 p-3 rounded-lg border animate-in slide-in-from-top-2 duration-200 ${containerBg}`}>
                <div className="space-y-1">
                   <label className="text-[10px] text-gray-400 uppercase font-bold">Width (px)</label>
                   <input 
                     type="number" 
                     value={customWidth}
                     onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                     className={`w-full rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${isDarkMode ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-300 text-gray-900 border'}`}
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] text-gray-400 uppercase font-bold">Height (px)</label>
                   <input 
                     type="number" 
                     value={customHeight}
                     onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)}
                     className={`w-full rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-${themeColor}-500 outline-none ${isDarkMode ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-300 text-gray-900 border'}`}
                   />
                </div>
                <div className="col-span-2 text-[10px] text-gray-500">
                   * Will be mapped to closest supported ratio and quality.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {Object.values(AspectRatio).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 px-3 text-xs rounded-lg border backdrop-blur-sm transition-all ${
                      aspectRatio === ratio
                        ? `bg-${themeColor}-600/20 border-${themeColor}-500 text-${themeColor}-500`
                        : `${isDarkMode ? 'bg-gray-800/50 border-white/5 text-gray-400 hover:border-white/20' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            )}
          </div>

          {usePro && !useCustomSize && (
            <div className={`space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 pt-3 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-1">
                <label className={`text-sm font-medium ${textSecondary} flex items-center gap-1`}>
                  <Layers size={14} /> Resolution (Quality)
                </label>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-wider font-bold ${isDarkMode ? `bg-${themeColor}-900/30 border-${themeColor}-500/30 text-${themeColor}-400` : `bg-${themeColor}-50 border-${themeColor}-200 text-${themeColor}-600`}`}>
                  Pro Only
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: ImageSize.K1, label: '1K', sub: 'Standard' },
                  { val: ImageSize.K2, label: '2K', sub: 'High Res' },
                  { val: ImageSize.K4, label: '4K', sub: 'Ultra HD' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setSize(opt.val)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border backdrop-blur-sm transition-all ${
                      size === opt.val
                         ? `bg-${themeColor}-600/20 border-${themeColor}-500 text-${themeColor}-500 shadow-sm`
                         : `${isDarkMode ? 'bg-gray-800/50 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`
                    }`}
                  >
                    <span className="text-sm font-bold">{opt.label}</span>
                    <span className="text-[10px] opacity-60">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              usePro 
                ? `bg-gradient-to-r from-${themeColor}-600 to-${themeColor === 'purple' ? 'pink' : themeColor}-600 shadow-${themeColor}-900/40`
                : 'bg-gradient-to-r from-yellow-600 to-orange-600 shadow-orange-900/40'
            }`}
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : (usePro ? <Sparkles /> : <Zap />)}
            {usePro ? 'Generate High Quality' : 'Generate Fast (Free)'}
          </button>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl flex gap-3 text-red-400 text-sm items-start backdrop-blur-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Error</p>
                <p>{error}</p>
                {error.includes("Access Denied") && usePro && (
                   <button 
                     onClick={() => setUsePro(false)}
                     className="mt-2 text-xs bg-red-900/50 hover:bg-red-900 px-2 py-1 rounded border border-red-700 transition-colors text-white"
                   >
                     Switch to Flash (Free)
                   </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center space-y-6 z-10 max-w-sm w-full p-8 animate-in fade-in duration-500">
            
            {/* Central Animation */}
            <div className="relative w-32 h-32">
              {/* Outer Ring */}
              <div className={`absolute inset-0 rounded-full border-4 opacity-20 ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}></div>
              
              {/* Spinning Ring 1 */}
              <div 
                className={`absolute inset-0 rounded-full border-4 border-l-transparent border-r-transparent animate-spin ${usePro ? `border-t-${themeColor}-500 border-b-${themeColor}-500` : 'border-t-yellow-500 border-b-orange-500'}`}
                style={{ animationDuration: '3s' }}
              ></div>
              
              {/* Spinning Ring 2 (Counter) */}
              <div 
                className={`absolute inset-4 rounded-full border-4 border-t-transparent border-b-transparent animate-spin ${usePro ? `border-l-${themeColor}-300 border-r-${themeColor}-300` : 'border-l-yellow-300 border-r-orange-300'}`}
                style={{ animationDirection: 'reverse', animationDuration: '2s' }}
              ></div>
              
              {/* Center Percentage */}
              <div className={`absolute inset-0 flex items-center justify-center font-bold text-2xl font-mono ${textPrimary}`}>
                 {Math.round(progress)}%
              </div>
            </div>

            {/* Progress Text & Bar */}
            <div className="w-full space-y-3 text-center">
               <h3 className={`text-lg font-medium animate-pulse ${textPrimary}`}>
                 {usePro ? 'Crafting High-Fidelity Image...' : 'Generating Preview...'}
               </h3>
               
               <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,0,0,0.3)] ${usePro ? `bg-${themeColor}-500` : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
               </div>
               
               <p className={`text-xs ${textSecondary}`}>
                 {progress < 30 ? 'Analyzing prompt complexity...' : progress < 60 ? 'Synthesizing visual elements...' : 'Refining details and textures...'}
               </p>
            </div>
          </div>
        ) : generatedImage ? (
          <div className="relative max-w-full max-h-full group z-10">
            <img
              src={generatedImage}
              alt="Generated"
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl border border-white/10"
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={downloadImage}
                className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-black/70 transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
              {usePro ? `Gemini 3 Pro (${size})` : 'Gemini 2.5 Flash'}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 max-w-md z-10">
            <div className={`w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-dashed backdrop-blur-sm ${
                isDarkMode ? 'bg-gray-800/30 border-white/10' : 'bg-white/50 border-gray-300'
            }`}>
              <Sparkles className={`text-${themeColor}-500/50`} size={32} />
            </div>
            <h3 className={`text-xl font-medium mb-2 ${textPrimary}`}>Ready to Create</h3>
            <p className={textSecondary}>Select your model tier and configure your settings to start generating.</p>
          </div>
        )}
      </div>
    </div>
  );
};