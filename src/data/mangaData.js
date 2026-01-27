// ============================================================
// MANGA LIST (Main Database)
// ============================================================

export const MANGA_LIST = [
  { id: 'onepiece', title: 'One Piece', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 9.5, genre: 'Adventure, Fantasy', status: 'ongoing', totalChapters: 1089 },
  { id: 'naruto', title: 'Naruto', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop', rating: 9.2, genre: 'Action, Ninja', status: 'completed', totalChapters: 700 },
  { id: 'bleach', title: 'Bleach', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 8.9, genre: 'Supernatural, Shonen', status: 'completed', totalChapters: 686 },
  { id: 'demonslayer', title: 'Demon Slayer', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 9.1, genre: 'Demon, Sword', status: 'completed', totalChapters: 205 },
  { id: 'aot', title: 'Attack on Titan', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 9.3, genre: 'Dark Fantasy, Action', status: 'completed', totalChapters: 139 },
  { id: 'mha', title: 'My Hero Academia', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop', rating: 9.0, genre: 'Superhero, School', status: 'ongoing', totalChapters: 420 },
  { id: 'jjk', title: 'Jujutsu Kaisen', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 9.4, genre: 'Cursed Energy, Action', status: 'ongoing', totalChapters: 271 },
  { id: 'tokyoghoul', title: 'Tokyo Ghoul', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop', rating: 8.8, genre: 'Horror, Psychological', status: 'completed', totalChapters: 144 },
  { id: 'dragonball', title: 'Dragon Ball Z', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 9.0, genre: 'Action, Martial Arts', status: 'completed', totalChapters: 519 },
  { id: 'deathnote', title: 'Death Note', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 9.2, genre: 'Thriller, Psychological', status: 'completed', totalChapters: 108 },
  { id: 'fullmetal', title: 'Fullmetal Alchemist', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 9.5, genre: 'Adventure, Fantasy', status: 'completed', totalChapters: 108 },
  { id: 'hunterxhunter', title: 'Hunter x Hunter', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 9.1, genre: 'Adventure, Fantasy', status: 'ongoing', totalChapters: 401 },
  { id: 'chainsawman', title: 'Chainsaw Man', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 8.7, genre: 'Action, Dark Fantasy', status: 'ongoing', totalChapters: 159 },
  { id: 'blackclover', title: 'Black Clover', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 8.4, genre: 'Action, Magic', status: 'ongoing', totalChapters: 371 },
  { id: 'jujutsukaisen', title: 'Jujutsu Kaisen 0', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop', rating: 8.9, genre: 'Action, Supernatural', status: 'completed', totalChapters: 4 },
  { id: 'mha2', title: 'My Hero Academia: Vigilantes', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop', rating: 8.3, genre: 'Action, Superhero', status: 'completed', totalChapters: 126 },
  { id: 'boruto', title: 'Boruto', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 7.8, genre: 'Action, Ninja', status: 'ongoing', totalChapters: 85 },
  { id: 'gintama', title: 'Gintama', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 8.8, genre: 'Comedy, Action', status: 'completed', totalChapters: 704 },
  { id: 'onepunchman', title: 'One Punch Man', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 8.7, genre: 'Action, Comedy', status: 'ongoing', totalChapters: 200 },
  { id: 'steinsgate', title: 'Steins;Gate', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 9.0, genre: 'Sci-Fi, Thriller', status: 'completed', totalChapters: 23 },
  { id: 'codegeass', title: 'Code Geass', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 9.1, genre: 'Mecha, Thriller', status: 'completed', totalChapters: 20 },
  { id: 'mobpsycho', title: 'Mob Psycho 100', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop', rating: 8.5, genre: 'Action, Supernatural', status: 'completed', totalChapters: 102 },
  { id: 'slime', title: 'That Time I Got Reincarnated as a Slime', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 8.2, genre: 'Isekai, Fantasy', status: 'ongoing', totalChapters: 104 },
  { id: 'overlord', title: 'Overlord', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 8.6, genre: 'Isekai, Fantasy', status: 'ongoing', totalChapters: 75 },
  { id: 'rezero', title: 'Re:Zero', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 8.3, genre: 'Isekai, Psychological', status: 'ongoing', totalChapters: 65 },
  { id: 'shieldhero', title: 'The Rising of the Shield Hero', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 8.0, genre: 'Isekai, Fantasy', status: 'ongoing', totalChapters: 100 },
  { id: 'promisedneverland', title: 'The Promised Neverland', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop', rating: 8.9, genre: 'Thriller, Mystery', status: 'completed', totalChapters: 181 },
  { id: 'fireforce', title: 'Fire Force', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', rating: 8.1, genre: 'Action, Supernatural', status: 'completed', totalChapters: 304 },
  { id: 'drstone', title: 'Dr. Stone', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop', rating: 8.4, genre: 'Adventure, Sci-Fi', status: 'ongoing', totalChapters: 232 },
  { id: 'kaguyasama', title: 'Kaguya-sama: Love is War', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop', rating: 8.6, genre: 'Comedy, Romance', status: 'completed', totalChapters: 281 },
  { id: 'haikyuu', title: 'Haikyuu!!', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop', rating: 9.0, genre: 'Sports, Drama', status: 'completed', totalChapters: 402 },
  { id: 'bokunohero', title: 'Boku no Hero Academia', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop', rating: 9.0, genre: 'Action, Superhero', status: 'ongoing', totalChapters: 420 }
];

// ============================================================
// LATEST UPDATES (Homepage feed)
// ============================================================

export const latestUpdates = [
  { id: 1, mangaId: 'onepiece', title: 'One Piece', latestChapter: 'Ch. 150', genre: 'Fantasy, Action', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 2, mangaId: 'demonslayer', title: 'Demon Slayer', latestChapter: 'Ch. 25', genre: 'Shounen, Adventure', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 3, mangaId: 'jjk', title: 'Jujutsu Kaisen', latestChapter: 'Ch. 55', genre: 'Action, Supernatural', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 4, mangaId: 'naruto', title: 'Naruto', latestChapter: 'Ch. 700', genre: 'Action, Ninja', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 5, mangaId: 'bleach', title: 'Bleach', latestChapter: 'Ch. 686', genre: 'Supernatural, Shonen', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 6, mangaId: 'aot', title: 'Attack on Titan', latestChapter: 'Ch. 139', genre: 'Dark Fantasy, Action', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 7, mangaId: 'mha', title: 'My Hero Academia', latestChapter: 'Ch. 380', genre: 'Superhero, School', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 8, mangaId: 'tokyoghoul', title: 'Tokyo Ghoul', latestChapter: 'Ch. 144', genre: 'Horror, Psychological', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 9, mangaId: 'dragonball', title: 'Dragon Ball Z', latestChapter: 'Ch. 519', genre: 'Action, Martial Arts', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 10, mangaId: 'deathnote', title: 'Death Note', latestChapter: 'Ch. 108', genre: 'Thriller, Psychological', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 11, mangaId: 'fullmetal', title: 'Fullmetal Alchemist', latestChapter: 'Ch. 108', genre: 'Adventure, Fantasy', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 12, mangaId: 'hunterxhunter', title: 'Hunter x Hunter', latestChapter: 'Ch. 390', genre: 'Adventure, Fantasy', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 13, mangaId: 'chainsawman', title: 'Chainsaw Man', latestChapter: 'Ch. 140', genre: 'Action, Dark Fantasy', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 14, mangaId: 'blackclover', title: 'Black Clover', latestChapter: 'Ch. 350', genre: 'Action, Magic', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 15, mangaId: 'jujutsukaisen', title: 'Jujutsu Kaisen 0', latestChapter: 'Ch. 4', genre: 'Action, Supernatural', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 16, mangaId: 'mha2', title: 'My Hero Academia: Vigilantes', latestChapter: 'Ch. 126', genre: 'Action, Superhero', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 17, mangaId: 'boruto', title: 'Boruto', latestChapter: 'Ch. 80', genre: 'Action, Ninja', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 18, mangaId: 'gintama', title: 'Gintama', latestChapter: 'Ch. 704', genre: 'Comedy, Action', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 19, mangaId: 'onepunchman', title: 'One Punch Man', latestChapter: 'Ch. 200', genre: 'Action, Comedy', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 20, mangaId: 'steinsgate', title: 'Steins;Gate', latestChapter: 'Ch. 23', genre: 'Sci-Fi, Thriller', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' }
];

// ============================================================
// MOST VIEWED - DAY (Top 20)
// ============================================================

export const mostViewedDataDay = [
  { id: 1, mangaId: 'onepiece', title: 'One Piece', views: '5.2M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 2, mangaId: 'demonslayer', title: 'Demon Slayer', views: '4.8M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 3, mangaId: 'jjk', title: 'Jujutsu Kaisen', views: '4.5M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 4, mangaId: 'naruto', title: 'Naruto', views: '4.2M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 5, mangaId: 'bleach', title: 'Bleach', views: '3.9M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 6, mangaId: 'aot', title: 'Attack on Titan', views: '3.7M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 7, mangaId: 'mha', title: 'My Hero Academia', views: '3.5M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 8, mangaId: 'tokyoghoul', title: 'Tokyo Ghoul', views: '3.3M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 9, mangaId: 'dragonball', title: 'Dragon Ball Z', views: '3.1M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 10, mangaId: 'deathnote', title: 'Death Note', views: '2.9M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 11, mangaId: 'fullmetal', title: 'Fullmetal Alchemist', views: '2.7M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 12, mangaId: 'hunterxhunter', title: 'Hunter x Hunter', views: '2.5M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 13, mangaId: 'chainsawman', title: 'Chainsaw Man', views: '2.3M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 14, mangaId: 'blackclover', title: 'Black Clover', views: '2.1M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 15, mangaId: 'jujutsukaisen', title: 'Jujutsu Kaisen 0', views: '1.9M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 16, mangaId: 'mha2', title: 'My Hero Academia: Vigilantes', views: '1.7M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 17, mangaId: 'boruto', title: 'Boruto', views: '1.5M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 18, mangaId: 'gintama', title: 'Gintama', views: '1.3M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 19, mangaId: 'onepunchman', title: 'One Punch Man', views: '1.1M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 20, mangaId: 'steinsgate', title: 'Steins;Gate', views: '900K', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' }
];

// ============================================================
// MOST VIEWED - WEEK (Top 20)
// ============================================================

export const mostViewedDataWeek = [
  { id: 1, mangaId: 'onepiece', title: 'One Piece', views: '35M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 2, mangaId: 'demonslayer', title: 'Demon Slayer', views: '32M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 3, mangaId: 'jjk', title: 'Jujutsu Kaisen', views: '29M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 4, mangaId: 'naruto', title: 'Naruto', views: '26M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 5, mangaId: 'bleach', title: 'Bleach', views: '24M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 6, mangaId: 'aot', title: 'Attack on Titan', views: '22M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 7, mangaId: 'mha', title: 'My Hero Academia', views: '20M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 8, mangaId: 'tokyoghoul', title: 'Tokyo Ghoul', views: '18M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 9, mangaId: 'dragonball', title: 'Dragon Ball Z', views: '16M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 10, mangaId: 'deathnote', title: 'Death Note', views: '14M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 11, mangaId: 'fullmetal', title: 'Fullmetal Alchemist', views: '12M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 12, mangaId: 'hunterxhunter', title: 'Hunter x Hunter', views: '10M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 13, mangaId: 'chainsawman', title: 'Chainsaw Man', views: '9M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 14, mangaId: 'blackclover', title: 'Black Clover', views: '8M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 15, mangaId: 'jujutsukaisen', title: 'Jujutsu Kaisen 0', views: '7M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 16, mangaId: 'mha2', title: 'My Hero Academia: Vigilantes', views: '6M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 17, mangaId: 'boruto', title: 'Boruto', views: '5M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 18, mangaId: 'gintama', title: 'Gintama', views: '4M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 19, mangaId: 'onepunchman', title: 'One Punch Man', views: '3M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 20, mangaId: 'steinsgate', title: 'Steins;Gate', views: '2M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' }
];

// ============================================================
// MOST VIEWED - MONTH (Top 20)
// ============================================================

export const mostViewedDataMonth = [
  { id: 1, mangaId: 'onepiece', title: 'One Piece', views: '150M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 2, mangaId: 'demonslayer', title: 'Demon Slayer', views: '140M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 3, mangaId: 'jjk', title: 'Jujutsu Kaisen', views: '130M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 4, mangaId: 'naruto', title: 'Naruto', views: '120M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 5, mangaId: 'bleach', title: 'Bleach', views: '110M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 6, mangaId: 'aot', title: 'Attack on Titan', views: '100M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 7, mangaId: 'mha', title: 'My Hero Academia', views: '90M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 8, mangaId: 'tokyoghoul', title: 'Tokyo Ghoul', views: '80M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 9, mangaId: 'dragonball', title: 'Dragon Ball Z', views: '70M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 10, mangaId: 'deathnote', title: 'Death Note', views: '60M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 11, mangaId: 'fullmetal', title: 'Fullmetal Alchemist', views: '50M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 12, mangaId: 'hunterxhunter', title: 'Hunter x Hunter', views: '40M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 13, mangaId: 'chainsawman', title: 'Chainsaw Man', views: '35M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 14, mangaId: 'blackclover', title: 'Black Clover', views: '30M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' },
  { id: 15, mangaId: 'jujutsukaisen', title: 'Jujutsu Kaisen 0', views: '25M', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=600&fit=crop' },
  { id: 16, mangaId: 'mha2', title: 'My Hero Academia: Vigilantes', views: '20M', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
  { id: 17, mangaId: 'boruto', title: 'Boruto', views: '15M', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop' },
  { id: 18, mangaId: 'gintama', title: 'Gintama', views: '10M', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop' },
  { id: 19, mangaId: 'onepunchman', title: 'One Punch Man', views: '8M', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
  { id: 20, mangaId: 'steinsgate', title: 'Steins;Gate', views: '5M', image: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop' }
];