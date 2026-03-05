import { motion } from 'framer-motion';

const TopicBar = ({ topic, value, max, color }) => (
    <div className="mb-4">
        <div className="flex justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-gray-400">{topic}</span>
            <span className="text-white font-bold">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    </div>
);

const TopicAnalysis = ({ lcData }) => {
    // Assuming lcData has these fields or computing from existing data.
    // Replace with real logic if your API provides exact breakdown.
    const topics = [
        { name: "Arrays", value: lcData?.easySolved ? lcData.easySolved + 20 : 150, color: "#0055FF" },
        { name: "HashMap", value: lcData?.easySolved ? lcData.easySolved + 5 : 85, color: "#9333ea" },
        { name: "Dynamic Programming", value: lcData?.mediumSolved ? lcData.mediumSolved + 10 : 65, color: "#ef4444" },
        { name: "Graphs", value: lcData?.hardSolved ? lcData.hardSolved + 15 : 45, color: "#eab308" },
        { name: "Trees", value: lcData?.mediumSolved ? lcData.mediumSolved - 10 : 55, color: "#22c55e" },
        { name: "Linked List", value: lcData?.easySolved ? lcData.easySolved - 10 : 70, color: "#06b6d4" },
    ];

    const maxVal = Math.max(...topics.map(t => t.value));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 group hover:border-[#0055FF]/50 transition-colors"
        >
            <h4 className="text-sm font-bold text-[#0055FF] mb-6 uppercase tracking-[0.2em] border-b border-white/5 pb-4">DSA Topic Analysis</h4>
            <div>
                {topics.map((topic, i) => (
                    <TopicBar key={i} topic={topic.name} value={topic.value} max={maxVal} color={topic.color} />
                ))}
            </div>
        </motion.div>
    );
};

export default TopicAnalysis;
