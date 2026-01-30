import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MangaCard } from './MangaCard';
import { getLibrary, getHistory } from '../utils/storage';

export function Library() {
  const [activeTab, setActiveTab] = useState('reading');
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Load Data
    setBookmarks(getLibrary());
    setHistory(getHistory());
  }, []);

  const tabs = [
    { id: 'reading', label: 'History' },
    { id: 'bookmarked', label: 'Bookmarked' },
  ];

  return (
    <section className="pt-24 px-4 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Your Library</h1>
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#27272a] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-lg font-medium transition relative ${
                activeTab === tab.id ? 'text-[#6366f1]' : 'text-[#71717a] hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          
          {activeTab === 'reading' && (
            history.length > 0 ? (
              history.map((item, i) => (
                 // History items might need slight adaptation to fit MangaCard props
                 // or we just pass the stored object if it matches the structure
                 <MangaCard key={i} manga={{
                   id: item.mangaId,
                   title: item.title,
                   image: item.image,
                   rating: 'R', // History object might not have rating, fallback
                   genre: 'History'
                 }} />
              ))
            ) : (
              <p className="text-[#71717a] col-span-full text-center py-20">No reading history yet.</p>
            )
          )}

          {activeTab === 'bookmarked' && (
            bookmarks.length > 0 ? (
              bookmarks.map((manga, i) => (
                <MangaCard key={i} manga={manga} />
              ))
            ) : (
              <p className="text-[#71717a] col-span-full text-center py-20">No bookmarks yet.</p>
            )
          )}
          
        </div>
      </div>
    </section>
  );
}