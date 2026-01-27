import { motion } from 'framer-motion';
import { Star, BookOpen, ChevronLeft, Heart, Bookmark, Share2, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function DetailPage() {
  const { manga } = useLoaderData();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [visibleChapters, setVisibleChapters] = useState(50);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Check if bookmarked from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`manga-${manga.id}-bookmarked`);
    if (saved) setBookmarked(true);
    const likedStatus = localStorage.getItem(`manga-${manga.id}-liked`);
    if (likedStatus) setLiked(true);
  }, [manga.id]);

  if (!manga) return null;

  const chapters = Array.from({ length: manga.totalChapters || 0 }, (_, i) => ({ 
    number: i + 1, 
    title: `Chapter ${i + 1}`
    // ❌ Date hata diya
  }));

  const chaptersToShow = chapters.slice(0, visibleChapters);
  const hasMore = chapters.length > visibleChapters;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: manga.title,
        text: `Check out ${manga.title} on MangaNow!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      localStorage.setItem(`manga-${manga.id}-bookmarked`, 'true');
      toast.success('Added to bookmarks!');
    } else {
      localStorage.removeItem(`manga-${manga.id}-bookmarked`);
      toast.success('Removed from bookmarks');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      localStorage.setItem(`manga-${manga.id}-liked`, 'true');
      toast.success('Added to favorites!');
    } else {
      localStorage.removeItem(`manga-${manga.id}-liked`);
      toast.success('Removed from favorites');
    }
  };

  const handleChapterClick = (chapterNum) => {
    localStorage.setItem(`manga-${manga.id}-progress`, JSON.stringify({
      chapter: chapterNum,
      page: 0,
      timestamp: new Date().toISOString()
    }));
    navigate(`/manga/${manga.id}/chapter/${chapterNum}`);
  };

  const lastRead = JSON.parse(localStorage.getItem(`manga-${manga.id}-progress`) || '{}');
  const continueChapter = lastRead.chapter || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16 pb-12 bg-[#0a0a0a] min-h-screen">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={manga.image} 
          alt={manga.title} 
          className={`w-full h-full object-cover blur-2xl scale-110 transition-opacity duration-500 ${imgLoaded ? 'opacity-20' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && <div className="absolute inset-0 bg-[#1f1f1f] animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/explore')}
          className="flex items-center gap-2 text-[#a1a1aa] hover:text-white mb-6 transition"
        >
          <ChevronLeft size={20} /><span>Back</span>
        </motion.button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-64 h-96 flex-shrink-0">
            {!imgLoaded && <div className="absolute inset-0 bg-[#1f1f1f] rounded-2xl animate-pulse" />}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={manga.image}
              alt={manga.title}
              className={`w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#27272a] transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <h1 className="text-5xl font-bold text-white mb-4">{manga.title}</h1>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-[#f59e0b]" size={20} fill="currentColor" />
                <span className="text-white text-xl font-semibold">{manga.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa]">
                <BookOpen size={20} />
                <span>{manga.totalChapters || 'N/A'} chapters</span>
              </div>
              <div className="flex items-center gap-2 text-[#6366f1] text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
                {manga.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {manga.genre.split(', ').map((g, i) => (
                <span key={i} className="bg-[#1f1f1f] border border-[#27272a] text-[#a1a1aa] px-4 py-1 rounded-full text-sm hover:border-[#6366f1] hover:text-white transition cursor-pointer">
                  {g}
                </span>
              ))}
            </div>

            <p className="text-[#71717a] text-lg mb-8 leading-relaxed">
              An epic story filled with action, adventure, and unforgettable characters. Follow the journey as heroes rise to face incredible challenges.
            </p>

            {lastRead.chapter && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-[#a1a1aa] text-sm">Continue Reading</p>
                  <p className="text-white font-bold">Chapter {lastRead.chapter}</p>
                </div>
                <button 
                  onClick={() => handleChapterClick(lastRead.chapter)}
                  className="bg-[#6366f1] hover:bg-[#4f46e5] px-4 py-2 rounded-lg text-white font-semibold transition"
                >
                  Resume
                </button>
              </motion.div>
            )}

            <div className="flex gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChapterClick(1)}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-12 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-[#6366f1]/25"
              >
                {lastRead.chapter ? 'Start Over' : 'Start Reading'}
              </motion.button>

              {/* ❤️ Heart - Red Theme */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`p-4 rounded-full border-2 transition ${
                  liked 
                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                    : 'border-[#27272a] text-[#71717a] hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={24} fill={liked ? "currentColor" : "none"} />
              </motion.button>

              {/* 🔖 Bookmark - White Theme */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className={`p-4 rounded-full border-2 transition ${
                  bookmarked 
                    ? 'bg-white/10 border-white text-white' 
                    : 'border-[#27272a] text-[#71717a] hover:border-white hover:text-white'
                }`}
              >
                <Bookmark size={24} fill={bookmarked ? "currentColor" : "none"} />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={handleShare}
                className="p-4 rounded-full border-2 border-[#27272a] text-[#71717a] hover:border-[#6366f1] hover:text-[#6366f1] transition"
              >
                <Share2 size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Chapters</h3>
            <span className="text-[#71717a] text-sm">{chapters.length} Total</span>
          </div>
          
          <div className="bg-[#141414] border border-[#27272a] rounded-2xl overflow-hidden">
            {chaptersToShow.map((ch, idx) => (
              <motion.div
                key={ch.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.01 }}
                whileHover={{ x: 10, backgroundColor: '#1f1f1f' }}
                onClick={() => handleChapterClick(ch.number)}
                className={`flex items-center justify-between px-6 py-4 cursor-pointer group border-b border-[#27272a] last:border-b-0 transition-colors ${
                  lastRead.chapter === ch.number ? 'bg-[#6366f1]/10 border-l-4 border-l-[#6366f1]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    lastRead.chapter === ch.number 
                      ? 'bg-[#6366f1] text-white' 
                      : 'bg-[#1f1f1f] border border-[#27272a] text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white'
                  }`}>
                    {ch.number}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-[#6366f1] transition">{ch.title}</h4>
                    {/* ❌ Date yahan se hat gaya */}
                  </div>
                </div>
                {lastRead.chapter === ch.number && (
                  <span className="text-xs text-[#6366f1] font-medium">Reading...</span>
                )}
                <ChevronRight className="text-[#71717a] group-hover:text-[#6366f1] transition" />
              </motion.div>
            ))}
            
            {hasMore && (
              <button 
                onClick={() => setVisibleChapters(prev => Math.min(prev + 50, chapters.length))}
                className="w-full py-4 bg-[#1f1f1f] hover:bg-[#27272a] text-[#a1a1aa] transition flex items-center justify-center gap-2"
              >
                Load More <ChevronDown size={16} />
                <span className="text-xs ml-2">({chapters.length - visibleChapters} remaining)</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}