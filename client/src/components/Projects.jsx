import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../constants'; 
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowRight } from 'react-icons/fa';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const displayedProjects = projects.slice(0, 3);

    return (
        <section id="projects" className="py-24 bg-[#050608] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Simple Header */}
                <div className="mb-20">
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 block">My Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Latest Projects</h2>
                    <p className="text-slate-400 max-w-2xl font-medium">
                        A collection of web applications and software tools I have built. 
                        Each project represents a specific challenge and solution.
                    </p>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h3>
                                <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <span key={i} className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Explore More Button */}
                <div className="mt-16 text-center">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-blue-500/30 transition-all group"
                    >
                        <span>Explore All Projects</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Basic Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-white/10 w-full max-w-4xl rounded-[2rem] relative overflow-hidden flex flex-col md:flex-row shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <FaTimes />
                            </button>

                            <div className="md:w-1/2 bg-black flex items-center">
                                <img
                                    src={selectedProject.image_url}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="md:w-1/2 p-10 flex flex-col">
                                <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 inline-block">Project Detail</span>
                                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-slate-400 text-base font-medium leading-relaxed mb-8">
                                    {selectedProject.description}
                                </p>
                                
                                <div className="mb-10">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Tech Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <a
                                        href={selectedProject.github_link}
                                        target="_blank" rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                                    >
                                        <FaGithub size={16} /> Code
                                    </a>
                                    <a
                                        href={selectedProject.project_link}
                                        target="_blank" rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        Live View <FaExternalLinkAlt size={10} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;