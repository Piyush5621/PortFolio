import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaPython, FaTerminal, FaCodeBranch, FaAward, FaUniversity } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiNextdotjs, SiCplusplus, SiFigma, SiLeetcode, SiHackerrank } from 'react-icons/si';

// --- Interactive Wrapper for Bento Items (Keep your existing logic) ---
const BentoItem = ({ children, className = "", span = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
                ${span} relative overflow-hidden 
                bg-[#0a0a0c] border border-white/5 
                rounded-xl group transition-colors duration-500
                hover:border-[#0055FF]/30 ${className}
            `}
        >
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
                {children}
            </div>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

const About = () => {
    return (
        <section id="about" className="py-32 bg-[#020203] relative overflow-hidden">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0055FF]/20 to-transparent" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0055FF]/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                {/* 1. Enhanced Header */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaCodeBranch className="text-[#0055FF] animate-pulse" />
                            <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">Identity_Manifest</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0055FF] to-[#0033aa]">ENGINEER.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="font-mono text-[10px] text-gray-600 leading-tight uppercase">
                            Architecture // Performance<br/>
                            Interaction // Logic
                        </p>
                    </div>
                </div>

                {/* 2. Advanced Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">

                    {/* Portrait Module */}
                    <BentoItem span="md:col-span-1 md:row-span-2">
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <img 
                                src="/images/Profile.jpg" 
                                alt="Piyush" 
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <p className="text-white font-black text-2xl tracking-tighter leading-none">PIYUSH<br/>KUMAR</p>
                            <span className="text-[10px] font-mono text-[#0055FF] mt-2 block">@fullstack_architect</span>
                        </div>
                    </BentoItem>

                    {/* Bio Module */}
                    <BentoItem span="md:col-span-2 md:row-span-1" className="p-8 flex flex-col justify-center">
                        <FaTerminal className="text-[#0055FF] mb-4 opacity-50 text-xl" />
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            I specialize in <span className="text-white font-medium">scalable backend architectures</span> and high-fidelity frontends. 
                            Currently engineering seamless digital experiences with <span className="text-[#0055FF]">React</span> & <span className="text-[#0055FF]">Java Spring Boot</span>.
                        </p>
                    </BentoItem>

                    {/* Education Module (New) */}
                    <BentoItem span="md:col-span-1 md:row-span-1" className="p-6 flex flex-col justify-between border-l-4 border-l-[#0055FF]">
                        <div className="flex justify-between items-start">
                            <FaUniversity className="text-2xl text-gray-600 group-hover:text-white transition-colors" />
                            <span className="font-mono text-[9px] text-[#0055FF] border border-[#0055FF]/30 px-2 py-1 rounded">2023 - PRESENT</span>
                        </div>
                        <div>
                            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-1">Academia</span>
                            <span className="text-xl font-bold text-white block">B.Tech CSE</span>
                            <span className="text-xs text-gray-400">Lovely Professional University</span>
                            <div className="mt-2 text-[#0055FF] font-mono text-xs">CGPA: 8.00</div>
                        </div>
                    </BentoItem>

                    {/* Algorithmic Mastery (DSA) Module (New) */}
                    <BentoItem span="md:col-span-2 md:row-span-1" className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">// Algorithmic_Core</h4>
                            <SiLeetcode className="text-xl text-[#ffa116] opacity-80" />
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <span className="text-4xl font-black text-white">150+</span>
                                <p className="text-[10px] font-mono text-gray-500 uppercase mt-1">Problems Solved</p>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div>
                                <span className="text-4xl font-black text-white flex items-center gap-1">
                                    3 <span className="text-[#0055FF] text-2xl">★</span>
                                </span>
                                <p className="text-[10px] font-mono text-gray-500 uppercase mt-1">HackerRank Java</p>
                            </div>
                        </div>
                    </BentoItem>

                    {/* Tech Stack Mini-Grid */}
                    <BentoItem span="md:col-span-1 md:row-span-1" className="p-6">
                         <div className="flex justify-between items-center mb-4">
                            <h4 className="font-mono text-[10px] text-gray-500 uppercase">// Stack</h4>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] text-green-500 font-mono">ONLINE</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[FaReact, FaNodeJs, FaJava, FaPython, SiMysql, SiNextdotjs].map((Icon, i) => (
                                <div key={i} className="flex items-center justify-center p-2 bg-white/5 rounded hover:bg-[#0055FF] hover:text-white text-gray-500 transition-all duration-300">
                                    <Icon size={18} />
                                </div>
                            ))}
                        </div>
                    </BentoItem>

                </div>
            </div>
        </section>
    );
};

export default About;