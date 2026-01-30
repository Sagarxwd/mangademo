import { MangaCard } from './MangaCard';

export function MoreManga({ mangaList }) {
  if (!mangaList || mangaList.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {mangaList.map((manga, index) => (
        <MangaCard 
          key={manga.id || index} 
          manga={manga} 
          index={index} 
        />
      ))}
    </div>
  );
}