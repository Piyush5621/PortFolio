import { motion } from 'framer-motion';
import { FaFire } from 'react-icons/fa';

const StreakCounter = ({ activeDays }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 flex items-center justify-between group hover:border-[#ffa116]/50 transition-colors relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffa116]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10">
                <h4 className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Consistency Tracker</h4>
                <div className="text-3xl font-black text-white flex items-center gap-2">
                    {activeDays || 0} <span className="text-[#ffa116] text-xl">Days</span>
                </div>
                <p className="text-[#ffa116] text-xs font-mono mt-1">Total Active Days</p>
            </div>

            <div className="relative z-10 w-16 h-16 rounded-full bg-[#ffa116]/10 flex items-center justify-center">
                <FaFire className="text-3xl text-[#ffa116] group-hover:scale-125 transition-transform" />
                <FaFire className="absolute text-5xl text-[#ffa116] opacity-30 blur-md group-hover:opacity-60 transition-opacity" />
            </div>
        </motion.div>
    );
};

export default StreakCounter;
