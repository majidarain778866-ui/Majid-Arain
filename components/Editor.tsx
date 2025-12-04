import React, { useState, useRef } from 'react';
import { Upload, Wand2, Download, X, Loader2, Image as ImageIcon, Zap, Eraser, Sparkles, Settings2 } from 'lucide-react';
import { editImage, fileToBase64, sendChatMessage, getClosestAspectRatio, extractDimensionsFromPrompt } from '../services/geminiService';
import { addToHistory } from '../services/storageService';
import { ThemeColor } from '../types';

interface EditorProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
}

export const Editor: React.FC<EditorProps> = ({ themeColor, isDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom Size for Editing (Output Ratio)
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToBase64(e.target.files[0]);
        setSelectedImage(base64);
        setResultImage(null); 
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to process image file.");
      }
    }
  };

  const handleEdit = async (promptOverride?: string) => {
    const promptToUse = promptOverride || prompt;
    if (!selectedImage || !promptToUse.trim()) return;

    if (promptOverride) {
      setPrompt(promptOverride);
    }

    setIsProcessing(true);
    setError(null);
    try {
      let finalPrompt = promptToUse;
      let aspectRatio = undefined;

      if (useCustomSize) {
         aspectRatio = getClosestAspectRatio(customWidth, customHeight);
         finalPrompt += ` Output Resolution: ${customWidth}x${customHeight}px.`;
      } else {
         // Auto-detect dimensions from prompt
         const extracted = extractDimensionsFromPrompt(promptToUse);
         if (extracted) {
           aspectRatio = getClosestAspectRatio(extracted.width, extracted.height);
         }
      }

      const edited = await editImage(selectedImage, finalPrompt, aspectRatio);
      setResultImage(edited);
      
      addToHistory(
        'EDITED', 
        edited, 
        promptToUse, 
        'Gemini Flash'
      );
      
    } catch (err: any) {
      setError(err.message || "Failed to edit image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;

    setIsEnhancing(true);
    try {
      const response = await sendChatMessage([], `Refine this image editing instruction: "${prompt}"`, true);
      
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
    } catch (e) {
      console.error("Enhancement failed", e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const clearAll = () => {
    setSelectedImage(null);
    setResultImage(null);
    setPrompt('');
    setError(null);
  };

  const downloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `lumina-edit-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRemoveWatermark = () => {
    const watermarkPrompt = "Remove all watermarks, text overlays, and transparency patterns from this image. Reconstruct the obscured areas using context from the surrounding pixels to make it look like the original raw image.";
    handleEdit(watermarkPrompt);
  };

  // Styles
  const headerBg = isDarkMode ? 'bg-gray-900/40 border-white/5' : 'bg-white/80 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const uploadAreaBg = isDarkMode ? 'border-gray-800 hover:bg-gray-900/30' : 'border-gray-300 hover:bg-gray-50';
  const inputBg = isDarkMode ? 'bg-gray-900/60 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';
  const previewBg = isDarkMode ? 'bg-gray-900/50 border-white/10' : 'bg-gray-100/50 border-gray-200';

  return (
    <div className="h-full flex flex-col p-4 lg:p-8 overflow-y-auto relative z-0">
      {/* Ambient Theme Background Blobs */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${themeColor}-${isDarkMode ? '900' : '200'}/10 blur-[120px] rounded-full pointer-events-none -z-10`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-${themeColor}-${isDarkMode ? '900' : '200'}/10 blur-[120px] rounded-full pointer-events-none -z-10`} />

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <header className={`mb-8 flex justify-between items-center p-4 rounded-2xl backdrop-blur-md border shadow-lg ${headerBg}`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <h2 className={`text-2xl font-bold ${textPrimary}`}>Magic Editor</h2>
               <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-yellow-500/20">
                 <Zap size={10} />
                 <span>Free (Gemini Flash)</span>
               </div>
            </div>
            <p className={textSecondary}>Upload an image and describe how you want to change it.</p>
          </div>
          {selectedImage && (
            <button
              onClick={clearAll}
              className={`flex items-center gap-2 text-sm ${textSecondary} hover:${textPrimary}`}
            >
              <X size={16} /> Start Over
            </button>
          )}
        </header>

        {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 text-sm backdrop-blur-sm shadow-lg">
              <p className="font-bold">Error: {error}</p>
            </div>
        )}

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-${themeColor}-500 transition-all group min-h-[400px] backdrop-blur-sm ${uploadAreaBg}`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileSelect} 
            />
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDarkMode ? `bg-gray-800/50 group-hover:bg-${themeColor}-900/30` : `bg-gray-100 group-hover:bg-${themeColor}-50`}`}>
              <Upload className={`text-gray-500 group-hover:text-${themeColor}-500`} size={32} />
            </div>
            <h3 className={`text-xl font-semibold ${textPrimary}`}>Upload an Image</h3>
            <p className={`${textSecondary} mt-2`}>JPG, PNG up to 5MB</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Input Side */}
            <div className="flex-1 space-y-4">
              <div className={`rounded-xl overflow-hidden border relative group h-96 flex items-center justify-center backdrop-blur-md shadow-inner ${previewBg}`}>
                <img 
                  src={selectedImage} 
                  alt="Original" 
                  className="max-h-full max-w-full object-contain" 
                />
                <div className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-full text-xs text-white">
                  Original
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Custom Dimensions */}
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => setUseCustomSize(!useCustomSize)}
                     className={`flex items-center gap-2 text-xs font-medium ${useCustomSize ? `text-${themeColor}-500` : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <Settings2 size={12} /> Output Size
                   </button>
                   {useCustomSize && (
                      <div className="flex gap-2 text-xs">
                        <input type="number" value={customWidth} onChange={(e) => setCustomWidth(parseInt(e.target.value))} className={`w-16 border rounded px-1 ${inputBg}`} placeholder="W" />
                        <span className="text-gray-500">x</span>
                        <input type="number" value={customHeight} onChange={(e) => setCustomHeight(parseInt(e.target.value))} className={`w-16 border rounded px-1 ${inputBg}`} placeholder="H" />
                      </div>
                   )}
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="E.g., 'Make it sunset', 'Add a cat'"
                      className={`w-full border rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-${themeColor}-500 focus:outline-none backdrop-blur-sm ${inputBg}`}
                      onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                    />
                    <button
                      onClick={handleEnhancePrompt}
                      disabled={isEnhancing || !prompt}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-${themeColor}-500 hover:text-${themeColor}-600 hover:bg-${themeColor}-500/10 rounded-lg transition-colors disabled:opacity-50`}
                      title="Enhance Prompt with AI"
                    >
                      {isEnhancing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleEdit()}
                    disabled={isProcessing || !prompt}
                    className={`bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-${themeColor}-900/30`}
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    Edit
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <span className={`text-xs font-medium whitespace-nowrap ${textSecondary}`}>Magic Tools:</span>
                  <button 
                    onClick={handleRemoveWatermark}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-all backdrop-blur-sm shadow-sm whitespace-nowrap ${
                        isDarkMode 
                        ? `bg-${themeColor}-900/20 hover:bg-${themeColor}-900/40 text-${themeColor}-200 border-${themeColor}-500/20` 
                        : `bg-${themeColor}-50 hover:bg-${themeColor}-100 text-${themeColor}-700 border-${themeColor}-200`
                    }`}
                  >
                    <Eraser size={14} /> Remove Watermark
                  </button>
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="flex-1">
              <div className={`rounded-xl overflow-hidden border relative h-96 flex items-center justify-center backdrop-blur-md shadow-inner ${previewBg}`}>
                {resultImage ? (
                  <>
                     <img 
                      src={resultImage} 
                      alt="Edited" 
                      className="max-h-full max-w-full object-contain" 
                    />
                     <div className={`absolute top-2 left-2 bg-${themeColor}-600/80 px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm shadow-lg`}>
                        Edited
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button 
                          onClick={downloadResult}
                          className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                        >
                          <Download size={20} />
                        </button>
                      </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-3">
                         <Loader2 className={`animate-spin text-${themeColor}-500`} size={32} />
                         <p className="animate-pulse">Gemini is applying your edits...</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
                        <p>Your edited image will appear here</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};