import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobileAlt } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const serviceData = [
    {
        id: "01",
        title: "Frontend Development",
        description: "I build responsive and fast user interfaces using React and modern web tools for a great user experience.",
        tech: ["REACT", "NEXT.JS", "TAILWIND"],
        icon: <FaCode />,
    },
    {
        id: "02",
        title: "Backend Development",
        description: "Creating powerful server-side logic and secure APIs to handle your data and business requirements.",
        tech: ["NODE.JS", "JAVA", "SPRING"],
        icon: <FaServer />,
    },
    {
        id: "03",
        title: "Database Design",
        description: "Setting up and optimizing data storage so that your information is always safe, organized, and fast to access.",
        tech: ["POSTGRES", "REDIS", "SQL"],
        icon: <FaDatabase />,
    },
    {
        id: "04",
        title: "Mobile Optimization",
        description: "Ensuring your web app looks and works perfectly on all devices, from desktop computers to mobile phones.",
        tech: ["RESPONSIVE", "UI/UX", "MOBILE"],
        icon: <FaMobileAlt />,
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-[#050608] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="mb-20">
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 block">What I Do</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Service Area</h2>
                    <p className="text-slate-400 max-w-2xl font-medium">
                        I offer common software development services to help you build your digital products 
                        from the ground up with high quality results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-10 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col"
                        >
                            <div className="w-14 h-14 flex items-center justify-center text-2xl text-slate-500 bg-slate-900 border border-white/5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 mb-8">
                                {service.icon}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-500 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 flex-1">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {service.tech.map(t => (
                                    <span key={t} className="text-[9px] font-bold px-3 py-1 bg-white/5 border border-white/5 text-slate-400 rounded-lg">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
{/* 
                <div className="mt-20 text-center">
                    <a href="#contact" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 inline-flex items-center gap-3">
                        Contact Me
                        <HiArrowRight />
                    </a>
                </div> */}
            </div>
        </section>
    );
};

export default Services;