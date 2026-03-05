import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('HOME');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Basic scroll spy logic
            const sections = ['home', 'problem-solving', 'skills', 'services', 'projects', 'experience', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        let name = section.toUpperCase().replace('-', ' ');
                        setActiveSection(name);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#home', short: 'HOME' },
        { name: 'PROBLEM SOLVING', href: '#problem-solving', short: 'STATS' },
        { name: 'SKILLS', href: '#skills', short: 'SKILLS' },
        { name: 'SERVICES', href: '#services', short: 'TECH' },
        { name: 'PROJECTS', href: '#projects', short: 'WORK' },
        { name: 'EXPERIENCE', href: '#experience', short: 'CAREER' },
        { name: 'CONTACT', href: '#contact', short: 'TALK' },
    ];

    return (
        <>
            {/* Window-Fixed Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#0055FF] to-transparent z-[110] shadow-[0_0_15px_#0055FF]"
                style={{ scaleX: useScrollProgress(), transformOrigin: "0%", width: '100%' }}
            />

            <nav className={`fixed left-0 right-0 z-[100] flex justify-center transition-all duration-700 ${scrolled ? 'top-6' : 'top-0'}`}>
                <div className={`flex items-center justify-between w-[95%] max-w-7xl px-8 py-3 transition-all duration-500 rounded-full
                    ${scrolled
                        ? 'bg-[#050608]/70 backdrop-blur-3xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)]'
                        : 'bg-transparent py-10'
                    }`}>

                    {/* Logo Section - Digital Architect Style */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="w-[1.5px] h-6 bg-[#0055FF] group-hover:h-8 transition-all duration-500 shadow-[0_0_10px_#0055FF]" />
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#0055FF] opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <span className="font-heading text-xl font-black tracking-tighter text-white">
                            P<span className="text-gray-500 group-hover:text-[#0055FF] transition-colors">K</span>
                        </span>
                    </a>

                    {/* Desktop Menu - Floating Pill */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 text-[10px] font-mono font-bold tracking-[0.2em] transition-all duration-300 group
                                    ${activeSection === link.name ? 'text-white' : 'text-gray-500 hover:text-[#0055FF]'}`}
                            >
                                <span className="relative z-10 uppercase">
                                    {link.short}
                                </span>
                                {activeSection === link.name && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-[#0055FF] rounded-full shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Action CTA or Search Trigger */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('toggleCmdPalette'))}
                            className="p-2 text-gray-500 hover:text-[#0055FF] transition-colors"
                            title="Search (Cmd+K)"
                        >
                            <FaSearch size={14} />
                        </motion.button>

                        <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

                        <div className="hidden sm:block">
                            <a
                                href="#contact"
                                className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                TALK_
                                <div className="w-1.5 h-1.5 bg-[#0055FF] rounded-full animate-pulse" />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-white border border-white/10 hover:border-[#0055FF] rounded-full transition-all group"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? <FaTimes key="close" /> : <FaBars key="open" />}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            className="fixed inset-0 bg-[#050608]/80 z-[90] flex flex-col justify-center px-8 md:px-12 gap-8"
                        >
                            {/* Digital HUD Background */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,85,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                            {navLinks.map((link, i) => (
                                <motion.a
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={link.name}
                                    href={link.href}
                                    className="font-mono text-4xl md:text-6xl font-black text-gray-800 hover:text-[#0055FF] tracking-tighter flex items-center gap-6 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-xs text-[#0055FF] opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                    <span className="group-hover:translate-x-6 transition-transform duration-500 uppercase">
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

// Custom hook for scroll progress
function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setProgress(currentScrollY / scrollHeight);
            }
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);
    return progress;
}

export default Navbar;