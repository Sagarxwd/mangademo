import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LatestUpdates({ mangaList = [] }) {
  const navigate = useNavigate();

  const handleTitleClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  const handleChapterClick = (mangaId, chapterStr) => {
    const chapterNumber = parseInt(chapterStr.replace(/\D/g, ''), 10);
    navigate(`/manga/${mangaId}/chapter/${chapterNumber}`);
  };

  const displayList = mangaList.slice(0, 5);

  const handleViewAll = () => {
    navigate('/explore/latest-updates');
  };

  return (
    <div className="lg:col-span-7 rounded-2xl bg-[#141414] backdrop-blur-sm p-6 border border-[#27272a]">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
        Latest Updates
      </h3>
      <div className="space-y-3">
        {displayList.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-4 rounded-xl hover:bg-[#1f1f1f] transition-all border border-[#27272a] hover:border-[#6366f1]/50 group cursor-pointer"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-20 h-28 object-cover rounded-lg border-2 border-[#27272a] group-hover:border-[#6366f1] mr-4 transition" 
            />
            <div className="flex-1 min-w-0">
              <h4 
                onClick={() => handleTitleClick(item.mangaId)} 
                className="text-base font-bold text-white group-hover:text-[#6366f1] transition-colors cursor-pointer"
              >
                {item.title}
              </h4>
              <p className="text-sm text-[#a1a1aa] mt-1">
                <span 
                  onClick={(e) => { e.stopPropagation(); handleChapterClick(item.mangaId, item.latestChapter); }} 
                  className="text-[#6366f1] ml-1 cursor-pointer flex items-center gap-2 hover:underline"
                >
                  <BookText size={15}/>{item.latestChapter}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.genre.split(',').map((g, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-[#1f1f1f] border border-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded-full"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: displayList.length * 0.1 + 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewAll}
        className="mt-6 w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-[#6366f1]/25"
      >
        View all
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}