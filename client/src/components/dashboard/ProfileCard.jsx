import { motion } from 'framer-motion';

const ProfileCard = ({ githubData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 text-center relative overflow-hidden group hover:border-[#0055FF]/50 transition-colors"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0055FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#0055FF] to-purple-600 p-1 mb-4 relative z-10 shadow-[0_0_30px_rgba(0,85,255,0.3)]">
                <img
                    src={githubData?.avatar_url || "https://github.com/piyush5621.png"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-black"
                />
            </div>
            <h3 className="text-2xl font-black text-white relative z-10">{githubData?.name || "Piyush Kumar"}</h3>
            <p className="text-[#0055FF] text-sm mb-4 relative z-10 font-mono tracking-widest">@{githubData?.login || "piyush5621"}</p>

            <p className="text-xs text-gray-400 font-mono italic relative z-10 border-t border-white/5 pt-4 mt-2">
                "{githubData?.bio || "Full Stack Developer & Competitive Programmer"}"
            </p>
        </motion.div>
    );
};

export default ProfileCard;
