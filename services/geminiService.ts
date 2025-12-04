import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AspectRatio, ImageSize } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Models
const MODEL_FAST_TEXT = 'gemini-flash-lite-latest';
const MODEL_THINKING = 'gemini-3-pro-preview';
const MODEL_IMAGE_GEN_PRO = 'gemini-3-pro-image-preview';
const MODEL_IMAGE_GEN_FLASH = 'gemini-2.5-flash-image';
const MODEL_IMAGE_EDIT = 'gemini-2.5-flash-image';

// Helper for centralized error handling
const handleGeminiError = (error: any, modelType: 'Pro' | 'Flash' | 'Text') => {
  console.error(`Gemini API Error (${modelType}):`, error);
  
  const errorMessage = error.message || error.toString();
  const isPermissionError = error.status === 403 || errorMessage.includes("403") || errorMessage.includes("PERMISSION_DENIED");
  const isQuotaError = error.status === 429 || errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED");

  if (isPermissionError) {
    if (modelType === 'Pro') {
      throw new Error("Access Denied for Pro Model (403). This model likely requires a paid tier. Please switch to 'Flash (Free)' in the settings or check your API key billing.");
    } else {
      throw new Error("Access Denied (403). Please check if your API key is valid and has the Generative AI API enabled.");
    }
  }

  if (isQuotaError) {
    throw new Error("Rate limit exceeded (429). You are sending requests too quickly. Please wait a moment.");
  }

  throw new Error(errorMessage);
};

export const getClosestAspectRatio = (width: number, height: number): AspectRatio => {
  const ratio = width / height;
  const ratios = [
    { r: 1, val: AspectRatio.SQUARE },
    { r: 3/4, val: AspectRatio.PORTRAIT_3_4 },
    { r: 4/3, val: AspectRatio.LANDSCAPE_4_3 },
    { r: 9/16, val: AspectRatio.PORTRAIT_9_16 },
    { r: 16/9, val: AspectRatio.LANDSCAPE_16_9 },
  ];
  
  return ratios.reduce((prev, curr) => 
    Math.abs(curr.r - ratio) < Math.abs(prev.r - ratio) ? curr : prev
  ).val;
};

export const extractDimensionsFromPrompt = (prompt: string): { width: number, height: number } | null => {
  // Matches: 1920x1080, 1920 x 1080, 1000px by 1000px
  const match = prompt.match(/(\d{3,5})\s*(?:x|by)\s*(\d{3,5})/i);
  if (match) {
    return { width: parseInt(match[1]), height: parseInt(match[2]) };
  }
  return null;
};

/**
 * Enhanced Prompt / Chat Assistant
 * Uses Flash Lite for speed or 3 Pro for complex thinking.
 */
export const sendChatMessage = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  useThinking: boolean
): Promise<string> => {
  try {
    const modelName = useThinking ? MODEL_THINKING : MODEL_FAST_TEXT;
    
    // Configure Thinking budget if enabled
    const config: any = {
      systemInstruction: `You are Lumina, an expert AI Image Creation Assistant. 
      Your goal is to help users create amazing images.

      --- LOGO GENERATION PROTOCOL ---
      If the user asks to generate a LOGO, you must ensure you have the following details. If they are missing, ASK the user for them:
      1. Brand Name (What text should be on the logo?)
      2. Colors (What is the color palette?)
      3. Style (Minimalist, 3D, Vintage, Tech, Luxury, etc.?)
      
      Once you have these details, generate an "Enhanced Prompt" strictly optimized for logo design (e.g., "Professional vector logo design for [Brand], [Style], [Colors], white background, high contrast, clean lines").

      --- GENERAL RULES ---
      1. Enhance prompts: Make them detailed, descriptive, and artistic.
      2. Suggest styles: Anime, Cinematic, 3D, Minimalist, etc.
      3. If the user asks to edit an image, guide them to the Editor tab.
      4. Output format: 
         Please use the following labels strictly:
         **Enhanced Prompt:**
         [The detailed prompt here]
         
         **Style Suggestions:**
         * [Style Option 1]
         * [Style Option 2]
         * [Style Option 3]
      
      Keep responses helpful and creative.`,
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingBudget: 32768 };
      // Do not set maxOutputTokens when using thinking budget as per guidelines
    }

    const chat = ai.chats.create({
      model: modelName,
      config: config,
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I couldn't generate a text response.";
  } catch (error) {
    handleGeminiError(error, useThinking ? 'Pro' : 'Text');
    return ""; // unreachable
  }
};

/**
 * Generate Image
 * Supports both Pro (High Quality) and Flash (Fast/Free) models.
 * Supports optional reference image for image-to-image/style transfer.
 * Supports negative prompts.
 */
export const generateImage = async (
  prompt: string,
  aspectRatio: AspectRatio,
  size: ImageSize,
  usePro: boolean = false,
  referenceImage?: string | null,
  negativePrompt?: string
): Promise<string> => {
  try {
    const modelName = usePro ? MODEL_IMAGE_GEN_PRO : MODEL_IMAGE_GEN_FLASH;
    
    const config: any = {
      imageConfig: {
        aspectRatio: aspectRatio,
        // imageSize is only supported by the Pro model
        ...(usePro ? { imageSize: size } : {}) 
      }
    };

    const parts: any[] = [];
    
    // If a reference image is provided, add it as the first part
    if (referenceImage) {
      const cleanBase64 = referenceImage.split(',')[1] || referenceImage;
      parts.push({
        inlineData: {
          mimeType: 'image/png', // Default to PNG/JPEG handling
          data: cleanBase64
        }
      });
    }

    // Add text prompt
    let finalPrompt = prompt;
    if (negativePrompt && negativePrompt.trim()) {
      finalPrompt += `\n\nExcluding: ${negativePrompt.trim()}`;
    }
    parts.push({ text: finalPrompt });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: parts
      },
      config: config
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data received from Gemini.");
  } catch (error: any) {
    handleGeminiError(error, usePro ? 'Pro' : 'Flash');
    return ""; // unreachable
  }
};

/**
 * Edit Image
 * Uses Gemini 2.5 Flash Image
 */
export const editImage = async (
  base64Image: string,
  prompt: string,
  aspectRatio?: AspectRatio
): Promise<string> => {
  try {
    // Strip prefix if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;
    
    // Explicit config for aspect ratio if provided, otherwise default (which is usually square or native)
    const config: any = {};
    if (aspectRatio) {
        config.imageConfig = { aspectRatio };
    }

    const response = await ai.models.generateContent({
      model: MODEL_IMAGE_EDIT,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for simplicity/compatibility, or detect from source
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      },
      config: config
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No edited image returned. The model might have refused the edit or output text instead.");
  } catch (error: any) {
    handleGeminiError(error, 'Flash');
    return "";
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};