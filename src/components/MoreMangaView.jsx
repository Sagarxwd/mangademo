import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MoreManga } from './MoreManga';
import { latestUpdates } from '../data/mangaData';

export function MoreMangaView() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/explore');
  };

  return (
    <div className="px-4 py-20 mt-16 max-w-7xl mx-auto bg-[#0a0a0a] min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 rounded-lg bg-[#1f1f1f] border border-[#27272a] hover:bg-[#2a2a2a] hover:border-[#6366f1] text-white transition"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <h2 className="text-3xl font-bold text-white">Latest Updates</h2>
      </div>
      <MoreManga mangaList={latestUpdates.slice(0, 20)} />
    </div>
  );
}