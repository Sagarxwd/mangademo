import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../utils/useDebounce';
import { MoreManga } from './MoreManga';
import { useState, useEffect } from 'react';
import { fetchMangaList } from '../api/mangadex';

export function SearchResults() {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const doSearch = async () => {
      setLoading(true);
      try {
        const data = await fetchMangaList({ title: debouncedQuery, limit: 24 });
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [debouncedQuery]);

  return (
    <div className="px-4 py-20 mt-16 max-w-7xl mx-auto bg-[#0a0a0a] min-h-screen">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-2 bg-[#6366f1]/20 rounded-full">
            <Search className="text-[#6366f1]" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Search Results
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#71717a]"
        >
          {query ? `Results for "${query}"` : 'Enter a search term'}
        </motion.p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
        </div>
      )}

       {!loading && results.length > 0 && (
        <MoreManga mangaList={results} />
      )}
      
      {!loading && results.length === 0 && query && (
        <p className="text-center text-[#71717a]">No results found.</p>
      )}
    </div>
  );
}