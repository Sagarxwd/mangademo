import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchMangaList } from '../api/mangadex';
import { HorizontalSection } from './HorizontalSection';
import { LatestUpdates } from './LatestUpdates';
import { MostViewedBlock } from './MostViewedBlock';

// Curated list for Showcase
const SHOWCASE_IDS = [
  'a1c7c817-4e59-43b7-9365-09675a149a6f', // One Piece
  'c52b2ce3-7f95-469c-96b0-479524fb7a1a', // Jujutsu Kaisen
  'a77742b1-befd-49a4-bff5-1ad4e6b0ef7b', // Chainsaw Man
  'b9b47856-db37-4798-8eb4-d432796f01da', // Dandadan
  '97f26d3d-3b77-497d-b572-c205517e4776', // Sakamoto Days
];

export function Explore() {
  const [showcase, setShowcase] = useState([]);
  const [trending, setTrending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [recommended, setRecommended] = useState([]);
  
  // Data for Most Viewed Block
  const [mostViewedData, setMostViewedData] = useState({
      day: [],
      week: [],
      month: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
            showcaseData, 
            trendData, 
            compData, 
            recData,
            topFollowed,
            topRated,
            newest
        ] = await Promise.all([
          fetchMangaList({ ids: SHOWCASE_IDS, limit: 5 }),
          fetchMangaList({ limit: 10, order: { followedCount: 'desc' } }),
          fetchMangaList({ limit: 10, status: ['completed'], order: { rating: 'desc' } }),
          fetchMangaList({ limit: 10, order: { rating: 'desc' } }),
          
          fetchMangaList({ limit: 10, order: { followedCount: 'desc' } }), // Today
          fetchMangaList({ limit: 10, order: { rating: 'desc' } }),        // Week
          fetchMangaList({ limit: 10, order: { createdAt: 'desc' } })      // Month
        ]);

        setShowcase(showcaseData);
        setTrending(trendData);
        setCompleted(compData);
        setRecommended(recData);
        
        setMostViewedData({
            day: topFollowed,
            week: topRated,
            month: newest
        });

      } catch (error) {
        console.error("Failed to load explore data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  return (
    <section className="px-4 pt-24 pb-20 max-w-7xl mx-auto bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-12"
      >
        <h2 className="text-4xl text-white font-bold mb-4">Explore The Manga World</h2>
        <p className="text-[#71717a] text-lg max-w-2xl mx-auto">
          Discover the best manga worlds — trending, recommended, and classics.
        </p>
      </motion.div>

      {/* Grid Layout: Added min-w-0 to prevent overflow issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
         
         {/* Left Column */}
         <div className="lg:col-span-4 xl:col-span-4 space-y-8 min-w-0">
             <LatestUpdates mangaList={showcase} />
             <MostViewedBlock data={mostViewedData} />
         </div>
         
         {/* Right Column */}
         <div className="lg:col-span-8 xl:col-span-8 min-w-0">
             <HorizontalSection title="Trending Now" list={trending} />
             <div className="mt-8">
                <HorizontalSection title="Highly Recommended" list={recommended} />
             </div>
         </div>
      </div>

      <HorizontalSection title="Completed Series" list={completed} />
    </section>
  );
}