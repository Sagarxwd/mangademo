import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MoreManga } from './MoreManga';
import { useState, useEffect } from 'react';
import { fetchMangaList } from '../api/mangadex'; // Import API

export function MoreMangaView() {
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch latest updates (e.g., 50 items)
        const data = await fetchMangaList({ 
          limit: 50, 
          order: { latestUploadedChapter: 'desc' } 
        });
        setMangaList(data);
      } catch (error) {
        console.error("Failed to load latest updates", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBack = () => {
    navigate('/explore');
  };

  return (
    <div className="px-4 py-20 mt-16 max-w-7xl mx-auto bg-[#0a0a0a] min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 rounded-lg bg-[#1f1f1f] border border-[#27272a] hover:bg-[#2a2a2a] hover:border-[#6366f1] text-white transition"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <h2 className="text-3xl font-bold text-white">Latest Updates</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
        </div>
      ) : (
        <MoreManga mangaList={mangaList} />
      )}
    </div>
  );
}