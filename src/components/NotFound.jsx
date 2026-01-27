import { motion } from 'framer-motion';
import { Ghost, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366f1]/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#6366f1]/10 rounded-full blur-3xl"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block p-6 bg-[#141414] border border-[#27272a] rounded-3xl mb-8"
        >
          <Ghost size={80} className="text-[#6366f1]" />
        </motion.div>

        <h1 className="text-9xl font-bold text-[#6366f1] mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-[#71717a] text-lg max-w-md mx-auto mb-8">
          The page you're looking for seems to have wandered off into another dimension.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-4 rounded-full font-semibold transition shadow-lg shadow-[#6366f1]/25"
          >
            <Home size={20} />
            Go Home
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/explore')}
            className="flex items-center justify-center gap-2 bg-[#141414] border border-[#27272a] hover:border-[#6366f1] text-[#a1a1aa] hover:text-white px-8 py-4 rounded-full font-semibold transition"
          >
            <Search size={20} />
            Explore Manga
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}