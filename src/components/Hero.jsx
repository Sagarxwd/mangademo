import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920&h=1080&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center space-y-8 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl md:text-8xl font-extrabold text-white tracking-tight"
        >
          Welcome To <span className="text-[#6366f1]">MangaN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#a1a1aa] text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          Dive into a universe of stunning manga & manhwa chapters, crafted for true fans — anytime, anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/explore')}
            className="bg-[#6366f1] hover:bg-[#4f46e5] px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#6366f1]/25 text-white transition-colors"
          >
            Explore Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/explore')}
            className="border-2 border-[#6366f1] text-[#818cf8] hover:bg-[#6366f1]/10 px-10 py-4 rounded-full font-bold text-lg transition-colors"
          >
            Browse All
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#6366f1]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4f46e5]/20 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}