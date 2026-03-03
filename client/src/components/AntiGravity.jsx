import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const floatingSkills = [
    { text: "Java", size: "text-4xl", speed: 2 },
    { text: "C++", size: "text-3xl", speed: 3 },
    { text: "JavaScript", size: "text-5xl", speed: 1.5 },
    { text: "PHP", size: "text-2xl", speed: 4 },
    { text: "React", size: "text-4xl", speed: 2.2 },
    { text: "Tailwind CSS", size: "text-xl", speed: 2.8 },
    { text: "Express.js", size: "text-2xl", speed: 3.5 },
    { text: "MySQL", size: "text-3xl", speed: 2.5 },
    { text: "Git", size: "text-xl", speed: 3 },
    { text: "Supabase", size: "text-2xl", speed: 2.1 },
    { text: "Node.js", size: "text-4xl", speed: 2.3 },
    { text: "Next.js", size: "text-3xl", speed: 2.7 }
];

const AntiGravity = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        // Distribute elements somewhat evenly to avoid clumping, then drift
        const newPositions = floatingSkills.map(() => ({
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
            xDrift: (Math.random() - 0.5) * 80, // drift amount
            yDrift: (Math.random() - 0.5) * 80
        }));
        setPositions(newPositions);
    }, []);

    if (positions.length === 0) return null;

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-xl border border-white/5 bg-[#050608] self-center my-12 group perspective-1000">
            {/* Ambient Base Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#0055FF]/10 blur-[120px] pointer-events-none z-0 transition-opacity duration-700 group-hover:opacity-60" />

            {/* Scanline Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

            {floatingSkills.map((skill, index) => {
                const pos = positions[index];
                return (
                    <motion.div
                        key={index}
                        initial={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            x: "-50%",
                            y: "-50%",
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{
                            x: ["-50%", `calc(-50% + ${pos.xDrift * skill.speed}px)`, "-50%"],
                            y: ["-50%", `calc(-50% + ${pos.yDrift * skill.speed}px)`, "-50%"],
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            x: {
                                duration: 25 / skill.speed,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            },
                            y: {
                                duration: 22 / skill.speed,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            },
                            opacity: { duration: 1 },
                            scale: { duration: 1 }
                        }}
                        className={`absolute font-mono font-bold tracking-tighter text-gray-600 transition-colors duration-300 cursor-crosshair z-10 ${skill.size} hover:text-[#0055FF]`}
                        style={{
                            userSelect: 'none',
                            willChange: 'transform',
                            textShadow: '0 0 10px rgba(255,255,255,0.05)'
                        }}
                        whileHover={{
                            scale: 1.15,
                            zIndex: 50,
                            textShadow: '0 0 25px rgba(0,85,255,0.8)'
                        }}
                    >
                        {/* Blur effect achieved via CSS pseudo-element for better performance without actual filter recalculation on hover if possible, 
                            but for specific hover behavior let's use tailwind classes on the span */}
                        <span className="block blur-[1.5px] group-hover:blur-[2px] transition-all duration-300 hover:!blur-none">
                            {skill.text}
                        </span>
                    </motion.div>
                );
            })}

            {/* System Status HUD Element */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none font-mono text-[10px] text-gray-500 flex flex-col gap-1 opacity-50">
                <div className="flex gap-2 items-center">
                    <span className="block w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]"></span>
                    SYS_MODULE: ANTI_GRAVITY_CLOUD
                </div>
                <div>RENDERING: WEBGL_NATIVE // TRANSLATE3D ACTIVATED</div>
                <div>ZERO_LAG_PROTOCOL: ENGAGED</div>
            </div>
        </div>
    );
};

export default AntiGravity;
