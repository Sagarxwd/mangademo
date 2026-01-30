import { createBrowserRouter, RouterProvider, Outlet, useRouteError, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Explore } from './components/Explore';
import { DetailPage } from './components/DetailPage';
import { ReaderPage } from './components/ReaderPage';
import { Library } from './components/Library';
import { LoginModal } from './components/LoginModal';
import { MoreMangaView } from './components/MoreMangaView';
import { SearchResults } from './components/SearchResults';
import { NotFound } from './components/NotFound';
import { ChevronLeft } from 'lucide-react';
import { fetchMangaDetail, fetchChapters } from './api/mangadex';
import { Footer } from './components/Footer';

// Error Boundary
function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-white">
      <h1 className="text-6xl font-bold text-[#6366f1] mb-4">Oops!</h1>
      <p className="text-xl text-[#a1a1aa] mb-2">Something went wrong</p>
      <p className="text-[#71717a] mb-8 text-center max-w-md">
        {error?.message || "An unexpected error occurred"}
      </p>
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] px-6 py-3 rounded-full transition"
      >
        <ChevronLeft size={20} />
        Go Home
      </button>
    </div>
  );
}

function Layout() {
  const [showLogin, setShowLogin] = useState(false);
  const [query, setQuery] = useState('');
  
  // NEW: Get current location path
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col text-white">
      <Navbar query={query} setQuery={setQuery} setShowLogin={setShowLogin} />
      
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Conditionally Render Footer: Hide on Home Page */}
      {!isHomePage && <Footer />}

      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      <Toaster position="bottom-right" toastOptions={{
          style: { background: '#141414', color: '#fff', border: '1px solid #27272a' }
      }}/>
    </div>
  );
}

// --- LOADERS ---

export async function mangaLoader({ params }) {
  if (!params.mangaId || params.mangaId === 'undefined') {
    throw new Error("Invalid Manga ID provided.");
  }
  try {
    const manga = await fetchMangaDetail(params.mangaId);
    const chaptersData = await fetchChapters(params.mangaId); 
    return { manga, initialChapters: chaptersData.data, totalChaptersCount: chaptersData.total };
  } catch (err) {
    throw new Error("Could not load manga details.");
  }
}

export async function chapterLoader({ params }) {
  if (!params.chapterId || params.chapterId === 'undefined') {
    throw new Error("Invalid Chapter ID.");
  }
  return { 
    mangaId: params.mangaId, 
    chapterId: params.chapterId 
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Hero /> },
      { path: "explore", element: <Explore /> },
      { path: "explore/latest-updates", element: <MoreMangaView /> },
      {
        path: "manga/:mangaId",
        element: <DetailPage />,
        loader: mangaLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: "manga/:mangaId/chapter/:chapterId",
        element: <ReaderPage />,
        loader: chapterLoader,
        errorElement: <ErrorBoundary />
      },
      { path: "library", element: <Library /> },
      { path: "search", element: <SearchResults /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}