import { motion } from 'framer-motion';
import { Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function MangaCard({ manga, index = 0 }) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  const handleClick = () => {
    navigate(`/manga/${manga.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="cursor-pointer group w-56 flex-shrink-0"
    >
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden border-2 border-[#27272a] group-hover:border-[#6366f1] transition duration-300">
        <motion.img
          src={manga.image}
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onClick={handleClick}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-[#0a0a0a]/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 border border-[#27272a]">
          <Star size={14} className="text-[#f59e0b]" fill="currentColor" />
          <span className="text-white text-sm font-semibold">{manga.rating}</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="absolute top-3 left-3 p-2 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-full border border-[#27272a] hover:border-white transition"
        >
          <Bookmark 
            size={16} 
            className={bookmarked ? 'text-white fill-white' : 'text-[#71717a]'} 
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-base mb-1">{manga.title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {manga.genre.split(',').slice(0, 2).map((g, i) => (
              <span 
                key={i} 
                className="text-xs bg-[#6366f1]/20 backdrop-blur-sm border border-[#6366f1]/30 text-[#818cf8] px-2 py-0.5 rounded-full"
              >
                {g.trim()}
              </span>
            ))}
          </div>
          <button 
            onClick={handleClick} 
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-1.5 rounded text-sm transition shadow-lg shadow-[#6366f1]/25"
          >
            Read Now
          </button>
        </div>
      </div>

      <h4 className="mt-3 text-white font-semibold group-hover:text-[#6366f1] transition-colors line-clamp-2">
        {manga.title}
      </h4>
      <p className="text-[#71717a] text-sm">{manga.genre.split(',')[0]}</p>
    </motion.div>
  );
}