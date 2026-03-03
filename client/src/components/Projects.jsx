import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../constants'; // Ensure this path is correct
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaDatabase, FaCodeBranch, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

// --- COMPONENT: Hacker Decryption Text Effect ---
const HackerText = ({ text, className }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    const scramble = () => {
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
    };

    return (
        <span onMouseEnter={scramble} className={className}>
            {displayText}
        </span>
    );
};

// --- COMPONENT: 3D Project Image ---
const ProjectImage = ({ url, title }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-white/10 group perspective-1000"
        >
            {/* Image Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${url})` }}
            />

            {/* Digital Overlay / Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0055FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>

            {/* Scanline Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            {/* HUD Overlay Elements */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/20 text-[10px] font-mono text-white">
                    IMG_SRC_001
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
            </div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
const Projects = () => {
    const displayedProjects = projects.slice(0, 3);

    return (
        <section id="projects" className="py-32 bg-[#050608] relative overflow-hidden">

            {/* 1. Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* 2. Floating Ambient Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0055FF] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-[#0055FF]"></span>
                            <span className="text-[#0055FF] font-mono text-xs tracking-widest uppercase">
                                System.Root.Projects
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none">
                            Selected <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Works_</span>
                        </h2>
                    </motion.div>

                    <div className="hidden md:block text-right">
                        <div className="font-mono text-xs text-gray-500 mb-1">Database Status</div>
                        <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            ONLINE // V.2.4.0
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="space-y-40">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`relative grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? 'lg:text-right' : 'lg:text-left'}`}
                        >

                            {/* Connector Line (The "Circuit" connecting image and text) */}
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>

                            {/* Project Visual (Takes up 7 cols) */}
                            <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <ProjectImage url={project.image_url} title={project.title} />
                            </div>

                            {/* Project Details (Takes up 5 cols) */}
                            <div className={`lg:col-span-5 relative ${index % 2 === 1 ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>

                                {/* Floating Glass Card Background for Text */}
                                <div className="absolute inset-0 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-xl -z-10 shadow-2xl"></div>

                                <div className="p-8 lg:py-12 relative overflow-hidden rounded-xl">
                                    {/* Decorative "Caution" Strip */}
                                    <div className={`absolute top-0 w-24 h-1 bg-[#0055FF] ${index % 2 === 1 ? 'right-8' : 'left-8'}`}></div>

                                    {/* Project Number */}
                                    <div className="font-mono text-[10px] text-[#0055FF] mb-4 tracking-[0.2em]">
                                        // PROJECT_0{index + 1}
                                    </div>

                                    {/* Title with Decrypt Effect */}
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight hover:text-[#0055FF] transition-colors cursor-default">
                                        <HackerText text={project.title} />
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-mono">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Chips */}
                                    <div className={`flex flex-wrap gap-2 mb-10 ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                        {project.tech.map(t => (
                                            <div key={t} className="px-3 py-1 bg-white/5 border border-white/5 hover:border-[#0055FF]/50 hover:bg-[#0055FF]/10 transition-colors rounded text-[10px] font-mono text-gray-300 uppercase tracking-wider cursor-help">
                                                {t}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className={`flex items-center gap-6 ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] transition-all">
                                                <FaGithub size={14} />
                                            </div>
                                            <span>Code</span>
                                        </a>
                                        <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] transition-all">
                                                <FaExternalLinkAlt size={12} />
                                            </div>
                                            <span>Demo</span>
                                        </a>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20"></div>
                                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20"></div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* View All / Archive Link */}
                <div className="flex justify-center mt-32">
                    <Link to="/projects">
                        <MagneticButton className="relative group overflow-hidden bg-transparent border border-white/20 px-12 py-4 hover:border-[#0055FF] transition-colors duration-300">
                            <div className="absolute inset-0 w-0 bg-[#0055FF] group-hover:w-full transition-all duration-300 opacity-10"></div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-xs text-white uppercase tracking-[0.2em] z-10">Access Full Archives</span>
                                <FaArrowRight className="text-[#0055FF] group-hover:translate-x-1 transition-transform z-10" />
                            </div>

                            {/* Button Corner Decals */}
                            <div className="absolute top-0 left-0 w-2 h-2 bg-white group-hover:bg-[#0055FF] transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white group-hover:bg-[#0055FF] transition-colors"></div>
                        </MagneticButton>
                    </Link>
                </div>

            </div>

            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
            `}</style>
        </section>
    );
};

export default Projects;