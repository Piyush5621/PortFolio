import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaDocker, FaDatabase, FaCode, FaServer, FaTerminal } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiNextdotjs, SiCplusplus, SiJavascript, SiTypescript, SiExpress, SiMongodb } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Architecture",
      icon: <FaCode className="text-[#0055FF] mb-4 text-2xl" />,
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      ]
    },
    {
      title: "Backend & Systems",
      icon: <FaServer className="text-[#0055FF] mb-4 text-2xl" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Java Spring", icon: <FaJava /> },
        { name: "C++", icon: <SiCplusplus /> },
      ]
    },
    {
      title: "Databases & Tools",
      icon: <FaDatabase className="text-[#0055FF] mb-4 text-2xl" />,
      skills: [
        { name: "MySQL", icon: <SiMysql /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Supabase", icon: <FaDatabase /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-[#050608] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaTerminal className="text-[#0055FF] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">Technical_Arsenal</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              CORE <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0055FF] to-[#0033aa]">SKILLS.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0c] border border-white/5 rounded-xl p-8 hover:border-[#0055FF]/30 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0055FF]/10 to-transparent rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                {category.icon}
                <h3 className="text-xl font-bold text-white mb-8 tracking-tight">{category.title}</h3>
                <div className="flex flex-col gap-5">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="p-2.5 bg-white/5 rounded-lg text-gray-400 group-hover/item:bg-[#0055FF] group-hover/item:text-white transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <div className="flex-1 flex items-center justify-between border-b border-white/5 pb-2 group-hover/item:border-[#0055FF]/30 transition-colors">
                        <span className="text-sm font-medium text-gray-300 group-hover/item:text-white transition-colors">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;