import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // The animation sequence takes ~3.5s to feel 'complete'
        const timer = setTimeout(() => setIsLoading(false), 3800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ 
                        x: "100%", 
                        skewX: -5,
                        scaleX: 1.05,
                        transition: { 
                            duration: 0.8, 
                            ease: [0.45, 0, 0.55, 1], // Pulling 'parda' effect
                            delay: 0.05
                        } 
                    }}
                    className="fixed inset-0 z-[100000] bg-[#050608] flex items-center justify-center overflow-hidden origin-left"
                >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    
                    <motion.div 
                        exit={{ x: "20%", opacity: 0, transition: { duration: 0.3 } }}
                        className="flex flex-col items-center justify-center relative z-10 w-full max-w-sm"
                    >
                        
                        <div className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center overflow-visible">
                            
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                                {/* The Bow Arc — With physical recoil */}
                                <motion.path 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    fill="none" 
                                    className="text-slate-600"
                                    initial={{ pathLength: 0, d: "M 60 15 C 90 35 90 65 60 85" }}
                                    animate={{ 
                                        pathLength: 1,
                                        d: [
                                            "M 60 15 C 90 35 90 65 60 85", // Neutral
                                            "M 60 15 C 90 35 90 65 60 85", // Wait
                                            "M 65 25 C 105 35 105 65 65 75", // Deep Flex (Tips move in)
                                            "M 58 12 C 85 35 85 65 58 88",  // Recoil Flash
                                            "M 60 15 C 90 35 90 65 60 85"   // Settle
                                        ]
                                    }}
                                    transition={{ 
                                        pathLength: { duration: 0.8, ease: "easeOut", delay: 1.5 },
                                        d: {
                                            times: [0, 0.4, 0.8, 0.85, 0.95],
                                            duration: 2.2,
                                            ease: "easeInOut",
                                            delay: 1.5
                                        }
                                    }}
                                />

                                {/* The Bow String — With vibration */}
                                <motion.path 
                                    stroke="currentColor"
                                    strokeWidth="0.8"
                                    fill="none"
                                    className="text-slate-500"
                                    initial={{ d: "M 60 15 L 60 50 L 60 85", opacity: 0 }}
                                    animate={{ 
                                        d: [
                                            "M 60 15 L 60 50 L 60 85", // Start
                                            "M 60 15 L 60 50 L 60 85", // Wait
                                            "M 65 25 L 20 50 L 65 75", // Pull back (follows bending tips)
                                            "M 60 15 L 62 50 L 60 85", // Release overshoot
                                            "M 60 15 L 58 50 L 60 85", // Vibration
                                            "M 60 15 L 60 50 L 60 85"  // Settle
                                        ],
                                        opacity: 1
                                    }}
                                    transition={{
                                        times: [0, 0.4, 0.8, 0.85, 0.9, 1],
                                        duration: 2.2,
                                        ease: "easeInOut",
                                        delay: 1.5
                                    }}
                                />

                                {/* The Arrow — Flight synchronized with parda pull */}
                                <motion.g
                                    initial={{ x: 0, opacity: 0 }}
                                    animate={{ 
                                        x: [0, 0, -45, 180], // Shoots PAST the boundary
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        times: [0, 0.4, 0.8, 0.95],
                                        duration: 2.2,
                                        ease: ["linear", "linear", "easeInOut", "circIn"],
                                        delay: 1.5
                                    }}
                                >
                                    <line x1="60" y1="50" x2="10" y2="50" stroke="#E6A700" strokeWidth="2" />
                                    <polygon points="62,50 54,46 56,50 54,54" fill="#E6A700" />
                                </motion.g>

                                {/* Impact Point Flash */}
                                <motion.circle 
                                    cx="95" cy="50" r="1" fill="#E6A700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0, 8, 0] }}
                                    transition={{ duration: 0.3, delay: 3.5 }}
                                />
                            </svg>
                        </div>

                        {/* Text Block */}
                        <motion.div 
                            className="mt-8 flex flex-col items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <motion.span 
                                className="text-2xl md:text-3xl font-black text-white mb-2"
                            >
                                राधे राधे
                            </motion.span>

                            <span className="text-[12px] md:text-sm font-light text-[#E6A700] tracking-widest font-serif text-center px-4 leading-relaxed italic">
                                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
                            </span>
                            <span className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-bold mt-1 text-center max-w-[280px]">
                                Your right is to work only, but never to its fruits.
                            </span>
                            
                            <span className="text-[#E6A700] text-sm md:text-base font-black tracking-[0.2em] font-serif mt-6 border-b border-[#E6A700]/30 pb-1">
                                पीयूष कुमार
                            </span>
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
