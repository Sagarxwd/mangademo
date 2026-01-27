import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Flame } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mostViewedDataDay, mostViewedDataWeek, mostViewedDataMonth } from '../data/mangaData';

export function MostViewedBlock() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('Today');

  const dataMap = {
    'Today': mostViewedDataDay,
    'Week': mostViewedDataWeek,
    'Month': mostViewedDataMonth
  };

  const filtered = dataMap[selectedView].slice(0, 8);

  const handleTitleClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  return (
    <div className="lg:col-span-5 rounded-2xl bg-[#141414] backdrop-blur-sm p-6 border border-[#27272a]">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
        
        Most Viewed
      </h3>
      
      <div className="flex space-x-2 mb-6 bg-[#0a0a0a] p-1 rounded-full border border-[#27272a]">
        {['Today', 'Week', 'Month'].map((v) => (
          <motion.button
            key={v}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedView(v)}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedView === v
                ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/25'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            {v}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5, backgroundColor: 'rgba(39,39,42,0.5)' }}
              className="flex items-center space-x-3 p-3 rounded-lg transition cursor-pointer group border border-transparent hover:border-[#6366f1]/30"
              onClick={() => handleTitleClick(item.mangaId)}
            >
              <span className="flex-shrink-0 text-lg font-bold w-8 text-center text-[#6366f1]">
                {idx + 1}
              </span>
              
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-12 h-16 object-cover rounded-md border border-[#27272a] group-hover:border-[#6366f1] transition" 
                loading="lazy"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#6366f1] line-clamp-2 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-[#71717a] mt-1">
                  <Eye size={12} />
                  <span>{item.views} views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}