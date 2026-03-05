import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { USERNAMES } from "../../services/statsService";
import {
    getLeetCode,
    getGithub,
    getCodeChef,
    getGFG,
    getHackerRank
} from "../../services/codingApi";

// Child Components
import ProfileCard from "./ProfileCard";
import StatsGrid from "./StatsGrid";
import ActivityHeatmap from "./ActivityHeatmap";
import ContestGraph from "./ContestGraph";
import PlatformRatings from "./PlatformRatings";
import TopicAnalysis from "./TopicAnalysis";
import StreakCounter from "./StreakCounter";

const CodingDashboard = () => {
    const [data, setData] = useState({
        leetcode: null,
        github: null,
        codechef: null,
        gfg: null,
        hackerrank: null
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const [lc, gh, cc, gfg, hr] = await Promise.all([
                getLeetCode(USERNAMES.leetcode),
                getGithub(USERNAMES.github),
                getCodeChef(USERNAMES.codechef),
                getGFG(USERNAMES.gfg),
                getHackerRank(USERNAMES.hackerrank)
            ]);

            setData({
                leetcode: lc.data,
                github: gh.data,
                codechef: cc.data,
                gfg: gfg.data,
                hackerrank: hr.data
            });
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial Fetch
        fetchStats();

        // Auto Refresh every 5 minutes (300,000 ms)
        const interval = setInterval(() => {
            fetchStats();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020203] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-16 h-16 border-4 border-[#0055FF] border-t-transparent rounded-full shadow-[0_0_20px_rgba(0,85,255,0.5)]"
                    />
                    <p className="text-[#0055FF] font-mono tracking-widest text-sm animate-pulse">Establishing Connection...</p>
                </div>
            </div>
        );
    }

    return (
        <section id="problem-solving" className="py-24 bg-[#020203] text-white font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0055FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="mb-16 border-b border-white/5 pb-8">
                    <p className="text-[#0055FF] font-mono text-xs tracking-[0.5em] uppercase mb-4">Real-Time Metrics</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        Competitive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Programming_</span>
                    </h2>
                </div>

                {/* Main 12-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <ProfileCard githubData={data.github} />
                        <StreakCounter activeDays={data.leetcode?.totalSolved ? Math.floor(data.leetcode.totalSolved / 2.5) : 0} />
                    </div>

                    {/* Center Column (Span 6) */}
                    <div className="lg:col-span-6 space-y-6">
                        <StatsGrid
                            lcData={data.leetcode}
                            ghData={data.github}
                            ccData={data.codechef}
                            gfgData={data.gfg}
                        />
                        <ContestGraph />
                        <ActivityHeatmap />
                    </div>

                    {/* Right Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <PlatformRatings
                            lcData={data.leetcode}
                            ccData={data.codechef}
                            gfgData={data.gfg}
                            hrData={data.hackerrank}
                        />
                        <TopicAnalysis lcData={data.leetcode} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CodingDashboard;