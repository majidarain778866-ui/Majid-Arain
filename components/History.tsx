import React, { useEffect, useState } from 'react';
import { Trash2, Download, Clock, Image as ImageIcon, Wand2, LayoutGrid } from 'lucide-react';
import { HistoryItem, ThemeColor } from '../types';
import { getHistory, deleteHistoryItem, clearAllHistory } from '../services/storageService';

interface HistoryProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
}

export const History: React.FC<HistoryProps> = ({ themeColor, isDarkMode }) => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all history? This cannot be undone.")) {
      clearAllHistory();
      setItems([]);
    }
  };

  const handleDownload = (item: HistoryItem) => {
    const link = document.createElement('a');
    link.href = item.base64;
    link.download = `lumina-${item.type.toLowerCase()}-${item.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'LOGO': return <LayoutGrid size={14} className={`text-${themeColor}-500`} />;
      case 'EDITED': return <Wand2 size={14} className="text-blue-500" />;
      default: return <ImageIcon size={14} className="text-yellow-500" />;
    }
  };

  const getTypeLabelColor = (type: string) => {
    if (isDarkMode) {
        switch (type) {
        case 'LOGO': return `bg-${themeColor}-900/60 border-${themeColor}-500/30 text-${themeColor}-200`;
        case 'EDITED': return 'bg-blue-900/60 border-blue-500/30 text-blue-200';
        default: return 'bg-yellow-900/60 border-yellow-500/30 text-yellow-200';
        }
    } else {
        switch (type) {
        case 'LOGO': return `bg-${themeColor}-50 border-${themeColor}-200 text-${themeColor}-700`;
        case 'EDITED': return 'bg-blue-50 border-blue-200 text-blue-700';
        default: return 'bg-yellow-50 border-yellow-200 text-yellow-700';
        }
    }
  };

  const headerBg = isDarkMode ? 'bg-gray-900/40 border-white/5' : 'bg-white/80 border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-gray-900/60 border-white/5' : 'bg-white border-gray-200 hover:border-gray-300';
  const iconBg = isDarkMode ? `bg-${themeColor}-600/20 border-${themeColor}-500/30` : `bg-${themeColor}-100 border-${themeColor}-200`;

  return (
    <div className="h-full flex flex-col p-4 lg:p-8 overflow-y-auto relative">
      {/* Background decoration */}
      <div className={`fixed top-0 right-0 w-[500px] h-[500px] bg-${themeColor}-${isDarkMode ? '900' : '200'}/10 blur-[120px] rounded-full pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto w-full">
        <div className={`flex justify-between items-center mb-8 p-6 rounded-2xl backdrop-blur-md border shadow-xl ${headerBg}`}>
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl border ${iconBg}`}>
                <Clock className={`text-${themeColor}-500`} size={24} />
             </div>
             <div>
                <h2 className={`text-2xl font-bold ${textPrimary}`}>Creation History</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Your recent generations are stored here locally.</p>
             </div>
          </div>
          
          {items.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-sm border border-transparent hover:border-red-500/30 font-medium"
            >
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-32 border border-dashed rounded-3xl backdrop-blur-sm ${isDarkMode ? 'border-gray-800 bg-gray-900/20' : 'border-gray-300 bg-white/50'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
               <Clock size={40} className="opacity-40 text-gray-500" />
            </div>
            <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No history found</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'opacity-60 text-gray-500' : 'text-gray-500'}`}>Generate images, logos, or edits to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`rounded-2xl overflow-hidden border group hover:border-${themeColor}-500/50 hover:shadow-lg hover:shadow-${themeColor}-900/20 transition-all duration-300 backdrop-blur-md flex flex-col ${cardBg}`}
              >
                <div className="relative aspect-square bg-gray-100 dark:bg-black/40 p-2">
                  <img src={item.base64} alt="History Item" className="w-full h-full object-contain rounded-lg" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                     <button 
                       onClick={() => handleDownload(item)}
                       className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-transform hover:scale-110 shadow-lg"
                       title="Download"
                     >
                       <Download size={20} />
                     </button>
                     <button 
                       onClick={() => handleDelete(item.id)}
                       className="p-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-full hover:bg-red-500 hover:text-white transition-transform hover:scale-110 backdrop-blur-md shadow-lg"
                       title="Delete"
                     >
                       <Trash2 size={20} />
                     </button>
                  </div>
                  
                  {/* Type Badge */}
                  <div className={`absolute top-4 left-4 ${getTypeLabelColor(item.type)} px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg flex items-center gap-1.5`}>
                     {getTypeIcon(item.type)}
                     {item.type}
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                   <p className={`text-sm line-clamp-2 mb-3 h-10 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} title={item.prompt}>
                     {item.prompt}
                   </p>
                   <div className={`mt-auto flex items-center justify-between text-[11px] pt-3 border-t ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>
                      <span className="flex items-center gap-1">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-gray-200 border'} ${item.metadata?.includes('Pro') ? `text-${themeColor}-500` : 'text-gray-400'}`}>
                        {item.metadata || 'Standard'}
                      </span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};