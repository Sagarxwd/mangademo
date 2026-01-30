import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MangaCard } from './MangaCard';

export function HorizontalSection({ title, icon, list }) {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const cardWidth = 224;
  const gap = 12;
  const scrollAmount = (cardWidth + gap) * 3;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={scrollLeft} 
            disabled={atStart} 
            className="p-2 rounded-full bg-[#1f1f1f] border border-[#27272a] hover:bg-[#2a2a2a] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={scrollRight} 
            disabled={atEnd} 
            className="p-2 rounded-full bg-[#1f1f1f] border border-[#27272a] hover:bg-[#2a2a2a] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      <div ref={scrollRef} onScroll={checkScroll} className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
        {list.map((m, i) => (
          <div key={`${m.id}-${i}`} className="flex-shrink-0 w-56">
            <MangaCard manga={m} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}