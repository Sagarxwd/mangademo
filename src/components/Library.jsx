import { motion } from 'framer-motion';
import { User, BookMarked, History, LibraryIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MangaCard } from './MangaCard';
import { MANGA_LIST } from '../data/mangaData';

export function Library() {
  const [activeTab, setActiveTab] = useState('reading');
  const navigate = useNavigate();

  const readingList = MANGA_LIST.slice(0, 4);
  const bookmarkedList = MANGA_LIST.slice(2, 6);
  const historyList = MANGA_LIST.slice(1, 5);

  const currentList = activeTab === 'reading' ? readingList : activeTab === 'bookmarked' ? bookmarkedList : historyList;

  const tabConfig = {
    reading: { icon: BookMarked, label: 'Reading' },
    bookmarked: { icon: LibraryIcon, label: 'Bookmarked' },
    history: { icon: History, label: 'History' }
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#6366f1]/20 rounded-full">
              <User className="text-[#6366f1]" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white">My Library</h1>
          </div>
          <p className="text-[#71717a]">Manage your reading list, bookmarks, and history</p>
        </motion.div>

        <div className="flex gap-2 mb-8 bg-[#141414] p-1 rounded-lg border border-[#27272a] w-fit">
          {Object.entries(tabConfig).map(([tab, { icon: Icon, label }]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold capitalize transition flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/25'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#1f1f1f]'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {currentList.map((m, i) => (
            <div key={`${m.id}-lib-${i}`}>
              <MangaCard manga={m} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}