import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, X, Settings, ZoomIn, ZoomOut, Maximize, HelpCircle, ChevronDown, ChevronRightIcon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchChapterPages, fetchMangaDetail, fetchChapters } from '../api/mangadex';
import { saveHistory } from '../utils/storage';

function PageSkeleton({ mode }) {
  return (
    <div className={`space-y-2 animate-pulse ${mode === 'horizontal' ? 'flex gap-4 overflow-x-auto' : ''}`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-[#1f1f1f] rounded-lg ${mode === 'horizontal' ? 'w-[85vw] h-[85vh] flex-shrink-0' : 'h-[800px] w-full'}`} 
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
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
  const { mangaId, chapterId } = useLoaderData();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [manga, setManga] = useState(null);
  
  // Navigation State
  const [nextChapterId, setNextChapterId] = useState(null);
  const [prevChapterId, setPrevChapterId] = useState(null);
  const [currentChapterNumber, setCurrentChapterNumber] = useState(null);

  // UI State
  const [zoom, setZoom] = useState(1); 
  const [showSettings, setShowSettings] = useState(false);
  const [readingMode, setReadingMode] = useState(() => localStorage.getItem('reader-mode') || 'vertical');
  const [currentPage, setCurrentPage] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const horizontalScrollRef = useRef(null);

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const mangaData = await fetchMangaDetail(mangaId);
        setManga(mangaData);

        const pageUrls = await fetchChapterPages(chapterId);
        
        if (!pageUrls || pageUrls.length === 0) {
            toast.error("This chapter has no pages (it might be external).");
            setPages([]);
        } else {
            setPages(pageUrls);
        }

        const chaptersData = await fetchChapters(mangaId); // Fetch all chapters (handled by recursive fetch in api)
        const sortedChapters = chaptersData.data;
        const currentIndex = sortedChapters.findIndex(ch => ch.id === chapterId);
        
        if (currentIndex !== -1) {
          const currentCh = sortedChapters[currentIndex];
          setCurrentChapterNumber(currentCh.number);
          
          // Save to History
          saveHistory(mangaData, chapterId, currentCh.number);

          // Set Next/Prev (Note: List is sorted Descending, so Next is index - 1)
          if (currentIndex > 0) setNextChapterId(sortedChapters[currentIndex - 1].id);
          else setNextChapterId(null);
          
          if (currentIndex < sortedChapters.length - 1) setPrevChapterId(sortedChapters[currentIndex + 1].id);
          else setPrevChapterId(null);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading chapter");
      } finally {
        setLoading(false);
      }
    };
    loadData();
    window.scrollTo(0, 0);
    setCurrentPage(0);
    setZoom(1);
  }, [mangaId, chapterId]);

  // Handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  const handleNextChapter = () => {
    if (nextChapterId) navigate(`/manga/${mangaId}/chapter/${nextChapterId}`);
    else toast.success("Latest chapter reached!");
  };

  const handlePrevChapter = () => {
    if (prevChapterId) navigate(`/manga/${mangaId}/chapter/${prevChapterId}`);
  };

  const handleNextPage = () => {
      if (currentPage < pages.length - 1) {
          const newPage = currentPage + 1;
          setCurrentPage(newPage);
          if (readingMode === 'horizontal' && horizontalScrollRef.current) {
              const scrollAmount = window.innerWidth;
              horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
      } else if (nextChapterId) {
          toast((t) => (
             <div onClick={() => { handleNextChapter(); toast.dismiss(t.id); }} className="cursor-pointer font-bold flex items-center gap-2">
                Read Next Chapter <ArrowRight size={16}/>
             </div>
          ));
      }
  };

  const handlePrevPage = () => {
      if (currentPage > 0) {
          const newPage = currentPage - 1;
          setCurrentPage(newPage);
          if (readingMode === 'horizontal' && horizontalScrollRef.current) {
              const scrollAmount = window.innerWidth;
              horizontalScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          }
      }
  };

  const toggleMode = (mode) => {
    setReadingMode(mode);
    localStorage.setItem('reader-mode', mode);
    setCurrentPage(0);
    setZoom(1);
    window.scrollTo(0, 0);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '?' && e.shiftKey) { setShowShortcuts(true); return; }
      if (showShortcuts && e.key === 'Escape') { setShowShortcuts(false); return; }
      
      if (readingMode === 'horizontal') {
        if (e.key === 'ArrowRight') handleNextPage();
        if (e.key === 'ArrowLeft') handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [readingMode, currentPage, pages.length, showShortcuts, nextChapterId]);


  return (
    <div className="pt-16 bg-[#0a0a0a] min-h-screen text-white select-none overflow-x-hidden">
      <AnimatePresence>
        {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#141414]/95 backdrop-blur border-b border-[#27272a] px-4 py-2 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(`/manga/${mangaId}`)} className="text-[#a1a1aa] hover:text-white flex items-center gap-1 transition">
                <X size={20}/> <span className="hidden sm:inline">Close</span>
            </button>
            <div className="hidden md:block">
                <span className="text-sm font-semibold text-white">{manga?.title}</span>
                <span className="text-xs text-[#6366f1] ml-2">Ch. {currentChapterNumber}</span>
            </div>
          </div>
          
          {/* Center: Zoom Controls */}
          <div className="flex items-center gap-1 bg-[#1f1f1f] rounded-lg p-1 border border-[#27272a]">
            <button onClick={handleZoomOut} className="p-1.5 hover:text-[#6366f1] hover:bg-[#27272a] rounded transition"><ZoomOut size={16} /></button>
            <span className="text-xs font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 hover:text-[#6366f1] hover:bg-[#27272a] rounded transition"><ZoomIn size={16} /></button>
            <div className="w-px h-4 bg-[#27272a] mx-1"></div>
            <button onClick={resetZoom} className="p-1.5 hover:text-[#6366f1] hover:bg-[#27272a] rounded transition" title="Reset Zoom"><Maximize size={14} /></button>
          </div>

          <div className="flex gap-2">
             <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded bg-[#1f1f1f] text-[#a1a1aa] hover:text-white border border-[#27272a]">
                <Settings size={20} />
             </button>
             <button onClick={handleNextChapter} disabled={!nextChapterId} className="bg-[#6366f1] hover:bg-[#4f46e5] px-4 py-1.5 rounded text-sm font-bold disabled:opacity-50 transition shadow-lg shadow-[#6366f1]/20">
                Next <span className="hidden sm:inline">Chapter</span>
             </button>
          </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#141414] border-b border-[#27272a] overflow-hidden">
                <div className="p-4 max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-[#a1a1aa]">Reading Mode:</span>
                        <div className="flex gap-2">
                            <button onClick={() => toggleMode('vertical')} className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 border ${readingMode === 'vertical' ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'bg-[#27272a] border-[#27272a] text-[#a1a1aa]'}`}>
                                <ChevronDown size={14}/> Vertical
                            </button>
                            <button onClick={() => toggleMode('horizontal')} className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 border ${readingMode === 'horizontal' ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'bg-[#27272a] border-[#27272a] text-[#a1a1aa]'}`}>
                                <ChevronRightIcon size={14}/> Horizontal
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setShowShortcuts(true)} className="text-sm text-[#6366f1] hover:underline flex items-center gap-1">
                        <HelpCircle size={14}/> Shortcuts
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Reader Area */}
      <div className={`mx-auto py-8 px-4 transition-all duration-300 ${readingMode === 'horizontal' ? 'w-full h-[calc(100vh-140px)] relative' : 'max-w-4xl'}`}>
        
        {loading ? <PageSkeleton mode={readingMode} /> : (
            <>
                <div 
                  ref={readingMode === 'horizontal' ? horizontalScrollRef : null}
                  className={readingMode === 'horizontal' ? 'flex gap-4 h-full overflow-x-auto snap-x snap-mandatory items-center no-scrollbar' : 'flex flex-col items-center gap-4'}
                >
                {pages.map((src, i) => (
                    <div 
                        key={i} 
                        className={`relative transition-all duration-200 ease-out origin-top ${readingMode === 'horizontal' ? 'flex-shrink-0 snap-center h-full flex items-center justify-center min-w-[50vw]' : ''}`}
                        style={readingMode === 'vertical' ? { width: `${zoom * 100}%` } : {}}
                    >
                        <img 
                            src={src} 
                            alt={`Page ${i + 1}`}
                            className={`rounded shadow-2xl bg-[#1f1f1f] ${readingMode === 'horizontal' ? 'h-full w-auto object-contain' : 'w-full'}`}
                            loading="eager"
                            referrerPolicy="no-referrer"
                        />
                        {readingMode === 'horizontal' && (
                             <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                                {i + 1} / {pages.length}
                             </div>
                        )}
                    </div>
                ))}
                </div>

                {/* Horizontal Navigation Buttons (Overlay) */}
                {readingMode === 'horizontal' && !loading && pages.length > 0 && (
                    <>
                    <button onClick={handlePrevPage} disabled={currentPage === 0} className="fixed left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-[#6366f1] disabled:opacity-0 transition z-50 text-white border border-white/10">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={handleNextPage} className="fixed right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-[#6366f1] transition z-50 text-white border border-white/10">
                        <ArrowRight size={24} />
                    </button>
                    </>
                )}
            </>
        )}
      </div>

      {/* Vertical Footer Navigation */}
      {readingMode === 'vertical' && !loading && (
          <div className="flex justify-center gap-4 py-8 pb-20">
             <button onClick={handlePrevChapter} disabled={!prevChapterId} className="px-6 py-3 rounded-full bg-[#1f1f1f] border border-[#27272a] hover:border-white disabled:opacity-50 transition">
                Previous Chapter
             </button>
             <button onClick={handleNextChapter} disabled={!nextChapterId} className="px-6 py-3 rounded-full bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 text-white font-bold shadow-lg shadow-[#6366f1]/20 transition">
                Next Chapter
             </button>
          </div>
      )}
    </div>
  );
}