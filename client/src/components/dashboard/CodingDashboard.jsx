import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { USERNAMES } from "../../services/statsService";
import { 
    getLeetCode, 
    getGithub, 
    getCodeChef, 
    getGFG, 
    getHackerRank, 
    getLeetCodeContests, 
    getLeetCodeActivity 
} from "../../services/codingApi";
import { SiGithub } from 'react-icons/si';

import ProfileCards from "./ProfileCards";
import ActivityHeatmap from "./ActivityHeatmap";
import ContestGraph from "./ContestGraph";

const StatCard = ({ children, className = "", title, icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl flex flex-col h-full hover:border-blue-500/30 transition-all duration-500 ${className}`}
    >
        {(title || icon) && (
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                {icon && <div className="text-blue-500">{icon}</div>}
                {title && <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</h3>}
            </div>
        )}
        <div className="flex-1 w-full">
            {children}
        </div>
    </motion.div>
);

const CodingDashboard = () => {
    const [data, setData] = useState({
        leetcode: null, github: null, codechef: null, gfg: null, hackerrank: null, contests: null, leetcodeActivity: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [lc, gh, cc, gfg, hr, contests, lcActivity] = await Promise.allSettled([
                    getLeetCode(USERNAMES.leetcode),
                    getGithub(USERNAMES.github),
                    getCodeChef(USERNAMES.codechef),
                    getGFG(USERNAMES.gfg),
                    getHackerRank(USERNAMES.hackerrank),
                    getLeetCodeContests(USERNAMES.leetcode),
                    getLeetCodeActivity(USERNAMES.leetcode)
                ]);

                setData({
                    leetcode: lc.status === 'fulfilled' ? lc.value.data : null,
                    github: gh.status === 'fulfilled' ? gh.value.data : null,
                    codechef: cc.status === 'fulfilled' ? cc.value.data : null,
                    gfg: gfg.status === 'fulfilled' ? gfg.value.data : null,
                    hackerrank: hr.status === 'fulfilled' ? hr.value.data : null,
                    contests: contests.status === 'fulfilled' ? contests.value.data : null,
                    leetcodeActivity: lcActivity.status === 'fulfilled' ? lcActivity.value.data : null
                });
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="py-24 bg-[#050608] flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mb-4"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Updating Statistics...</p>
            </div>
        );
    }

    return (
        <section id="stats" className="py-24 bg-[#050608] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="mb-20">
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Coding Numbers</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Coding Profiles</h2>
                    <p className="text-slate-400 max-w-2xl font-medium">
                        I enjoy solving algorithmic problems. Here is my activity across different platforms 
                        and my contribution to open-source software.
                    </p>
                </div>

                {/* Profile Cards Grid (NEW) */}
                <div className="mb-16">
                    <ProfileCards data={data} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    
                    {/* Activity Heatmap */}
                    <StatCard title="GitHub Contributions" icon={<SiGithub />}>
                        <div className="p-4 md:p-8 bg-white/5 rounded-3xl border border-white/5">
                            <ActivityHeatmap />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                            {[
                                { label: "Commits", val: data.github?.totalContributions || 0 },
                                { label: "Projects", val: data.github?.public_repos || 0 },
                                { label: "Stars", val: data.github?.stars || 0 },
                                { label: "Followers", val: data.github?.followers || 0 }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl">
                                    <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">{stat.label}</span>
                                    <span className="text-xl font-bold text-white tracking-tight">{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </StatCard>

                    {/* Contest History */}
                    <StatCard title="Competitive History">
                        <div className="w-full">
                            <ContestGraph contestData={data.contests} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Max Rating</span>
                                <div className="text-xl font-bold text-blue-500">{data.contests?.topRating?.toFixed(0) || '1500'}</div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Global Rank</span>
                                <div className="text-xl font-bold text-white">{data.contests?.globalRank || 'N/A'}</div>
                            </div>
                        </div>
                    </StatCard>
                </div>
            </div>
        </section>
    );
};

export default CodingDashboard;