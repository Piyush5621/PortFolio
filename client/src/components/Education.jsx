import { motion } from 'framer-motion';
import { education, certifications } from '../constants';
import { FaGraduationCap, FaAward, FaExternalLinkAlt } from 'react-icons/fa';

const Education = () => {
  return (
    <section id="education" className="py-24 bg-[#050608] relative overflow-hidden">
      {/* Subtle Background Glow for the Section */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Premium Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-bold text-sm uppercase tracking-[0.2em] mb-4 block"
          >
            My Background
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6"
          >
            Education & Certifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed"
          >
            A comprehensive overview of my academic journey, professional validation, and continuous learning path.
          </motion.p>
        </div>

        {/* Education Timeline */}
        <div className="relative space-y-8">
          {/* Vertical Line for Timeline effect (hidden on mobile) */}
          <div className="hidden md:block absolute left-[3.5rem] top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent" />

          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative group bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row gap-6 md:gap-12 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-500 shadow-lg"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-blue-400 rounded-2xl group-hover:scale-110 group-hover:text-blue-300 group-hover:border-blue-500/30 transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.05)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] z-10">
                <FaGraduationCap size={28} />
              </div>
              
              <div className="flex-1">
                {/* Meta Details */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    {edu.year}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-sm font-semibold text-slate-300 tracking-wide">{edu.institution}</span>
                </div>
                
                {/* Degree & Description */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  {edu.description}
                </p>

                {/* Dynamic Score Display */}
                {edu.score && (
                  <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl">
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Grade / Score:</span>
                    <span className="text-blue-400 font-black text-sm">{edu.score}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Card Grid */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-3">Certifications</h3>
            <p className="text-slate-400 text-base font-medium">Professional validation and technical achievements.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {certifications.map((cert, idx) => (
              <motion.a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 flex flex-col h-full overflow-hidden hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 shadow-lg"
              >
                {/* Soft Glowing Background Effect on Hover */}
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 rounded-2xl mb-8 transition-all duration-500 shadow-md relative z-10">
                  <FaAward size={24} />
                </div>
                
                {/* Avoid fully uppercase titles so longer cert names don't look overwhelming */}
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight tracking-wide relative z-10">
                  {cert.title}
                </h4>
                
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-8 relative z-10">
                  Issued by: <span className="text-slate-300">{cert.issuer}</span>
                </p>
                
                {/* Footer Section anchored to the bottom using flex-col & mt-auto */}
                <div className="mt-auto pt-6 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {cert.date}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-blue-400 transition-colors">
                    <span>View Credential</span>
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                      <FaExternalLinkAlt size={10} />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;