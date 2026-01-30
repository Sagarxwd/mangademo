import { motion } from 'framer-motion';
import { Star, BookOpen, ChevronLeft, Heart, Bookmark, Share2, ChevronRight } from 'lucide-react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchChapters } from '../api/mangadex';
import { toggleLibrary, isInLibrary, getMangaHistory } from '../utils/storage';

export function DetailPage() {
  const { manga, initialChapters } = useLoaderData();
  const navigate = useNavigate();
  
  const [chapters, setChapters] = useState(initialChapters || []);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    setBookmarked(isInLibrary(manga.id));
    const history = getMangaHistory(manga.id);
    if (history) setLastRead(history);
  }, [manga.id]);

  useEffect(() => {
     // If loader returned empty, try fetching one more time just to be safe
     if(initialChapters && initialChapters.length === 0 && manga.id) {
        setLoading(true);
        fetchChapters(manga.id).then(res => {
            setChapters(res.data);
            setLoading(false);
        });
     }
  }, [manga.id]);

  const handleChapterClick = (chapterId, chapterNumber) => {
    navigate(`/manga/${manga.id}/chapter/${chapterId}`);
  };

  const handleBookmark = () => {
    const isAdded = toggleLibrary(manga);
    setBookmarked(isAdded);
    toast.success(isAdded ? 'Added to Library' : 'Removed from Library');
  };

  const handleLike = () => {
      setLiked(!liked);
      toast.success(liked ? 'Removed from Favorites' : 'Added to Favorites');
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  const startReadingId = chapters.length > 0 ? chapters[chapters.length - 1].id : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16 pb-12 bg-[#0a0a0a] min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img src={manga.image} className="w-full h-full object-cover blur-2xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-48 relative z-10">
        <button onClick={() => navigate('/explore')} className="flex items-center gap-2 text-[#a1a1aa] hover:text-white mb-6">
          <ChevronLeft size={20} /><span>Back</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 h-96 flex-shrink-0">
            <img src={manga.image} className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#27272a]" />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{manga.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-[#f59e0b]" size={20} fill="currentColor" />
                <span className="text-white text-xl font-semibold">{manga.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa]">
                <BookOpen size={20} />
                <span>{chapters.length} readable chapters</span>
              </div>
              <div className="text-[#6366f1] text-sm font-medium capitalize px-3 py-1 bg-[#6366f1]/10 rounded-full">
                {manga.status}
              </div>
            </div>
            
            <p className="text-[#71717a] text-lg mb-8 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
              {manga.description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
               {lastRead ? (
                 <button 
                   onClick={() => handleChapterClick(lastRead.chapterId)} 
                   className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3 rounded-full font-bold text-lg transition shadow-lg shadow-[#6366f1]/25"
                 >
                   Continue Ch {lastRead.chapterNumber}
                 </button>
               ) : (
                 <button 
                   onClick={() => handleChapterClick(startReadingId)} 
                   disabled={!startReadingId}
                   className="bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold text-lg transition"
                 >
                   {chapters.length > 0 ? 'Start Reading' : 'No Chapters'}
                 </button>
               )}
               {/* Bookmark & Like Buttons */}
               <button onClick={handleLike} className={`p-4 rounded-full border border-[#27272a] hover:border-white transition ${liked ? 'bg-[#ef4444]/10 border-[#ef4444]' : 'bg-[#141414]'}`}>
                 <Heart className={liked ? 'text-[#ef4444] fill-[#ef4444]' : 'text-white'} size={24} />
               </button>
               <button onClick={handleBookmark} className={`p-4 rounded-full border border-[#27272a] hover:border-white transition ${bookmarked ? 'bg-[#6366f1]/10 border-[#6366f1]' : 'bg-[#141414]'}`}>
                 <Bookmark className={bookmarked ? 'text-[#6366f1] fill-[#6366f1]' : 'text-white'} size={24} />
               </button>
               <button onClick={handleShare} className="p-4 rounded-full bg-[#141414] border border-[#27272a] hover:border-white text-white transition">
                 <Share2 size={24} />
               </button>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Chapters ({chapters.length})</h3>
          
          <div className="bg-[#141414] border border-[#27272a] rounded-2xl overflow-hidden max-h-[800px] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-10 text-center text-[#71717a]">Loading chapters...</div>
            ) : chapters.length > 0 ? (
              chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => handleChapterClick(ch.id, ch.number)}
                  className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#1f1f1f] border-b border-[#27272a] last:border-0 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-[#6366f1] font-bold w-16 text-right tabular-nums">
                      {ch.number ? `Ch. ${ch.number}` : 'Oneshot'}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                             <h4 className="text-white font-medium group-hover:text-[#6366f1] transition-colors line-clamp-1">
                                {ch.title || `Chapter ${ch.number}`}
                             </h4>
                        </div>
                        <span className="text-xs text-[#71717a] flex gap-2">
                            <span>{ch.group ? `by ${ch.group}` : 'Unknown Group'}</span>
                            <span>•</span>
                            <span>{new Date(ch.publishAt).toLocaleDateString()}</span>
                        </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                      {lastRead?.chapterId === ch.id && (
                         <span className="text-xs bg-[#6366f1] text-white px-2 py-1 rounded-full">Last Read</span>
                      )}
                      <ChevronRight className="text-[#71717a] group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center flex flex-col items-center gap-4 border-2 border-dashed border-[#27272a] rounded-2xl m-4">
                  <BookOpen size={48} className="text-[#27272a]" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">No English Chapters Available</h3>
                   
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}