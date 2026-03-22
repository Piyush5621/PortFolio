import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaExpand, FaCompress, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

// Pointing explicitly to the newly uploaded CV in the images directory
const RESUME_PDF = '/images/Piyush_Kumar_CV.pdf';

const Resume = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className={`bg-[#050608] flex flex-col font-mono selection:bg-[#E6A700] selection:text-black ${fullscreen ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(230,167,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,167,0,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(230,167,0,0.02)] rounded-full blur-[150px] pointer-events-none" />

      {/* ── Custom Top Navigation Bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[rgba(5,6,8,0.95)] backdrop-blur-xl border-b border-white/5"
      >
        <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors group">
          <span className="w-8 h-8 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-[#E6A700]/50 group-hover:text-[#E6A700] transition-colors">
            <FaArrowLeft size={10} />
          </span>
          Return Home
        </Link>

        {/* Title */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#E6A700]">
            <FaFileAlt size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[10px] font-bold leading-none tracking-widest uppercase">Piyush Kumar</span>
            <span className="text-slate-500 text-[8px] uppercase tracking-[0.3em] font-semibold mt-1">Official CV Document</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen(f => !f)}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#E6A700]/30 rounded-sm text-slate-400 hover:text-[#E6A700] text-[9px] font-bold uppercase tracking-widest transition-all"
          >
            {fullscreen ? <FaCompress size={10} /> : <FaExpand size={10} />}
            {fullscreen ? 'EXIT' : 'FULLSCREEN'}
          </button>

          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#E6A700]/30 rounded-sm text-slate-400 hover:text-white text-[9px] font-bold uppercase tracking-widest transition-all"
          >
            <FaExternalLinkAlt size={10} />
            OPEN RAW
          </a>

          <a
            href={RESUME_PDF}
            download="Piyush_Kumar_CV.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-slate-200 border border-transparent rounded-sm text-[9px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <FaDownload size={10} />
            DOWNLOAD
          </a>
        </div>
      </motion.header>

      {/* ── Native PDF Rendering Viewer ── */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`flex-1 flex flex-col items-center justify-center relative z-10 ${fullscreen ? 'p-0' : 'p-6 md:p-12'}`}
      >
        <div
          className={`relative w-full ${fullscreen ? 'max-w-full h-full border-none rounded-none' : 'max-w-5xl h-[80vh] border border-white/10 rounded-sm shadow-2xl'} bg-[#0A0A0E] overflow-hidden transition-all duration-500`}
        >
          {/* Cyber Framing Accents (Hidden in fullscreen) */}
          {!fullscreen && (
            <>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E6A700]/40 pointer-events-none z-20" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E6A700]/40 pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#E6A700]/40 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E6A700]/40 pointer-events-none z-20" />
            </>
          )}

          {/* Secure Object Embed for the Physical PDF */}
          <object
            data={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            className="w-full h-full relative z-10"
            style={{ backgroundColor: '#0A0A0E' }}
          >
            {/* Fallback rendering if the browser natively crushes PDF viewing (e.g. strict mobile browsers) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050608] text-center p-8">
                <FaFileAlt className="text-[#E6A700]/30 mb-4" size={48} />
                <h3 className="text-white font-bold text-lg mb-2">Browser Rendering Unavailable</h3>
                <p className="text-slate-500 text-xs max-w-sm mb-6">
                    Your current browser configuration refuses to natively render PDF elements within standard web borders.
                </p>
                <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="bg-[#E6A700] hover:bg-[#FCD34D] text-black px-6 py-3 rounded-sm text-[10px] font-black tracking-widest uppercase transition-colors">
                    Access File Directly
                </a>
            </div>
          </object>

        </div>
      </motion.main>
    </div>
  );
};

export default Resume;
