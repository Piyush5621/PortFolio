import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Full Stack', 'Web App', 'DevOps', 'UI/UX'];

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            if (filter === 'All') return true;
            const pCat = p.category ? p.category.toLowerCase() : '';
            const fCat = filter.toLowerCase();
            return pCat.includes(fCat) || p.tech.some(t => t.toLowerCase().includes(fCat));
        });
    }, [filter]);

    return (
        <div className="min-h-screen bg-[#050608] text-gray-300 font-sans pb-32">
            
            {/* Header */}
            <header className="relative pt-32 pb-20 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Complete Works</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
                            My <span className="text-blue-500">Portfolio</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                            A showcase of all my projects, applications, and technical experiments 
                            organized by category and technology.
                        </p>

                        <div className="flex gap-12 mt-12 border-t border-white/5 pt-8">
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Projects</div>
                                <div className="text-3xl font-black text-white">{projects.length}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Currently Viewing</div>
                                <div className="text-3xl font-black text-blue-500">{filteredProjects.length}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Filter Bar */}
            <nav className="sticky top-0 z-40 bg-[#050608]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl border
                                    ${filter === cat 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Grid */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                key={project.id}
                                className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img 
                                        src={project.image_url} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                            {project.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-4">
                                            <a href={project.github_link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                                <FaGithub size={20} />
                                            </a>
                                            <a href={project.project_link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                                <FaExternalLinkAlt size={18} />
                                            </a>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">#{project.id}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* Back to Home Button */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <Link to="/">
                    <motion.div 
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default AllProjects;