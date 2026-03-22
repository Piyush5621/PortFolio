import { motion } from 'framer-motion';
import { skills } from '../constants';
import {
    FaReact, FaNode, FaJava, FaDatabase, FaCode, FaServer, FaTerminal, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaWrench, FaGitAlt, FaGithub
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMysql, SiNextdotjs, SiCplusplus, SiExpress, SiMongodb, SiPostman, SiDocker, SiVercel
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const getIcon = (iconName) => {
    switch (iconName) {
        case 'FaReact': return <FaReact />;
        case 'SiNextdotjs': return <SiNextdotjs />;
        case 'FaJs': return <FaJs />;
        case 'SiTailwindcss': return <SiTailwindcss />;
        case 'FaHtml5': return <FaHtml5 />;
        case 'FaCss3Alt': return <FaCss3Alt />;
        case 'FaNode': return <FaNode />;
        case 'SiExpress': return <SiExpress />;
        case 'FaJava': return <FaJava />;
        case 'FaPhp': return <FaPhp />;
        case 'SiMysql': return <SiMysql />;
        case 'FaDatabase': return <FaDatabase />;
        case 'SiCplusplus': return <SiCplusplus />;
        case 'FaCode': return <FaCode />;
        case 'FaTerminal': return <FaTerminal />;
        case 'FaGitAlt': return <FaGitAlt />;
        case 'FaGithub': return <FaGithub />;
        case 'VscVscode': return <VscVscode />;
        case 'SiPostman': return <SiPostman />;
        case 'SiDocker': return <SiDocker />;
        case 'SiVercel': return <SiVercel />;
        default: return <FaCode />;
    }
};

const categoryData = [
    {
        title: "Frontend Engineering",
        id: "ARCH-01",
        label: "Client Interface",
        icon: <FaCode />,
        items: skills.frontend || []
    },
    {
        title: "Backend Architecture",
        id: "ARCH-02",
        label: "Server Core",
        icon: <FaServer />,
        items: skills.backend || []
    },
    {
        title: "System Programming",
        id: "ARCH-03",
        label: "Logic & Algorithms",
        icon: <FaTerminal />,
        items: skills.programming || []
    },
    {
        title: "Deployment & Tools",
        id: "ARCH-04",
        label: "DevOps Pipeline",
        icon: <FaWrench />,
        items: skills.tools || []
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4
        }
    }
};

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-[var(--bg-cosmic)] border-t border-white/5">

            {/* Matrix Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: 'linear-gradient(rgba(230,167,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,167,0,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[rgba(230,167,0,0.02)] rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 lg:p-4">

                {/* Intro Block */}
                <div className="mb-24 grid lg:grid-cols-2 gap-12 items-end">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[rgba(10,10,14,0.6)] backdrop-blur border border-white/10 rounded-full mb-6 relative cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6A700] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6A700]"></span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-300 tracking-[0.2em] uppercase">Core Tech Stack</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Technical <br />
                            <span className="text-gold-gradient bg-clip-text text-transparent pb-2 block">Foundations.</span>
                        </h2>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="pb-4"
                    >
                        <p className="text-sm font-medium text-slate-400 leading-relaxed border-l-2 border-[#E6A700]/50 pl-5 max-w-lg">
                            An advanced inventory of engineering tooling. I focus on building scalable systems through a rigorous selection of modern frameworks, high-performance languages, and automated DevOps protocols.
                        </p>
                    </motion.div>
                </div>

                {/* Sequentially Animated Tech Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start"
                >
                    {categoryData.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex flex-col h-full group"
                        >
                            {/* Decorative ID & Tag */}
                            <div className="flex items-center justify-between mb-4 px-1">
                                <span className="text-[9px] font-mono font-bold text-[#E6A700] uppercase tracking-[0.3em]">{category.id}</span>
                                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{category.label}</span>
                            </div>

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10 relative overflow-hidden">
                                {/* Glowing accent line */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E6A700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/5 text-[#E6A700] text-xl group-hover:bg-[#E6A700]/10 group-hover:border-[#E6A700]/30 transition-all duration-500">
                                    {category.icon}
                                </div>
                                <h3 className="text-[14px] font-black font-mono text-white tracking-widest uppercase leading-tight group-hover:text-[#E6A700] transition-colors">{category.title}</h3>
                            </div>

                            {/* Sequential List Items */}
                            <div className="flex flex-col gap-1">
                                {category.items.map((skill, sIdx) => (
                                    <motion.div
                                        key={sIdx}
                                        variants={skillVariants}
                                        transition={{ delay: 0.1 * sIdx }}
                                        className="group/skill flex items-center justify-between py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] px-2 -mx-2 rounded-sm transition-all cursor-crosshair"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-slate-500 group-hover/skill:text-[#E6A700] group-hover/skill:scale-110 transition-all text-lg duration-300">
                                                {getIcon(skill.icon)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-mono font-bold tracking-wider text-slate-300 group-hover/skill:text-white uppercase transition-colors">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-800 group-hover/skill:bg-[#E6A700] group-hover/skill:shadow-[0_0_8px_#E6A700] transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Advanced Metrics Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-24 border-t border-white/5 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Total Skill Vectors</span>
                        <span className="text-2xl font-black text-white">{skills.frontend.length + skills.backend.length + skills.programming.length + (skills.tools?.length || 0)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Architecture Sync</span>
                        <span className="text-xs font-bold text-[#E6A700] flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#E6A700] animate-pulse" /> 100% OPERATIONAL
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Global Taxonomy</span>
                        <span className="text-xs font-bold text-white">INDUSTRY STANDARD</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right md:text-left">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Last Indexing</span>
                        <span className="text-xs font-bold text-slate-400 font-mono">2024.03.22</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Skills;