import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ProjectArchitectureBackground = () => {
  const nodes = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      duration: Math.random() * 10 + 15,
      delay: i * 2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0E]">
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `linear-gradient(#E6A700 1px, transparent 1px), linear-gradient(90deg, #E6A700 1px, transparent 1px)`,
          backgroundSize: '100px 100px' 
        }} 
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] text-[#E6A700]">
          <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 60 60 C 60 110, 140 110, 140 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="100,20 95,35 105,35" fill="currentColor" />
          <line x1="60" y1="60" x2="60" y2="75" stroke="currentColor" strokeWidth="0.5" />
          <line x1="140" y1="60" x2="140" y2="75" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          initial={{ x: node.left, y: "-10%", opacity: 0 }}
          animate={{ y: "110%", opacity: [0, 0.6, 0] }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "linear",
            delay: node.delay
          }}
          className="absolute w-[2px] h-[2px] bg-[#E6A700] shadow-[0_0_8px_#E6A700]"
        />
      ))}

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0A0E] to-transparent z-10" />
    </div>
  );
};

export default ProjectArchitectureBackground;
