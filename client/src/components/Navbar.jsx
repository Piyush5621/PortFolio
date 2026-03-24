import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────
   THE UNIFIED LOGO 
   Minimalist geometric fusion of the Bow (Curve) & Arrow (Line)
   signifying precision, engineering, and forward momentum.
───────────────────────────────────────────────────────── */
const UnifiedLogo = () => (
    <div className="relative w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm bg-white/[0.02] group-hover:border-[#E6A700]/40 group-hover:bg-[rgba(230,167,0,0.05)] transition-all duration-300 overflow-hidden">
        {/* Hover gold sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E6A700]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <svg viewBox="0 0 64 64" fill="none" className="w-5 h-5 text-slate-300 group-hover:text-[#E6A700] transition-colors relative z-10 block">
            {/* The Bow Curve */}
            <path d="M 20 12 C 40 12 56 28 56 48" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
            {/* The Arrow Base / Code Bracket Hybrid */}
            <path d="M 12 52 L 36 52 M 12 52 L 12 28" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
            {/* The Focus Point */}
            <rect x="22" y="32" width="10" height="10" fill="currentColor" />
        </svg>
    </div>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('HOME');
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        if (!isHome) return;

        const sections = ['home', 'stats', 'skills', 'services', 'projects', 'education', 'contact'];
        const observers = [];

        const observerOptions = {
            rootMargin: "0px 0px -75% 0px", // Trigger when top of section enters 25% from top
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const name = id === 'stats' ? 'PROFILES' : id.toUpperCase();
                    setActiveSection(name);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const handleScrollScrolled = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScrollScrolled);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScrollScrolled);
        };
    }, [isHome]);

    const navLinks = [
        { name: 'HOME', href: '#home' },
        { name: 'PROFILES', href: '#stats' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'SERVICES', href: '#services' },
        { name: 'PROJECTS', href: '#projects' },
        { name: 'EDUCATION', href: '#education' },
        { name: 'CONTACT', href: '#contact' },
    ];

    const handleScrollToSection = (e, name, href) => {
        e.preventDefault();
        setIsOpen(false);
        setActiveSection(name); // Immediate visual feedback
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6 px-4'}`}>
            <div className={`mx-auto max-w-7xl transition-all duration-500 rounded-sm`}>
                <div className={`flex items-center justify-between px-6 py-4 transition-all duration-500 ${
                    scrolled ? 'bg-[rgba(10,10,14,0.85)] backdrop-blur-2xl border border-white/5 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.8)] rounded-sm' : 'bg-transparent border border-transparent shadow-none'
                }`}>
                    
                    {/* Brand Logo */}
                    <a href={isHome ? '#home' : '/'} className="flex items-center gap-3 group">
                        <UnifiedLogo />
                        <span className="font-bold font-mono text-lg tracking-tight text-white group-hover:text-[#E6A700] transition-colors">
                            Piyush.
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {isHome ? navLinks.map((link) => {
                            const isActive = activeSection === link.name;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScrollToSection(e, link.name, link.href)}
                                    className={`px-5 py-2 text-xs font-bold font-mono tracking-widest transition-colors relative group
                                        ${isActive ? 'text-[#E6A700]' : 'text-slate-400 hover:text-white'}
                                    `}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-200 shadow-[0_0_8px_#E6A700]
                                        ${isActive ? 'w-1/2 bg-[#E6A700] opacity-100' : 'w-0 bg-[#E6A700] group-hover:w-1/2 opacity-0 group-hover:opacity-100'}
                                     `} />
                                </a>
                            );
                        }) : (
                            <Link to="/" className="px-5 py-2 text-xs font-bold font-mono tracking-widest text-[#E6A700] hover:text-[#FCD34D] transition-colors">
                                ← RETURN HOME
                            </Link>
                        )}
                    </div>

                    {/* Resume Action */}
                    <Link
                        to="/resume"
                        className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs font-bold font-mono tracking-widest transition-all duration-300 btn-primary text-[#E6A700]"
                    >
                        <FaFileAlt size={14} />
                        VIEW RESUME
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-[#E6A700] border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] active:scale-95 transition-all"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-24 left-4 right-4 bg-[rgba(10,10,14,0.95)] backdrop-blur-xl p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 border border-white/10"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {isHome ? navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScrollToSection(e, link.name, link.href)}
                                    className="text-sm font-mono font-bold tracking-widest text-slate-300 hover:text-[#E6A700] p-3 rounded-sm border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-colors"
                                >
                                    {link.name}
                                </a>
                            )) : (
                                <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-mono font-bold tracking-widest text-[#E6A700] p-3 rounded-sm border border-transparent hover:border-[#E6A700]/30 hover:bg-[rgba(230,167,0,0.05)] transition-colors">
                                    ← RETURN HOME
                                </Link>
                            )}
                            <div className="w-16 h-px bg-white/10 mx-auto my-2" />
                            <Link
                                to="/resume"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-3 text-sm font-mono font-bold tracking-widest text-[#E6A700] p-3 rounded-sm border border-transparent hover:border-[#E6A700]/30 hover:bg-[rgba(230,167,0,0.05)] transition-colors"
                            >
                                <FaFileAlt size={16} />
                                VIEW RESUME
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;