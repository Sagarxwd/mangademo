import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LoginModal({ setShowLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setShowLogin(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setShowLogin]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#141414] text-white border border-[#27272a] rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <button 
          onClick={() => setShowLogin(false)} 
          className="absolute right-4 top-4 text-[#71717a] hover:text-white transition"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <h2 className="text-3xl font-bold text-white text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <div>
              <label className="text-xs font-bold tracking-wider block mb-2 text-[#71717a]">EMAIL</label>
              <input 
                autoFocus={isLogin} 
                type="email" 
                placeholder="name@email.com" 
                className="w-full bg-[#0a0a0a] border-2 border-[#27272a] px-4 py-3 rounded-lg focus:border-[#6366f1] outline-none text-white placeholder-[#71717a] transition" 
              />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wider block mb-2 text-[#71717a]">PASSWORD</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                className="w-full bg-[#0a0a0a] border-2 border-[#27272a] px-4 py-3 rounded-lg focus:border-[#6366f1] outline-none text-white placeholder-[#71717a] transition" 
              />
            </div>

            {!isLogin && (
              <div>
                <label className="text-xs font-bold tracking-wider block mb-2 text-[#71717a]">CONFIRM PASSWORD</label>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  className="w-full bg-[#0a0a0a] border-2 border-[#27272a] px-4 py-3 rounded-lg focus:border-[#6366f1] outline-none text-white placeholder-[#71717a] transition" 
                />
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-2 w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3 rounded-lg transition transform shadow-lg shadow-[#6366f1]/25"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </motion.button>

            <p className="text-center text-[#71717a] text-sm mt-4">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin((l) => !l)}
                className="text-[#818cf8] hover:text-[#6366f1] font-semibold underline transition"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}