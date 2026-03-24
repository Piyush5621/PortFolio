import { motion } from 'framer-motion';
import { useMemo } from 'react';

const BodhiGurukulBackground = () => {
  // Stabilize firefly values to prevent re-calculation on every render
  const fireflies = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      startX: (Math.random() * 100 - 50) + 'vw',
      endX: (Math.random() * 100 - 50) + 'vw',
      scale: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#0A0A0E]">
      <div className="sticky top-0 w-full h-screen flex justify-center items-end overflow-hidden">
        <div className="absolute bottom-[-5%] w-full h-[300px] bg-gradient-to-t from-[#E6A700]/5 to-transparent blur-[100px]" />
        
        <svg 
          className="w-full h-full max-h-[85vh] opacity-[0.12]" 
          viewBox="0 0 1000 1000" 
          fill="none" 
          preserveAspectRatio="xMidYMax meet"
        >
          <g stroke="#E6A700" strokeWidth="2" strokeLinecap="round">
            <motion.path 
              d="M500 1000 C 480 850, 520 750, 500 600" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <motion.path 
              d="M500 650 C 450 600, 300 580, 200 450" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path 
              d="M500 680 C 550 620, 750 600, 850 480" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </g>
        </svg>

        {fireflies.map((f) => (
          <motion.div
            key={f.id}
            initial={{ x: f.startX, y: '100vh', opacity: 0, scale: f.scale }}
            animate={{ y: '-20vh', opacity: [0, 0.6, 0], x: f.endX }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: f.left,
              width: '4px',
              height: '4px',
              backgroundColor: '#E6A700',
              borderRadius: '50%',
              filter: 'blur(2px)',
              boxShadow: '0 0 8px #E6A700'
            }}
          />
        ))}

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0E] to-transparent z-10" />
      </div>
    </div>
  );
};

export default BodhiGurukulBackground;
