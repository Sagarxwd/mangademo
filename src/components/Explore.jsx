import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MANGA_LIST, latestUpdates } from '../data/mangaData';
import { HorizontalSection } from './HorizontalSection';
import { LatestUpdates } from './LatestUpdates';
import { MostViewedBlock } from './MostViewedBlock';

export function Explore({ query }) {
  const navigate = useNavigate();

  const filtered = query
    ? MANGA_LIST.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.genre.toLowerCase().includes(query.toLowerCase())
      )
    : MANGA_LIST;

  const trending = filtered.slice(0, 10);
  const completed = filtered.filter((m) => m.status === 'completed').slice(0, 10);
  const recommended = filtered.filter((m) => m.rating >= 9).slice(0, 10);

  return (
    <section className="px-4 pt-24 pb-20 max-w-7xl mx-auto bg-[#0a0a0a] min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          
          <h2 className="text-4xl text-white font-bold">Explore The Manga World</h2>
        </div>
        <p className="text-[#71717a] text-lg max-w-2xl mx-auto">
          Discover the best manga worlds — trending, recommended, and classics.
        </p>
      </motion.div>

      {/* Results count if searching */}
      {query && (
        <p className="text-[#71717a] mb-6 text-center">
          Found {filtered.length} results for "{query}"
        </p>
      )}

      <HorizontalSection 
        title="Trending Now" 
         
        list={trending} 
      />
      <HorizontalSection 
        title="Completed Series" 
        
        list={completed} 
      />
      <HorizontalSection 
        title="Highly Recommended" 
         
        list={recommended} 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16"
      >
        <div className="lg:col-span-8">
          <LatestUpdates mangaList={latestUpdates} />
        </div>
        <div className="lg:col-span-4">
          <MostViewedBlock />
        </div>
      </motion.div>
    </section>
  );
}