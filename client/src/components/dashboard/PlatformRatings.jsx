import { motion } from 'framer-motion';
import { SiLeetcode, SiCodechef, SiGeeksforgeeks, SiHackerrank } from 'react-icons/si';

const RatingRow = ({ platform, rating, rank, icon: Icon, color }) => (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
        <div className="flex items-center gap-3">
            <Icon size={24} style={{ color }} />
            <div>
                <div className="text-sm font-bold text-white">{platform}</div>
                <div className="text-[10px] text-gray-500 uppercase">{rank}</div>
            </div>
        </div>
        <div className="text-xl font-bold font-mono" style={{ color }}>{rating}</div>
    </div>
);

const PlatformRatings = ({ lcData, ccData, gfgData, hrData, contestData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 group hover:border-[#0055FF]/50 transition-colors"
        >
            <h4 className="text-sm font-bold text-[#0055FF] mb-6 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Platform Ratings</h4>
            <div className="space-y-2">
                <RatingRow
                    platform="LeetCode"
                    rating={contestData?.currentRating || lcData?.ranking || 'N/A'}
                    rank={contestData?.currentRating ? "Contest Rating" : "Global Rank"}
                    icon={SiLeetcode}
                    color="#ffa116"
                />
                <RatingRow
                    platform="CodeChef"
                    rating={ccData?.currentRating || 'N/A'}
                    rank={ccData?.stars || 'Stars'}
                    icon={SiCodechef}
                    color="#5B4638"
                />
                <RatingRow
                    platform="GeeksforGeeks"
                    rating={gfgData?.overall_coding_score || 'N/A'}
                    rank="Coding Score"
                    icon={SiGeeksforgeeks}
                    color="#2f8D46"
                />
                <RatingRow
                    platform="HackerRank"
                    rating={hrData?.badges?.length || '0'}
                    rank="Total Badges"
                    icon={SiHackerrank}
                    color="#00EA64"
                />
            </div>
        </motion.div>
    );
};

export default PlatformRatings;
