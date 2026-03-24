import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Eagerly import tiny/critical components
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import CommandPalette from './components/CommandPalette';

// Lazy-load sections
const Hero             = lazy(() => import('./components/Hero'));
const CodingDashboard  = lazy(() => import('./components/dashboard/CodingDashboard'));
const Skills           = lazy(() => import('./components/Skills'));
const Education        = lazy(() => import('./components/Education'));
const Projects         = lazy(() => import('./components/Projects'));
const Services         = lazy(() => import('./components/Services'));
const Contact          = lazy(() => import('./components/Contact'));
const ChatBot          = lazy(() => import('./components/ChatBot'));

// Pages
const AllProjects = lazy(() => import('./pages/AllProjects'));
const Now         = lazy(() => import('./pages/Now'));
const Lab         = lazy(() => import('./pages/Lab'));
const Resume      = lazy(() => import('./pages/Resume'));

// Simplified reveal — Opacity only for buttery smooth performance
const SectionReveal = ({ children }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-150px' }}
    transition={{ duration: 0.6, ease: "linear" }}
  >
    {children}
  </motion.section>
);

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const location = useLocation();

  // Handle scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Command Palette Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };

    const handleCustomToggle = () => setIsCmdOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggleCmdPalette', handleCustomToggle);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggleCmdPalette', handleCustomToggle);
    };
  }, []);

  return (
    <div className="bg-[#050608] min-h-screen text-gray-300 font-sans selection:bg-[#E6A700] selection:text-black relative overflow-x-hidden">

      <Preloader />

      {/* Cursor removed for performance */}

      {location.pathname !== '/resume' && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <main className="relative flex-grow">
                <Suspense fallback={null}>
                  <SectionReveal><div id="home"><Hero /></div></SectionReveal>
                  <SectionReveal><div id="stats"><CodingDashboard /></div></SectionReveal>
                  <SectionReveal><div id="skills"><Skills /></div></SectionReveal>
                  <SectionReveal><div id="services"><Services /></div></SectionReveal>
                  <SectionReveal><div id="projects"><Projects /></div></SectionReveal>
                  <SectionReveal><div id="education"><Education /></div></SectionReveal>
                  <SectionReveal><div id="contact"><Contact /></div></SectionReveal>
                </Suspense>
              </main>
            </motion.div>
          } />

          <Route path="/projects" element={<Suspense fallback={<Preloader />}><AllProjects /></Suspense>} />
          <Route path="/now" element={<Suspense fallback={<Preloader />}><Now /></Suspense>} />
          <Route path="/lab" element={<Suspense fallback={<Preloader />}><Lab /></Suspense>} />
          <Route path="/resume" element={<Suspense fallback={<Preloader />}><Resume /></Suspense>} />
        </Routes>
      </AnimatePresence>

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      {location.pathname !== '/resume' && (
        <Suspense fallback={null}><ChatBot /></Suspense>
      )}

      {/* Noise overlay — pure CSS grain, no external network request */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}

export default App;