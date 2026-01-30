import { motion } from 'framer-motion';
import { Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function MangaCard({ manga, index = 0 }) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  // 1. Return nothing if data is corrupted
  if (!manga) return null;

  // 2. Safely extract values with fallbacks
  const { id, title, image, rating, genre } = manga;
  const safeGenres = genre ? genre.split(',').slice(0, 2) : ['Manga'];

  const handleClick = (e) => {
    // Stop propagation if clicking inner buttons
    if (e) e.stopPropagation();

    // 3. STRICT CHECK: Ensure ID is valid before navigating
    if (id && id !== 'undefined') {
      navigate(`/manga/${id}`);
    } else {
      console.error("Cannot navigate: Invalid Manga ID", manga);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={handleClick} // Make entire card clickable
      className="cursor-pointer group w-56 flex-shrink-0 relative"
    >
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden border-2 border-[#27272a] transition duration-300">
        
        <motion.img
          src={image || 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-[#0a0a0a]/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 border border-[#27272a]">
          <Star size={14} className="text-[#f59e0b]" fill="currentColor" />
          <span className="text-white text-sm font-semibold">{rating || 'N/A'}</span>
        </div>

        {/* <button
          onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="absolute top-3 left-3 p-2 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-full border border-[#27272a] hover:border-white transition"
        >
          <Bookmark size={16} className={bookmarked ? 'text-white fill-white' : 'text-[#71717a]'} />
        </button> */}

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-base mb-1 line-clamp-1">{title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {safeGenres.map((g, i) => (
              <span key={i} className="text-xs bg-[#6366f1]/20 text-[#818cf8] px-2 py-0.5 rounded-full">
                {g.trim()}
              </span>
            ))}
          </div>
          <button onClick={handleClick} className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-1.5 rounded text-sm transition cursor-pointer">
            Read Now
          </button>
        </div>
      </div>

      <h4 className="mt-3 text-white font-semibold group-hover:text-[#6366f1] transition-colors line-clamp-2">
        {title || 'Unknown Title'}
      </h4>
      <p className="text-[#71717a] text-sm">{safeGenres[0]}</p>
    </motion.div>
  );
}