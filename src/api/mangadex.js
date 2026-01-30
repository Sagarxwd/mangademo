// src/api/mangadex.js

const BASE_URL = 'https://api.mangadex.org';
const UPLOADS_URL = 'https://uploads.mangadex.org';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }
  return response.json();
};

// --- HELPER: CLEAN DESCRIPTION ---
const cleanDescription = (desc) => {
  if (!desc) return "No description available.";
  let clean = desc.split(/---/)[0];
  clean = clean.split(/\*\*Links:/)[0];
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  clean = clean.replace(/[*_]+/g, '');
  return clean.trim();
};

// --- DATA MAPPERS ---
const mapManga = (manga, stats = {}) => {
  if (!manga || !manga.id) return null;

  const coverRel = manga.relationships.find(r => r.type === 'cover_art');
  const coverFileName = coverRel?.attributes?.fileName;
  const coverUrl = coverFileName 
    ? `${UPLOADS_URL}/covers/${manga.id}/${coverFileName}.256.jpg` 
    : 'https://via.placeholder.com/400x600?text=No+Cover';

  // --- SMART TITLE LOGIC (Priority: English -> Alt English -> Any) ---
  let title = manga.attributes.title.en; // 1. Check Primary English

  if (!title) {
    // 2. Check Alternate Titles for English
    const altTitle = manga.attributes.altTitles?.find(t => t.en);
    if (altTitle) {
      title = altTitle.en;
    } else {
      // 3. Fallback: Use the first available title (likely Japanese/Romaji)
      title = Object.values(manga.attributes.title)[0] || 'Unknown Title';
    }
  }
  // -------------------------------------------------------------------
  
  const genre = manga.attributes.tags
    .filter(tag => tag.attributes.group === 'genre' || tag.attributes.group === 'theme')
    .slice(0, 3)
    .map(tag => tag.attributes.name.en)
    .join(', ');

  const rating = stats[manga.id]?.rating?.average 
    ? Math.round(stats[manga.id].rating.average * 10) / 10 
    : 'N/A';

  const rawDescription = manga.attributes.description?.en || Object.values(manga.attributes.description)[0] || '';
  const finalDescription = cleanDescription(rawDescription);

  return {
    id: String(manga.id),
    title: title, // Now English prioritized
    image: coverUrl,
    rating: rating,
    genre: genre || 'Manga',
    status: manga.attributes.status,
    description: finalDescription,
    totalChapters: manga.attributes.lastChapter || '?',
    latestChapterId: manga.attributes.latestUploadedChapter,
    year: manga.attributes.year
  };
};

const fetchChapterBatch = async (mangaId, limit, offset) => {
  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('offset', offset);
  params.append('translatedLanguage[]', 'en'); 
  params.append('order[chapter]', 'desc');
  params.append('includes[]', 'scanlation_group');
  params.append('contentRating[]', 'safe');
  params.append('contentRating[]', 'suggestive');
  params.append('contentRating[]', 'erotica');

  const url = `${BASE_URL}/manga/${mangaId}/feed?${params.toString()}`;
  return await fetchJson(url);
};

export const fetchChapters = async (mangaId) => {
  if (!mangaId || mangaId === 'undefined') return { data: [], total: 0 };

  const limit = 96;
  let offset = 0;
  let allRawChapters = [];
  let total = 0;

  const firstBatch = await fetchChapterBatch(mangaId, limit, offset);
  allRawChapters = [...firstBatch.data];
  total = firstBatch.total;

  if (total > limit) {
    const neededBatches = Math.ceil((total - limit) / limit);
    for (let i = 1; i <= neededBatches; i++) {
      offset = i * limit;
      await new Promise(r => setTimeout(r, 100)); 
      const batch = await fetchChapterBatch(mangaId, limit, offset);
      allRawChapters = [...allRawChapters, ...batch.data];
    }
  }

  const readableChapters = allRawChapters.filter(ch => 
    ch.attributes && 
    !ch.attributes.externalUrl && 
    ch.attributes.pages > 0
  );

  const formattedChapters = readableChapters.map(ch => ({
    id: ch.id,
    number: ch.attributes.chapter,
    title: ch.attributes.title || `Chapter ${ch.attributes.chapter}`,
    lang: ch.attributes.translatedLanguage,
    publishAt: ch.attributes.publishAt,
    group: ch.relationships.find(r => r.type === 'scanlation_group')?.attributes?.name
  }));

  formattedChapters.sort((a, b) => {
    return (parseFloat(b.number) || 0) - (parseFloat(a.number) || 0);
  });

  return {
    data: formattedChapters,
    total: formattedChapters.length
  };
};

export const fetchChapterPages = async (chapterId) => {
  if (!chapterId || chapterId === 'undefined') throw new Error('Invalid Chapter ID');

  const url = `${BASE_URL}/at-home/server/${chapterId}`;
  const data = await fetchJson(url);
  
  const baseUrl = data.baseUrl;
  const hash = data.chapter.hash;
  
  return data.chapter.data.map(fileName => 
    `${baseUrl}/data/${hash}/${fileName}`
  );
};

export const fetchMangaList = async ({ limit = 20, offset = 0, title = '', ids = [], order = {}, status = [] } = {}) => {
  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('offset', offset);
  params.append('includes[]', 'cover_art');
  params.append('contentRating[]', 'safe');
  params.append('contentRating[]', 'suggestive');

  if (title) params.append('title', title);
  if (ids.length) ids.forEach(id => params.append('ids[]', id));
  if (status.length) status.forEach(s => params.append('status[]', s));
  
  Object.keys(order).forEach(key => {
    params.append(`order[${key}]`, order[key]);
  });

  const url = `${BASE_URL}/manga?${params.toString()}`;
  const data = await fetchJson(url);
  
  const validManga = data.data.filter(m => m && m.id);
  const mangaIds = validManga.map(m => m.id);
  const stats = mangaIds.length > 0 ? await fetchStatistics(mangaIds) : {};

  return validManga.map(m => mapManga(m, stats)).filter(Boolean);
};

export const fetchStatistics = async (mangaIds) => {
  if (!mangaIds.length) return {};
  const params = new URLSearchParams();
  mangaIds.forEach(id => params.append('manga[]', id));
  const url = `${BASE_URL}/statistics/manga?${params.toString()}`;
  const data = await fetchJson(url);
  return data.statistics || {};
};

export const fetchMangaDetail = async (mangaId) => {
  if (!mangaId || mangaId === 'undefined') throw new Error('Invalid Manga ID');
  const url = `${BASE_URL}/manga/${mangaId}?includes[]=cover_art&includes[]=author&includes[]=artist`;
  const data = await fetchJson(url);
  const stats = await fetchStatistics([mangaId]);
  return mapManga(data.data, stats);
};