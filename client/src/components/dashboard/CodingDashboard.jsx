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
        hackerrank: null,
        contests: null,
        leetcodeActivity: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async (isManualRefresh = false) => {
        try {
            if (isManualRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError(null);

            const [lc, gh, cc, gfg, hr, contests, lcActivity] = await Promise.allSettled([
                getLeetCode(USERNAMES.leetcode),
                getGithub(USERNAMES.github),
                getCodeChef(USERNAMES.codechef),
                getGFG(USERNAMES.gfg),
                getHackerRank(USERNAMES.hackerrank),
                getLeetCodeContests(USERNAMES.leetcode),
                getLeetCodeActivity(USERNAMES.leetcode)
            ]);

            const newData = {
                leetcode: lc.status === 'fulfilled' ? lc.value.data : null,
                github: gh.status === 'fulfilled' ? gh.value.data : null,
                codechef: cc.status === 'fulfilled' ? cc.value.data : null,
                gfg: gfg.status === 'fulfilled' ? gfg.value.data : null,
                hackerrank: hr.status === 'fulfilled' ? hr.value.data : null,
                contests: contests.status === 'fulfilled' ? contests.value.data : null,
                leetcodeActivity: lcActivity.status === 'fulfilled' ? lcActivity.value.data : null
            };

            // Check if any API failed
            const failedAPIs = [];
            if (lc.status === 'rejected') failedAPIs.push('LeetCode');
            if (gh.status === 'rejected') failedAPIs.push('GitHub');
            if (cc.status === 'rejected') failedAPIs.push('CodeChef');
            if (gfg.status === 'rejected') failedAPIs.push('GeeksForGeeks');
            if (hr.status === 'rejected') failedAPIs.push('HackerRank');
            if (lcActivity.status === 'rejected') failedAPIs.push('LeetCode Activity');

            if (failedAPIs.length > 0) {
                setError(`Failed to fetch data from: ${failedAPIs.join(', ')}`);
            }

            setData(newData);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("Failed to fetch coding statistics. Please try again later.");
        } finally {
            setLoading(false);
            setRefreshing(false);
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

    const handleManualRefresh = () => {
        fetchStats(true);
    };

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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-[#0055FF] font-mono text-xs tracking-[0.5em] uppercase mb-4">Real-Time Metrics</p>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Competitive <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Programming_</span>
                            </h2>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <button
                                onClick={handleManualRefresh}
                                disabled={refreshing}
                                className="px-4 py-2 bg-[#0055FF] text-white rounded-lg font-mono text-sm hover:bg-[#0044CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {refreshing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Refreshing...
                                    </>
                                ) : (
                                    <>
                                        <span>🔄</span>
                                        Refresh Data
                                    </>
                                )}
                            </button>
                            {lastUpdated && (
                                <p className="text-gray-400 text-xs font-mono">
                                    Last updated: {lastUpdated.toLocaleTimeString()}
                                </p>
                            )}
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm font-mono">
                                ⚠️ {error}
                            </p>
                        </div>
                    )}
                </div>

                {/* Main 12-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <ProfileCard githubData={data.github} />
                        <StreakCounter 
                            leetcodeActiveDays={data.leetcodeActivity?.activeDays || 0} 
                            githubActiveDays={data.github?.activeDays || 0} 
                        />
                    </div>

                    {/* Center Column (Span 6) */}
                    <div className="lg:col-span-6 space-y-6">
                        <StatsGrid
                            lcData={data.leetcode}
                            ghData={data.github}
                            ccData={data.codechef}
                            gfgData={data.gfg}
                        />
                        <ContestGraph contestData={data.contests} />
                        <ActivityHeatmap />
                    </div>

                    {/* Right Column (Span 3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <PlatformRatings
                            lcData={data.leetcode}
                            ccData={data.codechef}
                            gfgData={data.gfg}
                            hrData={data.hackerrank}
                            contestData={data.contests}
                        />
                        <TopicAnalysis lcData={data.leetcode} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CodingDashboard;