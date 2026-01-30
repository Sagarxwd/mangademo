// src/utils/storage.js

// --- LIBRARY (Bookmarks) ---
export const getLibrary = () => {
  return JSON.parse(localStorage.getItem('manga-library') || '[]');
};

export const isInLibrary = (mangaId) => {
  const lib = getLibrary();
  return lib.some(m => m.id === mangaId);
};

export const toggleLibrary = (manga) => {
  const lib = getLibrary();
  const exists = lib.some(m => m.id === manga.id);
  
  let newLib;
  if (exists) {
    newLib = lib.filter(m => m.id !== manga.id);
  } else {
    // Only save essential data to save space
    newLib = [...lib, {
      id: manga.id,
      title: manga.title,
      image: manga.image,
      rating: manga.rating,
      genre: manga.genre
    }];
  }
  
  localStorage.setItem('manga-library', JSON.stringify(newLib));
  return !exists;
};

// --- HISTORY (Reading Progress) ---
export const getHistory = () => {
  return JSON.parse(localStorage.getItem('manga-history') || '[]');
};

export const getMangaHistory = (mangaId) => {
  const history = getHistory();
  return history.find(h => h.mangaId === mangaId);
};

export const saveHistory = (manga, chapterId, chapterNumber) => {
  const history = getHistory();
  const existingIndex = history.findIndex(h => h.mangaId === manga.id);
  
  const entry = {
    mangaId: manga.id,
    title: manga.title,
    image: manga.image,
    chapterId,
    chapterNumber,
    timestamp: new Date().toISOString()
  };

  if (existingIndex !== -1) {
    history[existingIndex] = entry; // Update existing
  } else {
    history.unshift(entry); // Add to top
  }
  
  localStorage.setItem('manga-history', JSON.stringify(history));
};