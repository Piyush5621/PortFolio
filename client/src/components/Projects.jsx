import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { projects } from '../constants'; 
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

// --- COMPONENT: Hacker Decryption Text Effect ---
const HackerText = ({ text, className, trigger }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text);
            return;
        }
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(text
                .split("")
                .map((letter, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [trigger, text]);

    return <span className={className}>{displayText}</span>;
};

// --- COMPONENT: Upgraded 3D Project Image ---
const ProjectImage = ({ url, title }) => {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const brightness = useTransform(mouseXSpring, [-0.5, 0.5], ["1.2", "0.8"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                x.set(0); y.set(0);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/10 group cursor-none"
        >
            {/* Image Layer with Smooth Transition */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ 
                    backgroundImage: `url(${url})`,
                    filter: isHovered ? "grayscale(0%) saturate(120%)" : "grayscale(60%) contrast(110%) opacity(0.5)",
                    scale: isHovered ? 1.05 : 1
                }}
            />

            {/* Glass Overlay Scannline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0055FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-scanline"></div>

            {/* HUD Elements that react to 3D movement */}
            <motion.div 
                style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]), y: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]) }}
                className="absolute top-6 left-6 z-20"
            >
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-[#0055FF]/30 text-[10px] font-mono text-white tracking-widest">
                    <span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full animate-pulse" />
                    ENCRYPTED_DATA_01
                </div>
            </motion.div>

            <motion.div 
                style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]) }}
                className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md p-2 rounded border border-white/10 text-[8px] font-mono text-gray-400"
            >
                LAT: 28.6139° N <br /> LONG: 77.2090° E
            </motion.div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
const Projects = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const displayedProjects = projects.slice(0, 3);

    return (
        <section id="projects" className="py-32 bg-[#050608] relative overflow-hidden">
            {/* Professional Background: Moving Grid */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[linear-gradient(rgba(0,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/5 pb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                        <p className="text-[#0055FF] font-mono text-xs tracking-[0.5em] uppercase mb-4">Discovery_Archive</p>
                        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                            Elite <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-[#0055FF]">Prototypes_</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="space-y-48">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`relative grid lg:grid-cols-12 gap-16 items-center ${index % 2 === 1 ? 'lg:text-right' : 'lg:text-left'}`}
                        >
                            <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <ProjectImage url={project.image_url} title={project.title} />
                            </div>

                            <div className={`lg:col-span-5 relative ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="relative p-10 group">
                                    {/* Glass Morphism Card with Animated Border */}
                                    <div className="absolute inset-0 bg-[#0a0a0c]/60 backdrop-blur-2xl rounded-3xl border border-white/10 group-hover:border-[#0055FF]/50 transition-colors duration-500" />
                                    
                                    <div className="relative z-10">
                                        <div className="text-[10px] font-mono text-gray-500 mb-4 tracking-widest uppercase">
                                            Phase_0{index + 1} // {project.tech[0]}
                                        </div>

                                        <h3 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                                            <HackerText text={project.title} trigger={hoveredIndex === index} />
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light italic opacity-80">
                                            "{project.description}"
                                        </p>

                                        <div className={`flex flex-wrap gap-2 mb-10 ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                            {project.tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/60 uppercase tracking-tighter group-hover:border-[#0055FF]/30 transition-all">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={`flex items-center gap-8 ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                            <a href={project.github_link} className="flex items-center gap-2 group/link">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/link:bg-[#0055FF] group-hover/link:border-[#0055FF] transition-all">
                                                    <FaGithub className="text-white text-lg" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover/link:text-white">Source</span>
                                            </a>
                                            <a href={project.project_link} className="flex items-center gap-2 group/link">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/link:bg-white group-hover/link:border-white transition-all">
                                                    <FaExternalLinkAlt className="text-white group-hover/link:text-black text-sm" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover/link:text-white">Live</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;