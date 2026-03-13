import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('HOME');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = ['home', 'stats', 'skills', 'services', 'projects', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        const name = section === 'stats' ? 'PROFILES' : section.toUpperCase();
                        setActiveSection(name);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#home' },
        { name: 'PROFILES', href: '#stats' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'SERVICES', href: '#services' },
        { name: 'PROJECTS', href: '#projects' },

        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                        P
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-500 transition-colors">Kumar</span>
                </a>

                {/* Desktop Nav */}
                <div className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-slate-900/40 backdrop-blur-xl border border-white/5' : ''}`}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.name;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-white border border-white/10 rounded-xl bg-white/5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-24 left-6 right-6 bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl z-[200]"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-slate-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;