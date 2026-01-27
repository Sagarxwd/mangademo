import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Download, X, Settings, ChevronDown, ChevronRightIcon, HelpCircle, ChevronUp } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';

function PageSkeleton({ mode }) {
  return (
    <div className={`space-y-2 animate-pulse ${mode === 'horizontal' ? 'flex gap-4 overflow-x-auto' : ''}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-[#1f1f1f] rounded-lg ${mode === 'horizontal' ? 'w-[800px] h-[1200px] flex-shrink-0' : 'h-[1200px] max-w-full'}`} 
        />
      ))}
    </div>
  );
}

function KeyboardShortcuts({ onClose }) {
  const shortcuts = [
    { key: '← / →', action: 'Previous/Next Page (Horizontal)' },
    { key: 'Shift + ?', action: 'Show/Hide Shortcuts' },
    { key: 'ESC', action: 'Close Reader' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }}
        className="bg-[#141414] border border-[#27272a] rounded-2xl p-8 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-white mb-6">Keyboard Shortcuts</h3>
        <div className="space-y-3">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-[#27272a] last:border-0">
              <kbd className="bg-[#27272a] px-3 py-1 rounded text-[#6366f1] font-mono">{s.key}</kbd>
              <span className="text-[#a1a1aa] text-sm">{s.action}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-6 bg-[#6366f1] hover:bg-[#4f46e5] py-3 rounded-lg text-white font-semibold">Close</button>
      </motion.div>
    </motion.div>
  );
}

export function ReaderPage() {
  const { manga, chapterNumber } = useLoaderData();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [readingMode, setReadingMode] = useState(() => localStorage.getItem('reader-mode') || 'vertical');
  const [currentPage, setCurrentPage] = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const horizontalScrollRef = useRef(null);
  
  const totalChapters = manga?.totalChapters || 0;
  const currentChapter = parseInt(chapterNumber) || 1;

  // Save progress to localStorage
  const saveProgress = useCallback((page, chapter) => {
    const key = `manga-${manga.id}-progress`;
    localStorage.setItem(key, JSON.stringify({
      chapter: chapter || currentChapter,
      page: page,
      timestamp: new Date().toISOString()
    }));
  }, [manga.id, currentChapter]);

  // Load saved mode
  useEffect(() => {
    localStorage.setItem('reader-mode', readingMode);
  }, [readingMode]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentChapter > totalChapters && totalChapters > 0) {
    return (
      <div className="pt-24 bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Chapter Not Found</h1>
        <p className="text-[#71717a] mb-6">
          This manga only has {totalChapters} chapters.
        </p>
        <button 
          onClick={() => navigate(`/manga/${manga.id}`)}
          className="bg-[#6366f1] hover:bg-[#4f46e5] px-6 py-3 rounded-full transition shadow-lg shadow-[#6366f1]/25"
        >
          Back to Details
        </button>
      </div>
    );
  }

  useEffect(() => {
    setLoading(true);
    setCurrentPage(0);
    // Restore last page if same chapter
    const saved = JSON.parse(localStorage.getItem(`manga-${manga.id}-progress`) || '{}');
    if (saved.chapter === currentChapter && saved.page) {
      setCurrentPage(saved.page);
    }
    
    const mockPages = Array.from({ length: 12 }, (_, i) =>
      `https://images.unsplash.com/photo-${1578632767115 + currentChapter * 100 + i}?w=800&h=1200&fit=crop`
    );
    setPages(mockPages);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [currentChapter, manga.id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '?' && e.shiftKey) {
        setShowShortcuts(true);
        return;
      }
      
      if (showShortcuts) {
        if (e.key === 'Escape') setShowShortcuts(false);
        return;
      }

      if (e.key === 'ArrowRight') {
        if (readingMode === 'horizontal') handleNextPage();
        else if (currentChapter < totalChapters) nextChapter();
      }
      if (e.key === 'ArrowLeft') {
        if (readingMode === 'horizontal') handlePrevPage();
        else if (currentChapter > 1) prevChapter();
      }
      if (e.key === 'Escape') navigate(`/manga/${manga.id}`);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentChapter, manga.id, navigate, totalChapters, readingMode, currentPage, pages.length, showShortcuts]);

  const nextChapter = () => {
    if (currentChapter < totalChapters) {
      saveProgress(0, currentChapter + 1);
      navigate(`/manga/${manga.id}/chapter/${currentChapter + 1}`);
      toast.success(`Chapter ${currentChapter + 1}`);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      saveProgress(0, currentChapter - 1);
      navigate(`/manga/${manga.id}/chapter/${currentChapter - 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      saveProgress(newPage);
      if (readingMode === 'horizontal' && horizontalScrollRef.current) {
        horizontalScrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
      }
    } else {
      // Auto next chapter with confirmation
      if (currentChapter < totalChapters) {
        toast((t) => (
          <div className="flex items-center gap-4">
            <span>Next Chapter?</span>
            <button 
              onClick={() => { nextChapter(); toast.dismiss(t.id); }}
              className="bg-[#6366f1] px-3 py-1 rounded text-white"
            >
              Yes
            </button>
          </div>
        ), { duration: 3000 });
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      saveProgress(newPage);
      if (readingMode === 'horizontal' && horizontalScrollRef.current) {
        horizontalScrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
      }
    }
  };

  const toggleMode = (mode) => {
    setReadingMode(mode);
    setCurrentPage(0);
    saveProgress(0);
    window.scrollTo(0, 0);
  };

  const handleImageLoad = (index) => {
    setImgLoaded(prev => ({ ...prev, [index]: true }));
  };

  const progressPercent = ((currentPage + 1) / pages.length) * 100;

  return (
    <div className="pt-16 bg-[#0a0a0a] min-h-screen text-white select-none">
      <AnimatePresence>
        {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-[#27272a] z-[60]">
        <motion.div 
          className="h-full bg-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Top Navigation */}
      <div className="sticky top-16 z-40 bg-[#141414]/95 backdrop-blur border-b border-[#27272a] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`/manga/${manga.id}`)}
            className="flex items-center gap-2 text-[#a1a1aa] hover:text-white transition"
          >
            <X size={20} /><span className="hidden sm:inline">Close</span>
          </motion.button>

          <div className="flex flex-col items-center">
            <div className="font-semibold text-sm sm:text-base text-white line-clamp-1 max-w-[200px]">
              {manga.title}
            </div>
            <div className="text-xs text-[#6366f1] font-medium">
              Ch. {currentChapter} / {totalChapters} {readingMode === 'horizontal' && `• P. ${currentPage + 1}/${pages.length}`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShortcuts(true)}
              className="p-2 rounded-lg bg-[#1f1f1f] border border-[#27272a] text-[#a1a1aa] hover:text-white transition"
              title="Keyboard Shortcuts (Shift + ?)"
            >
              <HelpCircle size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg border transition ${showSettings ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'bg-[#1f1f1f] border-[#27272a] text-[#a1a1aa]'}`}
            >
              <Settings size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prevChapter}
              disabled={currentChapter === 1}
              className="p-2 rounded-lg bg-[#1f1f1f] border border-[#27272a] disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextChapter}
              disabled={currentChapter === totalChapters}
              className="p-2 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-40 disabled:cursor-not-allowed text-white transition shadow-lg shadow-[#6366f1]/25"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#141414] border-b border-[#27272a] p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#71717a] font-medium">Reading Mode:</span>
              <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg">
                <button onClick={() => toggleMode('vertical')} className={`px-4 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${readingMode === 'vertical' ? 'bg-[#6366f1] text-white shadow-lg' : 'text-[#a1a1aa]'}`}>
                  <ChevronDown size={16} /> Vertical
                </button>
                <button onClick={() => toggleMode('horizontal')} className={`px-4 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${readingMode === 'horizontal' ? 'bg-[#6366f1] text-white shadow-lg' : 'text-[#a1a1aa]'}`}>
                  <ChevronRightIcon size={16} /> Horizontal
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Side Controls */}
      <div className="fixed z-50 top-1/2 left-4 -translate-y-1/2 hidden md:block">
        <motion.button whileTap={{ scale: 0.9 }} onClick={readingMode === 'horizontal' ? handlePrevPage : prevChapter} disabled={readingMode === 'horizontal' ? currentPage === 0 : currentChapter === 1} className="p-3 rounded-full bg-[#141414]/90 backdrop-blur border border-[#27272a] hover:border-[#6366f1] disabled:opacity-40 text-white transition mb-2">
          <ArrowLeft size={24} />
        </motion.button>
      </div>

      <div className="fixed z-50 top-1/2 right-4 -translate-y-1/2 hidden md:flex flex-col gap-2">
        <motion.button whileTap={{ scale: 0.9 }} onClick={readingMode === 'horizontal' ? handleNextPage : nextChapter} disabled={readingMode === 'horizontal' ? currentPage >= pages.length - 1 : currentChapter === totalChapters} className="p-3 rounded-full bg-[#6366f1] hover:bg-[#4f46e5] shadow-lg shadow-[#6366f1]/25 disabled:opacity-40 text-white transition">
          <ArrowRight size={24} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => {}} className="p-3 rounded-full bg-[#141414]/90 backdrop-blur border border-[#27272a] hover:border-[#6366f1] text-[#a1a1aa] transition">
          <Download size={24} />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className={`mx-auto py-8 px-4 ${readingMode === 'horizontal' ? 'max-w-full h-[calc(100vh-140px)]' : 'max-w-4xl'}`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <PageSkeleton mode={readingMode} />
          ) : (
            <motion.div ref={readingMode === 'horizontal' ? horizontalScrollRef : null} className={readingMode === 'horizontal' ? 'flex gap-4 h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory items-center' : 'space-y-4'}>
              {pages.map((src, i) => (
                <div key={i} className={`relative ${readingMode === 'horizontal' ? 'flex-shrink-0 snap-center h-full flex items-center justify-center px-4' : 'w-full'}`} onClick={readingMode === 'horizontal' ? handleNextPage : undefined}>
                  {!imgLoaded[i] && <div className={`bg-[#1f1f1f] animate-pulse rounded-lg ${readingMode === 'horizontal' ? 'w-[60vh] h-[85vh]' : 'w-full h-[600px]'}`} />}
                  <img src={src} alt={`Page ${i + 1}`} loading="lazy" onLoad={() => handleImageLoad(i)} className={`rounded-lg shadow-2xl border border-[#27272a] transition-opacity duration-500 ${readingMode === 'horizontal' ? 'h-[85vh] w-auto max-w-full object-contain cursor-pointer hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'w-full'} ${imgLoaded[i] ? 'opacity-100' : 'opacity-0'} ${currentPage === i && readingMode === 'horizontal' ? 'ring-2 ring-[#6366f1]' : ''}`} onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9IiMxZjFmMWYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzYzNjZmMSIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'; }} />
                  {readingMode === 'horizontal' && currentPage === i && <div className="absolute bottom-4 right-4 bg-[#6366f1] text-white px-3 py-1 rounded-full text-sm font-bold">{i + 1} / {pages.length}</div>}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      {readingMode === 'horizontal' && !loading && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#141414]/95 backdrop-blur border border-[#27272a] px-6 py-3 rounded-full md:hidden z-50">
          <button onClick={handlePrevPage} disabled={currentPage === 0} className="p-2 rounded-full bg-[#1f1f1f] disabled:opacity-40 text-white"><ChevronLeft size={20} /></button>
          <span className="text-[#a1a1aa] font-medium min-w-[80px] text-center">{currentPage + 1} / {pages.length}</span>
          <button onClick={handleNextPage} disabled={currentPage >= pages.length - 1} className="p-2 rounded-full bg-[#6366f1] disabled:opacity-40 text-white"><ChevronRight size={20} /></button>
        </div>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.1 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 p-3 bg-[#6366f1] hover:bg-[#4f46e5] rounded-full shadow-lg shadow-[#6366f1]/25 z-50 transition">
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
}