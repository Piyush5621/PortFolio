import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaDatabase, FaCode, FaServer } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiNextdotjs, SiCplusplus, SiJavascript, SiExpress, SiMongodb } from 'react-icons/si';

const categoryData = [
    {
        title: "Frontend",
        icon: <FaCode />,
        skills: [
            { name: "React.js", icon: <FaReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
            { name: "JavaScript", icon: <SiJavascript /> },
        ]
    },
    {
        title: "Backend",
        icon: <FaServer />,
        skills: [
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "Express.js", icon: <SiExpress /> },
            { name: "Spring Boot", icon: <FaJava /> },
            { name: "C++", icon: <SiCplusplus /> },
        ]
    },
    {
        title: "Databases & Tools",
        icon: <FaDatabase />,
        skills: [
            { name: "MySQL", icon: <SiMysql /> },
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "Git & GitHub", icon: <FaGitAlt /> },
            { name: "SQL", icon: <FaDatabase /> },
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-[#050608] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="mb-20">
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 block">What I Learned</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Technical Skills</h2>
                    <p className="text-slate-400 max-w-2xl font-medium">
                        I am constantly learning new technologies. Here are the core tools and languages 
                        that I use to build modern software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categoryData.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/40 border border-white/5 rounded-3xl p-10 hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-blue-500 bg-white/5 rounded-2xl mb-8">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-8">{category.title}</h3>
                            <div className="space-y-6">
                                {category.skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {skill.icon}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;