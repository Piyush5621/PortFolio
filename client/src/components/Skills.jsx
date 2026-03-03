import React from 'react';
import { motion } from 'framer-motion';

const AntiGravity = () => {
  // Data strictly from your CV
  const skills = [
    { name: "Java", size: "text-5xl", x: "10%", y: "20%", duration: 8 },
    { name: "C++", size: "text-4xl", x: "70%", y: "15%", duration: 10 },
    { name: "JavaScript", size: "text-5xl", x: "40%", y: "50%", duration: 7 },
    { name: "PHP", size: "text-3xl", x: "80%", y: "60%", duration: 12 },
    { name: "React", size: "text-6xl", x: "15%", y: "70%", duration: 6 },
    { name: "MySQL", size: "text-4xl", x: "55%", y: "80%", duration: 9 },
    { name: "Tailwind", size: "text-2xl", x: "25%", y: "40%", duration: 11 },
    { name: "Express.js", size: "text-3xl", x: "65%", y: "35%", duration: 8 },
    { name: "Supabase", size: "text-3xl", x: "10%", y: "90%", duration: 13 },
    { name: "Data Structures", size: "text-2xl", x: "85%", y: "10%", duration: 10 },
  ];

  return (
    <div className="relative h-[500px] w-full overflow-hidden cursor-default">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className={`absolute font-black tracking-tighter text-white/20 hover:text-[#0055FF] transition-colors duration-300 pointer-events-auto ${skill.size}`}
          initial={{ x: skill.x, y: skill.y }}
          animate={{
            y: [ "0%", "-20%", "0%"],
            x: [ "0%", "5%", "0%"],
          }}
          transition={{
            duration: skill.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: skill.x, top: skill.y }}
        >
          {skill.name}
          <div className="text-[10px] font-mono opacity-0 group-hover:opacity-100 uppercase tracking-widest block">
            Sector_{index}
          </div>
        </motion.div>
      ))}
      
      {/* Visual Center Piece */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="text-[150px] font-black text-white/[0.02] select-none">PIYUSH</div>
      </div>
    </div>
  );
};

export default AntiGravity;