import { motion } from 'framer-motion';
import { TypeAnimation } from "react-type-animation"
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
    const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center pt-4 overflow-hidden bg-[#050608]"
        >
            {/* Simple Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>

                            <TypeAnimation
                                sequence={[
                                    "Software Developer",
                                    2000,
                                    "Full Stack Developer",
                                    2000,
                                    "Problem Solver",
                                    2000
                                ]}
                                wrapper="span"
                                speed={40}
                                repeat={Infinity}
                                className="text-[11px] font-bold uppercase tracking-widest text-blue-400"
                            />

                        </div>


                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white mb-6">

                            Hi, I'm <br />

                            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                                Piyush Kumar
                            </span>

                        </h1>


                        <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl mb-10">

                            Computer Science undergraduate passionate about building scalable web applications and solving complex problems.
                            I specialize in modern web technologies and enjoy turning ideas into impactful digital products.

                        </p>


                        <div className="flex flex-wrap items-center gap-6">

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToProjects}
                                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3"
                            >

                                <span>View My Work</span>
                                <FaArrowRight size={14} />

                            </motion.button>


                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="/Piyush_Kumar_CV.pdf"
                                download
                                className="px-8 py-4 border border-white/10 rounded-2xl text-white font-semibold hover:bg-white/5 transition-all"
                            >

                                Download Resume

                            </motion.a>


                            <div className="flex items-center gap-5">

                                <motion.a
                                    whileHover={{ scale: 1.15 }}
                                    href="https://github.com/piyush5621"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                                >
                                    <FaGithub size={20} />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.15 }}
                                    href="https://www.linkedin.com/in/piyushkumar5621/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                                >
                                    <FaLinkedin size={20} />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.15 }}
                                    href="mailto:piyushkk0206@gmail.com"
                                    className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                                >
                                    <FaEnvelope size={20} />
                                </motion.a>

                            </div>

                        </div>

                    </motion.div>

                    {/* Right: Static Full-Color Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 w-full max-w-[480px] ml-auto aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 border border-white/5">
                            <img
                                src="/images/ppp.JPG"
                                alt="Piyush Kumar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Static Frame */}
                        <div className="absolute -top-8 -right-8 w-full h-full border border-white/5 rounded-[3.5rem] -z-10"></div>

                        <div className="absolute -bottom-6 -left-6 px-10 py-5 bg-slate-900 border border-white/10 rounded-2xl z-20 shadow-2xl">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-white">3+</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Years Active</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;