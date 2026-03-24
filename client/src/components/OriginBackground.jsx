import { motion } from 'framer-motion';

const OriginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center lg:justify-start lg:pl-[20%]">

      {/* The Core Singularity (Soft, Gentle Glow) */}
      <div className="absolute w-[400px] h-[400px] bg-[#E6A700] rounded-full blur-[160px] opacity-[0.12]" />
      <div className="absolute w-[150px] h-[150px] bg-white rounded-full blur-[90px] opacity-[0.2]" />

      {/* Cyberpunk Axis Lines (Very faint radar crosshair) */}
      <div className="absolute w-[200vw] h-[1px] bg-gradient-to-r from-transparent via-[#E6A700]/20 to-transparent opacity-30" />
      <div className="absolute h-[200vh] w-[1px] bg-gradient-to-b from-transparent via-[#E6A700]/20 to-transparent opacity-30" />
      
      {/* Inner Slow Pulse (Soft expansion) */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute w-[300px] h-[300px] rounded-full border border-[#E6A700]/30 mix-blend-screen shadow-[0_0_20px_rgba(230,167,0,0.1)]"
      />
      
      {/* Dashed Expanding Ring */}
      <div className="absolute w-[400px] h-[400px] rounded-full border-[1.5px] border-dashed border-[#E6A700]/10 animate-spin-slow" />

      {/* Extreme Outer Ripple (Very Faint) */}
      <div className="absolute w-[600px] h-[600px] rounded-full border-[0.5px] border-[#E6A700]/5" />

    </div>
  );
};

export default OriginBackground;
