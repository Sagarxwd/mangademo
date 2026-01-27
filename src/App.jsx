import { createBrowserRouter, RouterProvider, Outlet, useRouteError } from 'react-router-dom';
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
import { MANGA_LIST } from './data/mangaData';
import { ChevronLeft } from 'lucide-react';

// Error Boundary Component
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
  
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar query={query} setQuery={setQuery} setShowLogin={setShowLogin} />
      <main>
        <Outlet />
      </main>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export function mangaLoader({ params }) {
  const manga = MANGA_LIST.find(m => m.id === params.mangaId);
  if (!manga) throw new Error("Manga not found");
  return { manga };
}

export function chapterLoader({ params }) {
  const manga = MANGA_LIST.find(m => m.id === params.mangaId);
  if (!manga) throw new Error("Manga not found");
  const chapterNumber = parseInt(params.chapterId, 10);
  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > manga.totalChapters) {
    throw new Error(`Invalid chapter. This manga only has ${manga.totalChapters} chapters.`);
  }
  return { manga, chapterNumber };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Hero />
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "explore/latest-updates",
        element: <MoreMangaView />
      },
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
      {
        path: "library",
        element: <Library />
      },
      {
        path: "search",
        element: <SearchResults />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

export { MANGA_LIST };