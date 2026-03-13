import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodingDashboard from './components/dashboard/CodingDashboard';
import Skills from './components/Skills';

import Education from './components/Education';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import ChatBot from './components/ChatBot';

// Pages
import AllProjects from './pages/AllProjects';
import Now from './pages/Now';
import Lab from './pages/Lab';

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
    <div className="bg-[#050608] min-h-screen text-gray-300 font-sans selection:bg-[#0055FF] selection:text-white relative overflow-x-hidden">

      {/* Cursor removed for performance */}

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <main className="relative pt-12 flex-grow">
                <Hero />
                <div id="problem-solving">
                  <CodingDashboard />
                </div>
                <Skills />
                <Services />
                <Projects />

                <Education />
                <Contact />
              </main>
            </motion.div>
          } />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/now" element={<Now />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </AnimatePresence>

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      <ChatBot />

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}

export default App;