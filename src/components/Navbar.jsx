import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function Navbar({ query, setQuery, setShowLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Container - No extra border, image fills completely */}
        
          
          {/* Brand Text */}
          <div className="hidden sm:block ">
            <h1 className="font-extrabold text-xl text-white transition-colors duration-300 mb-1">
              MangaShelf
            </h1>
            <p className="text-[9px] text-[#6366f1] -mt-1 tracking-[0.2em] font-medium uppercase">
              Read Manga Online
            </p>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="hidden md:flex items-center gap-8"
        >
          <button 
            onClick={() => navigate('/')} 
            className="text-[#a1a1aa] hover:text-white transition-colors font-medium"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/explore')} 
            className="text-[#a1a1aa] hover:text-white transition-colors font-medium"
          >
            Explore
          </button>
          <button 
            onClick={() => navigate('/library')} 
            className="text-[#a1a1aa] hover:text-white transition-colors font-medium"
          >
            Library
          </button>
        </motion.div>

        {/* Search + Login */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="hidden md:flex items-center gap-4"
        >
          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] group-focus-within:text-[#6366f1] transition-colors" />
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search manga..."
              className="bg-[#141414] border border-[#27272a] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/50 w-64 transition-all duration-300"
            />
          </div>

          {/* <button 
            onClick={() => setShowLogin(true)} 
            className="bg-[#6366f1] hover:bg-[#4f46e5] active:scale-95 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 text-white shadow-lg shadow-[#6366f1]/25"
          >
            Login
          </button> */}
        </motion.div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-[#71717a] hover:text-white transition p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0a0a] border-t border-[#27272a] px-4 py-4 overflow-hidden"
        >
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => { navigate('/'); setMenuOpen(false); }} 
              className="text-left text-[#a1a1aa] hover:text-white transition py-2"
            >
              Home
            </button>
            <button 
              onClick={() => { navigate('/explore'); setMenuOpen(false); }} 
              className="text-left text-[#a1a1aa] hover:text-white transition py-2"
            >
              Explore
            </button>
            <button 
              onClick={() => { navigate('/library'); setMenuOpen(false); }} 
              className="text-left text-[#a1a1aa] hover:text-white transition py-2"
            >
              Library
            </button>
            <div className="relative mt-2">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
              <input
                value={query}
                onChange={handleSearch}
                placeholder="Search manga..."
                className="w-full bg-[#141414] border border-[#27272a] rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#6366f1] transition"
              />
            </div>
            <button 
              onClick={() => { setShowLogin(true); setMenuOpen(false); }} 
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-3 rounded-full font-semibold transition shadow-lg shadow-[#6366f1]/25 mt-2"
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}