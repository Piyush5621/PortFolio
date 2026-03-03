import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaCheck, FaMapMarkerAlt, FaTerminal, FaCode } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import confetti from 'canvas-confetti';

// --- UTILITY: Binary Background Rain ---
const BinaryRain = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.03] z-0">
            <div className="flex justify-between text-[10px] font-mono leading-none text-[#0055FF]">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: '100vh', opacity: [0, 1, 0] }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        {Array.from({ length: 30 }).map((_, j) => (
                            <div key={j} className="my-2">{Math.random() > 0.5 ? '1' : '0'}</div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- COMPONENT: Upgraded Holographic Card ---
const HolographicCard = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="perspective-1000 w-full max-w-sm lg:max-w-md mx-auto aspect-[1.58/1] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
            {/* Outer motion.div handles the 3D mouse tilt tracking */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full"
            >
                {/* Inner div handles the smooth 0.6s CSS flip, eliminating animation conflicts */}
                <div
                    className="relative w-full h-full rounded-xl shadow-[0_0_30px_rgba(0,85,255,0.1)]"
                    style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)"
                    }}
                >
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden backface-hidden z-20">
                        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        <motion.div className="absolute w-[300px] h-[300px] bg-[#0055FF] blur-[100px] opacity-20 rounded-full pointer-events-none -z-10" style={{ x, y }} />

                        <div className="flex justify-between items-start z-10">
                            <div className="relative group-hover:scale-105 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 relative z-10">
                                    <img src="/images/Profile.jpg" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div className="absolute -inset-1 bg-[#0055FF] rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-[#0a0a0a] z-20"></div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-[10px] text-[#0055FF] tracking-widest mb-1">ID: DEV_092</div>
                                <div className="flex items-center justify-end gap-2 text-white/60 font-mono text-xs">
                                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <FaMapMarkerAlt className="text-[#0055FF]" />
                                    <span>Phagwara, Punjab</span>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 relative">
                            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Piyush Kumar</h3>
                            <div className="flex items-center gap-2">
                                <span className="h-[1px] w-4 bg-[#0055FF]"></span>
                                <p className="text-[#0055FF] font-mono text-xs uppercase tracking-wider">Full Stack Engineer</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-end z-10 border-t border-white/10 pt-4 mt-2">
                            <FaCode className="text-white/20" />
                            <div className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#0055FF] rounded-full animate-pulse"></span>
                                SECURE_ACCESS
                            </div>
                        </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 bg-[#0055FF] rounded-xl p-8 flex flex-col items-center justify-center backface-hidden border border-white/20" style={{ transform: "rotateY(180deg)" }}>
                        {/* Wrap the content in an anchor tag for direct download */}
                        <a href="/Piyush_Kumar_CV.pdf" download="Piyush_Kumar_CV.pdf" className="flex flex-col items-center group cursor-pointer" onClick={(e) => e.stopPropagation()}>
                            <div className="bg-white p-3 rounded-lg mb-4 shadow-xl transform group-hover:scale-105 transition-transform">
                                <div className="w-24 h-24 bg-black flex items-center justify-center text-white text-[8px] font-mono text-center leading-tight">SCAN_FOR<br />V_CARD</div>
                            </div>
                            <p className="text-white font-bold tracking-wider text-sm group-hover:underline">DOWNLOAD RESUME</p>
                            <p className="text-white/60 text-[10px] font-mono mt-2">ENCRYPTED // V.2.0</p>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- COMPONENT: Refined Terminal Input ---
const TerminalInput = ({ label, type, name, value, onChange, lineNumber, placeholderText }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative mb-8 group">
            <div className="flex items-start gap-4">
                <span className={`font-mono text-sm mt-3 transition-colors duration-300 ${focused ? 'text-[#0055FF]' : 'text-gray-700'}`}>
                    {lineNumber}
                </span>

                <div className="relative w-full">
                    <label className={`absolute left-3 transition-all duration-300 pointer-events-none font-mono text-[11px] uppercase tracking-wider z-20 ${focused || value ? '-top-6 left-0 text-[#0055FF]' : 'top-3 text-gray-600'}`}>
                        {focused || value ? `// ${label}` : label}
                    </label>

                    <div className={`relative transition-all duration-300 ${focused ? 'bg-white/5' : 'bg-transparent'}`}>
                        {type === 'textarea' ? (
                            <textarea
                                name={name}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                required
                                className={`peer w-full bg-transparent border-b border-gray-800 text-white px-3 py-3 focus:outline-none focus:border-[#0055FF] transition-all duration-300 font-mono text-sm resize-none leading-relaxed min-h-[150px] ${focused ? 'placeholder-gray-700/50' : 'placeholder-transparent'}`}
                                placeholder={placeholderText || label}
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                required
                                className={`peer w-full bg-transparent border-b border-gray-800 text-white px-3 py-3 focus:outline-none focus:border-[#0055FF] transition-all duration-300 font-mono text-sm ${focused ? 'placeholder-gray-700/50' : 'placeholder-transparent'}`}
                                placeholder={placeholderText || label}
                            />
                        )}
                        <div className={`absolute bottom-0 left-0 h-[1px] bg-[#0055FF] shadow-[0_0_10px_#0055FF] transition-all duration-500 ${focused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN SECTION ---
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const submissionData = new FormData();
        submissionData.append("access_key", "468b1a79-91f6-4369-b29d-41f66022c280");
        submissionData.append("name", formData.name);
        submissionData.append("email", formData.email);
        submissionData.append("message", formData.message);
        submissionData.append("subject", `New Portfolio Message from ${formData.name}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submissionData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('sent');
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#0055FF', '#ffffff']
                });
                setTimeout(() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                }, 4000);
            } else {
                setStatus('idle');
                alert("Transmission failed.");
            }
        } catch (error) {
            setStatus('idle');
            console.error(error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Ensure the correct email from CV is used here
    const handleCopyEmail = () => {
        navigator.clipboard.writeText('piyushkk0206@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Social links pulled directly from your updated CV
    const socialLinks = [
        { Icon: FaGithub, url: "https://github.com/Piyush5621" },
        { Icon: FaLinkedin, url: "https://www.linkedin.com/in/piyushkumar5621/" },
        { Icon: FaTwitter, url: "#" } // Update this if you have a Twitter/X profile
    ];

    return (
        <section id="contact" className="py-24 md:py-40 bg-[#050608] relative overflow-hidden flex items-center min-h-screen">
            <BinaryRain />
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#0055FF] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="flex flex-col space-y-16">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                            <div className="flex items-center gap-3 text-[#0055FF] font-mono text-sm tracking-widest uppercase">
                                <span className="w-2 h-2 bg-[#0055FF] rounded-full animate-ping"></span>
                                System Status: Online
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tighter">
                                INITIALIZE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">PROTOCOL</span>
                            </h2>
                        </motion.div>
                        <HolographicCard />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
                        <div className="bg-[#1a1a1a] rounded-t-lg border-x border-t border-white/10 p-4 flex items-center gap-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="ml-4 font-mono text-[10px] text-gray-500 flex items-center gap-2">
                                <FaTerminal size={10} />
                                <span>contact_form.exe</span>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-b-lg p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#0055FF]/20 animate-scanline pointer-events-none z-0"></div>

                            <form onSubmit={handleSubmit} className="relative z-10">
                                <div className="grid gap-4">
                                    <TerminalInput lineNumber="01" label="Enter Identity (Name)" type="text" name="name" value={formData.name} onChange={handleChange} />
                                    <TerminalInput lineNumber="02" label="Communication Link (Email)" type="email" name="email" value={formData.email} onChange={handleChange} placeholderText="piyushkk0206@gmail.com" />
                                    <TerminalInput lineNumber="03" label="Transmission Data (Message)" type="textarea" name="message" value={formData.message} onChange={handleChange} />
                                </div>

                                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                                    <div className="hidden md:flex gap-6 text-xs font-mono text-gray-600">
                                        <span>CPU: 12%</span>
                                        <span>RAM: 804MB</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status !== 'idle'}
                                        className="relative px-10 py-4 bg-[#0055FF] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0044cc] hover:shadow-[0_0_20px_rgba(0,85,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
                                        style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {status === 'idle' && (
                                                <><span>Execute Send</span><FaPaperPlane size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                            )}
                                            {status === 'sending' && <span className="animate-pulse">Uploading Data...</span>}
                                            {status === 'sent' && (
                                                <><span>Transmission Complete</span><FaCheck size={12} /></>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
                    <div onClick={handleCopyEmail} className="group flex items-center gap-4 cursor-pointer p-3 px-6 rounded-full border border-white/5 hover:border-[#0055FF]/30 hover:bg-[#0055FF]/5 transition-all duration-300 z-20">
                        <div className="w-10 h-10 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#0055FF]">
                            <FaEnvelope size={16} />
                        </div>
                        <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors">
                            {copied ? 'Copied to Clipboard!' : 'piyushkk0206@gmail.com'}
                        </span>
                    </div>

                    <div className="flex gap-6 z-20">
                        {socialLinks.map(({ Icon, url }, i) => (
                            <a href={url} target="_blank" rel="noopener noreferrer" key={i}>
                                <MagneticButton className="w-12 h-12 flex items-center justify-center rounded-full bg-[#111] border border-white/10 text-gray-400 hover:text-white hover:border-[#0055FF] hover:shadow-[0_0_15px_rgba(0,85,255,0.3)] transition-all duration-300">
                                    <Icon size={20} />
                                </MagneticButton>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .backface-hidden { backface-visibility: hidden; }
                .perspective-1000 { perspective: 1000px; }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(800%); }
                }
                .animate-scanline {
                    animation: scanline 6s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Contact;