import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import Loader from './components/Loader';

// Pages
import AllProjects from './pages/AllProjects';
import Now from './pages/Now';
import Lab from './pages/Lab';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const location = useLocation();
  // Handle scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Command Palette Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
    sessionStorage.setItem('appLoaded', 'true');
  };

  return (
    <div className="bg-[#050608] min-h-screen text-gray-300 font-sans selection:bg-[#0055FF] selection:text-white relative overflow-x-hidden">

      {/* Cursor removed for performance */}

      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 3. Fixed: Navbar is now Global (appears on all pages) */}
          <Navbar />

          {/* 4. Upgrade: Refined Search Trigger */}
          <div className="fixed top-6 right-6 z-[110] hidden md:block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCmdOpen(true)}
              className="group flex items-center gap-3 px-3 py-2 bg-[#111]/80 backdrop-blur-md border border-white/10 text-gray-500 hover:text-[#0055FF] hover:border-[#0055FF]/50 transition-all shadow-2xl"
              title="Cmd+K"
            >
              <span className="text-[10px] font-mono tracking-widest hidden group-hover:block">SEARCH_DB</span>
              <FaSearch size={14} />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Hero />
                  <About />
                  <Skills />
                  <Services />
                  <Projects />
                  <Experience />
                  <Contact />
                </motion.div>
              } />

              <Route path="/projects" element={<AllProjects />} />
              <Route path="/now" element={<Now />} />
              <Route path="/lab" element={<Lab />} />
            </Routes>
          </AnimatePresence>

          <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />

          {/* 5. Upgrade: Global Noise Overlay for texture */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </motion.div>
      )}
    </div>
  );
}

export default App;