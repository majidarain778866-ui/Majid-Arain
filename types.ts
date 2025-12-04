
export enum AppMode {
  ASSISTANT = 'ASSISTANT',
  GENERATOR = 'GENERATOR',
  FREE_GEN = 'FREE_GEN',
  EDITOR = 'EDITOR',
  LOGO = 'LOGO',
  HISTORY = 'HISTORY'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT_3_4 = '3:4',
  LANDSCAPE_4_3 = '4:3',
  PORTRAIT_9_16 = '9:16',
  LANDSCAPE_16_9 = '16:9',
}

export enum ImageSize {
  K1 = '1K',
  K2 = '2K',
  K4 = '4K'
}

export type ThemeColor = 'purple' | 'red' | 'blue' | 'green' | 'yellow' | 'gray';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  type: 'GENERATED' | 'EDITED' | 'LOGO';
  base64: string;
  prompt: string;
  timestamp: number;
  metadata?: string; // e.g., "Pro Model - 1:1"
}

export interface SavedPrompt {
  id: string;
  text: string;
  timestamp: number;
  tags?: string[];
}