
import { HistoryItem, SavedPrompt } from '../types';

const STORAGE_KEY = 'lumina_history_v1';
const SAVED_PROMPTS_KEY = 'lumina_saved_prompts_v1';
const MAX_ITEMS = 30; // Limit items to prevent localStorage quota exceeded errors

// --- HISTORY ---

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const addToHistory = (
  type: HistoryItem['type'],
  base64: string,
  prompt: string,
  metadata: string = ''
) => {
  try {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      base64,
      prompt,
      timestamp: Date.now(),
      metadata
    };

    const currentHistory = getHistory();
    // Prepend new item and slice to max limit
    const updatedHistory = [newItem, ...currentHistory].slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error("Failed to save to history. Storage might be full.", e);
    // Fallback: Try clearing oldest half if full
    try {
        const current = getHistory();
        if (current.length > 5) {
            const half = current.slice(0, Math.floor(current.length / 2));
             localStorage.setItem(STORAGE_KEY, JSON.stringify(half));
             // Retry adding
             const retryHistory = [
                 {
                    id: Date.now().toString(),
                    type,
                    base64,
                    prompt,
                    timestamp: Date.now(),
                    metadata
                 },
                 ...half
             ];
             localStorage.setItem(STORAGE_KEY, JSON.stringify(retryHistory));
        }
    } catch (retryError) {
        console.error("Critical storage failure", retryError);
    }
  }
};

export const deleteHistoryItem = (id: string) => {
  try {
    const history = getHistory().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Failed to delete item", e);
  }
};

export const clearAllHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// --- SAVED PROMPTS ---

export const getSavedPrompts = (): SavedPrompt[] => {
  try {
    const stored = localStorage.getItem(SAVED_PROMPTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load saved prompts", e);
    return [];
  }
};

export const savePrompt = (text: string) => {
  try {
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now()
    };
    const current = getSavedPrompts();
    // Add to top
    const updated = [newPrompt, ...current];
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save prompt", e);
  }
};

export const deleteSavedPrompt = (id: string) => {
  try {
    const current = getSavedPrompts().filter(p => p.id !== id);
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error("Failed to delete prompt", e);
  }
};