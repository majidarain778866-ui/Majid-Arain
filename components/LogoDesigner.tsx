import React, { useState, useRef } from 'react';
import { Download, Loader2, Sparkles, LayoutGrid, Type, Palette, Briefcase, Layers, Upload, X, Settings2 } from 'lucide-react';
import { generateImage, fileToBase64, getClosestAspectRatio, extractDimensionsFromPrompt } from '../services/geminiService';
import { addToHistory } from '../services/storageService';
import { AspectRatio, ImageSize, ThemeColor } from '../types';

interface LogoDesignerProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
}

export const LogoDesigner: React.FC<LogoDesignerProps> = ({ themeColor, isDarkMode }) => {
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [industry, setIndustry] = useState('');
  const [style, setStyle] = useState('Minimalist');
  const [colors, setColors] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  
  // Custom Size
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);

  const [usePro, setUsePro] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoStyles = [
    'Minimalist', 'Modern', 'Vintage', '3D Gradient', 
    'Abstract', 'Mascot', 'Emblem', 'Hand Drawn', 
    'Tech/Futuristic', 'Luxury'
  ];

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
    if (!brandName.trim()) {
      setError("Brand Name is required");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let prompt = `Professional vector logo design for "${brandName}". 
      Industry: ${industry || 'General'}.
      Style: ${style}.
      Color Palette: ${colors || 'Brand appropriate'}.
      ${tagline ? `Include the tagline text: "${tagline}".` : ''}
      ${additionalDetails ? `Additional requirements: ${additionalDetails}.` : ''}
      
      Design requirements: White background, high quality, professional vector graphics, centered composition, clean lines. No realistic photo elements.`;

      let finalRatio = AspectRatio.SQUARE;
      let finalSize = ImageSize.K1;

      if (useCustomSize) {
        finalRatio = getClosestAspectRatio(customWidth, customHeight);
        prompt += ` Target Resolution: ${customWidth}x${customHeight}px.`;
        
        const maxDim = Math.max(customWidth, customHeight);
        if (maxDim > 2048) finalSize = ImageSize.K4;
        else if (maxDim > 1024) finalSize = ImageSize.K2;
      } else {
        // Try to parse dimensions from details
        const extracted = extractDimensionsFromPrompt(additionalDetails);
        if (extracted) {
           finalRatio = getClosestAspectRatio(extracted.width, extracted.height);
           const maxDim = Math.max(extracted.width, extracted.height);
           if (maxDim > 2048) finalSize = ImageSize.K4;
           else if (maxDim > 1024) finalSize = ImageSize.K2;
        }
      }

      const base64 = await generateImage(prompt, finalRatio, finalSize, usePro, referenceImage);
      setGeneratedImage(base64);

      addToHistory(
        'LOGO', 
        base64, 
        `${brandName} Logo`, 
        `${style} • ${useCustomSize ? `${customWidth}x${customHeight}` : 'Square'}`
      );
      
    } catch (err: any) {
      setError(err.message || "Failed to generate logo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `lumina-logo-${brandName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Styles
  const sidebarBg = isDarkMode ? 'bg-gray-900/60 border-white/5' : 'bg-white/60 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDarkMode ? 'bg-gray-800/40 border-white/10 text-white' : 'bg-white/80 border-gray-200 text-gray-900';
  const styleButtonActive = isDarkMode 
    ? `bg-${themeColor}-600/20 border-${themeColor}-500 text-${themeColor}-200 shadow-lg shadow-${themeColor}-900/20` 
    : `bg-${themeColor}-50 border-${themeColor}-500 text-${themeColor}-700 shadow-sm`;
  const styleButtonInactive = isDarkMode 
    ? 'bg-gray-800/30 border-white/5 text-gray-400 hover:border-white/20 hover:bg-gray-800/50' 
    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50';

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar Controls */}
      <div className={`w-full lg:w-96 p-6 border-r overflow-y-auto backdrop-blur-xl ${sidebarBg}`}>
        <div className="flex items-center gap-2 mb-6">
          <div className={`p-2 rounded-lg border shadow-lg ${isDarkMode ? `bg-${themeColor}-900/50 border-${themeColor}-500/20 shadow-${themeColor}-900/20` : `bg-${themeColor}-50 border-${themeColor}-200`}`}>
            <LayoutGrid size={24} className={`text-${themeColor}-500`} />
          </div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>Logo Studio</h2>
        </div>

        <div className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${textSecondary}`}>
                <Type size={12} /> Brand Identity
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Brand Name (Required)"
                  className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm transition-all ${inputBg}`}
                />
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Tagline / Slogan (Optional)"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm transition-all ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${textSecondary}`}>
                <Briefcase size={12} /> Context
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Industry (e.g., Coffee Shop, Tech Startup)"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm transition-all ${inputBg}`}
              />
            </div>
          </div>

          {/* Design Specs */}
          <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>
             <div>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${textSecondary}`}>
                <Layers size={12} /> Visual Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {logoStyles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 px-3 text-xs rounded-lg border text-left transition-all backdrop-blur-sm ${
                      style === s ? styleButtonActive : styleButtonInactive
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
             </div>

             <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${textSecondary}`}>
                  <Palette size={12} /> Colors & Details
                </label>
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="Colors (e.g. Gold & Black)"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm mb-3 ${inputBg}`}
                />
                <textarea
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Any specific symbols or ideas?"
                  className={`w-full h-20 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm resize-none ${inputBg}`}
                />
             </div>
             
             {/* Custom Dimensions */}
             <div className="space-y-2">
               <button 
                 onClick={() => setUseCustomSize(!useCustomSize)}
                 className={`flex items-center gap-2 text-xs font-medium ${useCustomSize ? `text-${themeColor}-500` : `text-gray-400 hover:text-gray-500`}`}
               >
                 <Settings2 size={12} /> {useCustomSize ? 'Custom Size Enabled' : 'Use Custom Size'}
               </button>
               
               {useCustomSize && (
                 <div className={`grid grid-cols-2 gap-2 p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800/40 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">Width</span>
                      <input type="number" value={customWidth} onChange={(e) => setCustomWidth(parseInt(e.target.value))} className={`w-full px-2 py-1 text-xs rounded border ${isDarkMode ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-300'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">Height</span>
                      <input type="number" value={customHeight} onChange={(e) => setCustomHeight(parseInt(e.target.value))} className={`w-full px-2 py-1 text-xs rounded border ${isDarkMode ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-300'}`} />
                    </div>
                 </div>
               )}
             </div>
          </div>

          {/* Reference Image */}
          <div className={`pt-2 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>
             <label className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1 ${textSecondary}`}>
                <Upload size={12} /> Reference (Optional)
             </label>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
             {!referenceImage ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full py-3 border border-dashed rounded-xl text-xs transition-colors ${isDarkMode ? 'border-gray-700 hover:border-gray-500 text-gray-500 hover:text-gray-300 bg-gray-800/20' : 'border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-700 bg-gray-50'}`}
                >
                  Click to upload reference image
                </button>
             ) : (
               <div className={`flex items-center gap-3 p-2 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <img src={referenceImage} alt="Ref" className="w-12 h-12 rounded-lg object-cover bg-black" />
                  <div className="flex-1 min-w-0">
                     <p className={`text-xs font-medium truncate ${textPrimary}`}>Reference Image</p>
                     <p className="text-[10px] text-gray-500">Attached</p>
                  </div>
                  <button onClick={() => setReferenceImage(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
               </div>
             )}
          </div>

          <div className="pt-4">
             {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded-xl text-red-400 text-xs backdrop-blur-sm">
                  {error}
                </div>
             )}
             
             <div className="flex gap-3 mb-3">
                <label className={`flex items-center gap-2 text-xs cursor-pointer transition-colors ${textSecondary} hover:${textPrimary}`}>
                   <input type="checkbox" checked={usePro} onChange={(e) => setUsePro(e.target.checked)} className="rounded bg-gray-800 border-gray-700" />
                   Use Pro Model (High Quality)
                </label>
             </div>

             <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-${themeColor}-600 to-${themeColor === 'purple' ? 'pink' : themeColor}-500 hover:scale-[1.02] shadow-${themeColor}-900/30`}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Generate Logo
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background blobs for glassmorphism context */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-${themeColor}-600/20 rounded-full blur-[100px] pointer-events-none`}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {isGenerating ? (
          <div className="text-center space-y-4 z-10">
            <div className="relative w-24 h-24 mx-auto">
               <div className={`absolute inset-0 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}></div>
               <div className={`absolute inset-0 rounded-full border-4 border-t-${themeColor}-500 animate-spin`}></div>
               <Sparkles className={`absolute inset-0 m-auto text-${themeColor}-500 animate-pulse`} size={24} />
            </div>
            <p className={`font-medium animate-pulse ${textSecondary}`}>Designing your brand...</p>
          </div>
        ) : generatedImage ? (
          <div className="relative max-w-full max-h-full group z-10">
            <div className={`backdrop-blur-sm p-2 rounded-2xl border shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/40'}`}>
              <img
                src={generatedImage}
                alt="Logo"
                className="max-w-md max-h-[80vh] rounded-xl bg-transparent" 
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-8 transition-all duration-300 translate-y-full">
              <button
                onClick={downloadImage}
                className={`bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-${themeColor}-900/50 flex items-center gap-2 backdrop-blur-md`}
              >
                <Download size={18} /> Download
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 max-w-md z-10">
            <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center border border-dashed backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/30 border-white/10' : 'bg-white/50 border-gray-300'}`}>
              <LayoutGrid className={`text-${themeColor}-500/50`} size={40} />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Logo Studio</h3>
            <p className={textSecondary}>Enter your brand details on the left to generate professional, vector-style logos powered by AI.</p>
          </div>
        )}
      </div>
    </div>
  );
};