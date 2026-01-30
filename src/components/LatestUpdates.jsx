import { motion } from 'framer-motion';
import { ArrowRight, BookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LatestUpdates({ mangaList = [] }) {
  const navigate = useNavigate();

  const handleTitleClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  const handleChapterClick = (mangaId, chapterId) => {
    // API provides a UUID for the chapter, or we fallback to the manga page
    if (chapterId && chapterId !== 'undefined' && chapterId.length > 10) {
      navigate(`/manga/${mangaId}/chapter/${chapterId}`);
    } else {
      // Fallback: Go to detail page if no specific chapter ID is readily available
      navigate(`/manga/${mangaId}`);
    }
  };

  const displayList = mangaList.slice(0, 5);

  const handleViewAll = () => {
    navigate('/explore/latest-updates');
  };

  if (displayList.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#141414] backdrop-blur-sm p-6 border border-[#27272a] ">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
        Latest Updates
      </h3>
      <div className="space-y-4">
        {displayList.map((item, idx) => (
          <motion.div
            key={item.id} // Fixed: API uses 'id'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-3 rounded-xl hover:bg-[#1f1f1f] transition-all border border-[#27272a] hover:border-[#6366f1]/50 group cursor-pointer"
            onClick={() => handleTitleClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-20 object-cover rounded-lg border-2 border-[#27272a] group-hover:border-[#6366f1] mr-4 transition"
            />
            <div className="flex-1 min-w-0">
              <h4
                className="text-sm font-bold text-white group-hover:text-[#6366f1] transition-colors cursor-pointer line-clamp-1"
              >
                {item.title}
              </h4>
              <p className="text-xs text-[#a1a1aa] mt-1">
                <span
                  onClick={(e) => { e.stopPropagation(); handleChapterClick(item.id, item.latestChapterId); }}
                  className="text-[#6366f1] cursor-pointer flex items-center gap-1 hover:underline"
                >
                  <BookText size={12} />
                  {/* Display total chapters or 'Read Now' if data is missing */}
                  {item.totalChapters && item.totalChapters !== '?' ? `Ch. ${item.totalChapters}` : 'Read Now'}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.genre && item.genre.split(',').slice(0, 2).map((g, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#1f1f1f] border border-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded-full"
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
        className="mt-6 w-full bg-[#1f1f1f] hover:bg-[#27272a] text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 border border-[#27272a] cursor-pointer"
      >
        View more
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}