import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTerminal, FaMicrochip, FaShieldAlt, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const [filter, setFilter] = useState('All');
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsScanning(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const categories = ['All', 'Full Stack', 'Web App', 'DevOps', 'UI/UX'];

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            if (filter === 'All') return true;
            const pCat = p.category ? p.category.toLowerCase() : '';
            const fCat = filter.toLowerCase();
            if (filter === 'DevOps') return p.tech.some(t => ['Docker', 'AWS', 'Kubernetes'].includes(t)) || pCat.includes('devops');
            return pCat.includes(fCat) || p.tech.some(t => t.toLowerCase().includes(fCat));
        });
    }, [filter]);

    return (
        <div className="min-h-screen bg-[#020203] text-gray-300 font-mono selection:bg-[#0055FF] selection:text-white pb-20 overflow-x-hidden">
            
            {/* 1. Global HUD Elements */}
            <div className="fixed inset-0 pointer-events-none border-[1rem] border-[#ffffff02] z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            <div className="fixed top-0 left-0 w-full h-[2px] bg-[#0055FF]/20 z-50 animate-scanline" />

            {/* 2. Enhanced Header */}
            <header className="relative pt-32 pb-20 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 flex flex-col items-end opacity-20">
                    <span className="text-[10px] tracking-widest text-white">LATENCY: 14ms</span>
                    <span className="text-[10px] tracking-widest text-[#0055FF]">STATUS: SECURE</span>
                </div>

                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="px-3 py-1 bg-[#0055FF]/10 border border-[#0055FF]/50 text-[#0055FF] text-[10px] uppercase font-bold tracking-tighter">
                                Archive Access Granted
                            </div>
                            <div className="h-[1px] w-24 bg-white/10" />
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
                            DATA <span className="text-[#0055FF] inline-block animate-pulse">_</span><br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">RESOURCES</span>
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t border-white/5 pt-8">
                            <div>
                                <div className="text-[10px] text-gray-600 uppercase mb-1">Total_Modules</div>
                                <div className="text-2xl font-bold text-white">{projects.length}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-600 uppercase mb-1">Filtered_Results</div>
                                <div className="text-2xl font-bold text-[#0055FF]">{filteredProjects.length}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* 3. High-Tech Filter Bar */}
            <nav className="sticky top-0 z-40 bg-[#020203]/90 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`group relative px-6 py-2 text-[10px] uppercase tracking-widest transition-all
                                        ${filter === cat ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {filter === cat && (
                                        <motion.div 
                                            layoutId="filter-bg"
                                            className="absolute inset-0 bg-[#0055FF] -z-10"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-4 text-white/20">
                            <FaMicrochip />
                            <FaShieldAlt />
                            <FaCode />
                        </div>
                    </div>
                </div>
            </nav>

            {/* 4. Projects Grid */}
            <main className="container mx-auto px-6 py-12">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                key={project.id}
                                className="group relative bg-[#0a0a0c] border border-white/5 hover:border-[#0055FF]/50 transition-all duration-500 rounded-lg overflow-hidden"
                            >
                                {/* Digital Grid Background on Card */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
                                
                                {/* Top Bar */}
                                <div className="flex justify-between items-center p-4 border-b border-white/5 bg-white/[0.02]">
                                    <span className="text-[9px] text-gray-500 tracking-tighter">UNIT_0{project.id}</span>
                                    <div className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                    </div>
                                </div>

                                {/* Project Image Area */}
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-[#0055FF]/10 z-10 group-hover:opacity-0 transition-opacity" />
                                    <img 
                                        src={project.image_url} 
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Tech Badge Overlay */}
                                    <div className="absolute bottom-2 left-2 flex gap-1 z-20">
                                        {project.tech.slice(0, 2).map(t => (
                                            <span key={t} className="text-[8px] bg-black/80 text-white px-2 py-0.5 border border-white/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0055FF] transition-colors uppercase tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Action Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex gap-4">
                                            <a href={project.github_link} className="text-gray-400 hover:text-white transition-colors">
                                                <FaGithub size={16} />
                                            </a>
                                            <a href={project.project_link} className="text-gray-400 hover:text-white transition-colors">
                                                <FaExternalLinkAlt size={14} />
                                            </a>
                                        </div>
                                        <div className="text-[10px] text-[#0055FF] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                            VIEW_LOGS <FaTerminal />
                                        </div>
                                    </div>
                                </div>

                                {/* Card Edge Glow */}
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:shadow-[inset_0_0_20px_rgba(0,85,255,0.1)] transition-shadow" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* 5. Back to Base FAB */}
            <Link to="/" className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-3 bg-[#0055FF] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(0,85,255,0.3)] group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Return to Nexus
                </motion.div>
            </Link>
        </div>
    );
};

export default AllProjects;