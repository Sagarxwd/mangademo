import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

// Custom Discord Icon Component
const DiscordIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a1 1 0 1 0 2 0 1 1 0 0 1-2 0" />
    <path d="M13 12a1 1 0 1 0 2 0 1 1 0 0 1-2 0" />
    <path d="M18.9 7a12 12 0 0 0-3.5-1.1c-.2.5-.5 1-.7 1.6-1.4-.6-2.9-.9-4.5-.9-1.6 0-3.1.3-4.5.9-.2-.6-.5-1.1-.7-1.6A12 12 0 0 0 5.1 7c-2 2.9-2.6 7.4-1.3 11.4 1.7 1.3 3.4 2.1 5 2.6.4-.5.7-1 1-1.6-1.1-.3-2.2-.7-3.1-1.3.3-.2.5-.4.8-.6 2.1 1 4.4 1.5 6.7 1.5 2.3 0 4.6-.5 6.7-1.5.2.2.5.4.8.6-.9.6-2 1-3.1 1.3.3.5.7 1.1 1 1.6 1.7-.5 3.3-1.3 5-2.6 1.4-4 0.8-8.5-1.2-11.4" />
  </svg>
);

export function Footer() {
  return (
    // Reduced py-12 to py-6
    <footer className="bg-[#141414] border-t border-[#27272a] py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content: Reduced mb-12 to mb-4 and gap-10 to gap-6 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
          
          {/* LEFT SIDE: Logo, Socials */}
          {/* Reduced gap-6 to gap-3 */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="text-xl font-bold text-white tracking-tight">
                Manga<span className="text-[#6366f1]">Shelf</span>
              </span>
            </motion.div>

            {/* Social Icons - Slightly smaller padding */}
            <div className="flex gap-3">
               <a href="https://discord.gg/eyrz89aR" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1f1f1f] rounded-full text-[#a1a1aa] hover:text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors border border-[#27272a] hover:border-[#5865F2]/50">
                 <DiscordIcon size={18} />
               </a>
               <a href="https://www.instagram.com/e_.echoo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1f1f1f] rounded-full text-[#a1a1aa] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors border border-[#27272a] hover:border-[#E1306C]/50">
                 <Instagram size={18} />
               </a>
               <a href="https://www.linkedin.com/in/sagar-kumar-dhan-08bb1233a" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1f1f1f] rounded-full text-[#a1a1aa] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors border border-[#27272a] hover:border-[#0A66C2]/50">
                 <Linkedin size={18} />
               </a>
            </div>
          </div>

          {/* RIGHT SIDE: Disclaimer */}
          <div className="max-w-md text-center md:text-left">
            <p className="text-[#71717a] text-xs leading-relaxed">
              MangaShelf does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
            </p>
          </div>

        </div>

        {/* BOTTOM: Copyright - Reduced pt-8 to pt-4 */}
        <div className="border-t border-[#27272a] pt-4 text-center">
          <p className="text-[#52525b] text-xs">
            &copy; {new Date().getFullYear()} MangaShelf
          </p>
        </div>

      </div>
    </footer>
  );
}