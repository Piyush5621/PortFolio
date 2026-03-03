import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaLayerGroup, FaMicrochip, FaTerminal } from 'react-icons/fa';

// 1. Technical Service Data (Use your CV strengths)
const serviceData = [
    {
        id: "01",
        title: "Full-Stack Architecture",
        description: "Designing end-to-end systems like Anarchy Bay. High-performance React frontends paired with robust Node/Express backends.",
        tech: ["REACT", "NEXT.JS", "EXPRESS"],
        icon: <FaLayerGroup />
    },
    {
        id: "02",
        title: "Backend Engineering",
        description: "Scalable API development and system logic. Expertise in Java Spring Boot and PHP for secure, enterprise-grade data handling.",
        tech: ["JAVA", "SPRING BOOT", "PHP"],
        icon: <FaServer />
    },
    {
        id: "03",
        title: "Database Management",
        description: "Optimized schema design and real-time data sync using MySQL and Supabase. Handling complex 200+ record inventories.",
        tech: ["MYSQL", "SUPABASE", "POSTGRES"],
        icon: <FaDatabase />
    },
    {
        id: "04",
        title: "System Programming",
        description: "Operating system concepts and IPC simulation. Deep understanding of process synchronization and memory management.",
        tech: ["C++", "OS CONCEPTS", "IPC"],
        icon: <FaMicrochip />
    }
];

const Services = () => {
    const [isInitializing, setIsInitializing] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleInitialization = () => {
        setIsInitializing(true);
        setTimeout(() => {
            setIsInitializing(false);
            window.location.href = 'mailto:piyushkk0206@gmail.com?subject=System_Collaboration_Request';
        }, 2000);
    };

    return (
        <section id="services" className="py-32 bg-[#020203] relative overflow-hidden font-mono">
            {/* Background Terminal Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#0055FF 1px, transparent 1px), linear-gradient(90deg, #0055FF 1px, transparent 1px)`, backgroundSize: '50px 50px' }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header: Terminal Style */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-[#0055FF] rounded-full animate-pulse" />
                        <span className="text-[#0055FF] text-[10px] tracking-[0.5em] uppercase">Core_Modules.sys</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055FF] to-white">Services_</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-xl border-l border-[#0055FF]/30 pl-4 uppercase">
                        Deploying scalable digital solutions through advanced logic and architecture.
                    </p>
                </div>

                {/* Services Grid: High-Tech Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
                    {serviceData.map((service, index) => (
                        <div 
                            key={service.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative p-8 border border-white/5 bg-[#0a0a0c] hover:bg-[#0055FF]/5 transition-all duration-300 cursor-crosshair overflow-hidden"
                        >
                            {/* Scanning Line Effect */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0055FF]/20 translate-y-[-100%] group-hover:animate-scan" />
                            
                            <div className="flex justify-between items-start mb-12">
                                <div className="text-2xl text-gray-600 group-hover:text-[#0055FF] transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <span className="text-[10px] text-[#0055FF] opacity-30 group-hover:opacity-100 font-bold">ID_{service.id}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4 tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">
                                {service.title}
                            </h3>
                            
                            <p className="text-gray-500 text-[11px] leading-relaxed mb-6 h-16">
                                {service.description}
                            </p>

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.tech.map(t => (
                                    <span key={t} className="text-[8px] px-2 py-1 bg-white/5 text-gray-400 border border-white/10 group-hover:border-[#0055FF]/30 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-[#0055FF]" />
                        </div>
                    ))}
                </div>

                {/* --- CALL TO ACTION: TERMINAL BUTTON --- */}
                <div className="mt-20 flex flex-col items-center">
                    <div className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 p-1 flex items-center gap-4">
                        <div className="bg-[#0055FF] text-white px-4 py-2 text-[10px] font-bold uppercase">
                            Status
                        </div>
                        <marquee className="text-[10px] text-gray-500 uppercase tracking-widest flex-1">
                             System Ready... Initializing secure handshake... Waiting for project parameters... Connection: STABLE... Location: piyushkk0206@gmail.com
                        </marquee>
                    </div>

                    <button
                        onClick={handleInitialization}
                        disabled={isInitializing}
                        className={`mt-8 w-full max-w-2xl py-6 border transition-all duration-500 flex flex-col items-center justify-center gap-2
                            ${isInitializing 
                                ? "bg-[#0055FF]/20 border-[#0055FF] text-[#0055FF]" 
                                : "bg-transparent border-white/20 text-white hover:border-[#0055FF] hover:bg-[#0055FF]/10"
                            }`}
                    >
                        <span className="text-xs font-black tracking-[0.5em] uppercase">
                            {isInitializing ? "Initializing_System..." : "Start_Collaboration"}
                        </span>
                        
                        {isInitializing ? (
                            <div className="w-48 h-1 bg-white/10 mt-2 overflow-hidden">
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-full h-full bg-[#0055FF]"
                                />
                            </div>
                        ) : (
                            <span className="text-[8px] text-gray-500 uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                Click to execute protocol
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Global Scanning Animation CSS */}
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(400px); opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Services;