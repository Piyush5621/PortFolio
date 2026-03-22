import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import FlipCard from './FlipCard';

const ContactInput = ({ label, type, name, value, onChange, placeholder }) => (
    <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
        {type === 'textarea' ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all min-h-[160px] resize-none"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />
        )}
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const submissionData = new FormData();
        submissionData.append("access_key", "468b1a79-91f6-4369-b29d-41f66022c280");
        submissionData.append("name", formData.name);
        submissionData.append("email", formData.email);
        submissionData.append("message", formData.message);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submissionData
            });
            const data = await response.json();
            if (data.success) {
                setStatus('sent');
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#3B82F6', '#ffffff'] });
                setTimeout(() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }, 3000);
            } else {
                setStatus('idle');
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus('idle');
            console.error(error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section id="contact" className="py-32 bg-[#050608] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header Section - Stays at top left as requested */}
                <div className="mb-20">
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 block">Get In Touch</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                        Contact <span className="text-blue-500">Me</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                        I'm always open to new opportunities and projects. If you have a question or 
                        just want to say hello, my inbox is always open.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* SWAP PART: Right part moved to LEFT side here */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="relative">
                            <FlipCard />
                            <div className="absolute -inset-10 bg-blue-600/5 blur-[80px] -z-10 rounded-full" />
                        </div>

                        <div className="space-y-4">
                            <a href="mailto:piyushkk0206@gmail.com" className="flex items-center gap-6 p-6 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-600/10 text-blue-500 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <FaEnvelope size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Direct Message</span>
                                    <span className="text-sm font-bold text-white">piyushkk0206@gmail.com</span>
                                </div>
                            </a>

                            <div className="grid grid-cols-2 gap-4">
                                <a href="https://github.com/piyush5621" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-3xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
                                    <FaGithub size={22} className="group-hover:scale-110 transition-transform" /> 
                                    <span className="text-[9px] font-bold uppercase tracking-widest">GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/piyushkumar5621/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-3xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
                                    <FaLinkedin size={22} className="group-hover:scale-110 transition-transform" /> 
                                    <span className="text-[9px] font-bold uppercase tracking-widest">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* SWAP PART: Left part (Form) moved to RIGHT side here */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-slate-900/40 border border-white/5 p-8 md:p-14 rounded-[3.5rem] shadow-2xl backdrop-blur-md relative"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <ContactInput label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" />
                                <ContactInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
                            </div>
                            <ContactInput label="Message" type="textarea" name="message" value={formData.message} onChange={handleChange} placeholder="How can I help you today?" />

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={status !== 'idle'}
                                    className="w-full py-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {status === 'idle' && (
                                        <><span>Execute Send</span><FaPaperPlane size={14} /></>
                                    )}
                                    {status === 'sending' && <span className="animate-pulse">Uploading Data...</span>}
                                    {status === 'sent' && (
                                        <><span>Transmission Complete</span><FaCheck size={14} /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;