import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { USERNAMES } from "../../services/statsService";
import { getLeetCode, getGithub, getCodeChef, getGFG, getHackerRank, getLeetCodeContests, getLeetCodeActivity } from "../../services/codingApi";
import { SiGithub } from 'react-icons/si';

import ProfileCards from "./ProfileCards";
import ActivityHeatmap from "./ActivityHeatmap";
import LeetCodeHeatmap from "./LeetCodeHeatmap";

/* ─────────────────────────────────────────────────────────
   THE CHAKRA WATERMARK
   Krishna's Sudarshana Chakra — Infinite Logic & Flawless Loops
───────────────────────────────────────────────────────── */
import { useMemo, memo } from "react";

const CyberChakraWatermark = memo(() => (
  <svg className="absolute left-[50%] top-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[1200px] opacity-[0.2] mix-blend-screen animate-spin-slow" viewBox="0 0 800 800" fill="none" aria-hidden="true">
    <circle cx="400" cy="400" r="390" stroke="#E6A700" strokeWidth="1" strokeDasharray="4 12" />
    <circle cx="400" cy="400" r="300" stroke="#E6A700" strokeWidth="2" strokeDasharray="20 40" className="animate-spin-reverse" style={{ transformOrigin: 'center' }} />
    <circle cx="400" cy="400" r="200" stroke="#E6A700" strokeWidth="0.5" />
    {useMemo(() => Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 10 * Math.PI) / 180;
      return <line key={i} x1={400 + 40 * Math.cos(angle)} y1={400 + 40 * Math.sin(angle)} x2={400 + 390 * Math.cos(angle)} y2={400 + 390 * Math.sin(angle)} stroke="#E6A700" strokeWidth="0.5" opacity="0.3" />;
    }), [])}
    <circle cx="400" cy="400" r="10" fill="#E6A700" />
  </svg>
));

const StatCard = ({ children, className = "", title, icon }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
    className={`cyber-panel p-6 md:p-8 flex flex-col h-full hover:border-[#E6A700]/40 transition-all duration-300 group relative overflow-hidden rounded-sm transform-gpu ${className}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(230,167,0,0.1)] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {(title || icon) && (
      <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
        {icon && <div className="text-[#E6A700]">{icon}</div>}
        {title && <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6A700]">{title}</h3>}
      </div>
    )}
    <div className="flex-1 w-full relative z-10">
      {children}
    </div>
  </motion.div>
);

const CodingDashboard = () => {
  const [data, setData] = useState({ leetcode: null, github: null, codechef: null, gfg: null, hackerrank: null, contests: null, leetcodeActivity: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Individual fetchers to update state progressively
      const fetchers = [
        { key: 'leetcode', fn: () => getLeetCode(USERNAMES.leetcode) },
        { key: 'github', fn: () => getGithub(USERNAMES.github) },
        { key: 'codechef', fn: () => getCodeChef(USERNAMES.codechef) },
        { key: 'gfg', fn: () => getGFG(USERNAMES.gfg) },
        { key: 'hackerrank', fn: () => getHackerRank(USERNAMES.hackerrank) },
        { key: 'contests', fn: () => getLeetCodeContests(USERNAMES.leetcode) },
        { key: 'leetcodeActivity', fn: () => getLeetCodeActivity(USERNAMES.leetcode) }
      ];

      fetchers.forEach(async ({ key, fn }) => {
        try {
          const result = await fn();
          setData(prev => ({ ...prev, [key]: result.data }));
        } catch (err) {
          console.error(`Error fetching ${key}:`, err);
        }
      });

      // Initially set loading to false quickly if some data is hit, or after a timeout
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-[var(--bg-cosmic)] flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border border-[#E6A700]/30 border-t-[#E6A700] animate-spin rounded-[1px] mb-6" />
        <p className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-[#E6A700] animate-pulse">Loading Stats...</p>
      </div>
    );
  }

  return (
    <section id="stats" className="py-24 bg-[var(--bg-cosmic)] relative overflow-hidden border-t border-white/5">

      {/* Structural matrix background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(230,167,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,167,0,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <CyberChakraWatermark />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[rgba(230,167,0,0.03)] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/[0.01] backdrop-blur-md mb-8 hover:border-[#E6A700]/30 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6A700] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6A700]"></span>
            </span>
            <span className="text-[10px] font-mono text-slate-300 tracking-[0.2em] uppercase">Coding Stats</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.95]">
            THE <br />
            <span className="text-gold-gradient">ABHYĀSA.</span>
          </h2>

          <p className="text-base font-medium text-slate-400 max-w-xl leading-relaxed border-l border-white/10 pl-5">
            Programming is an infinite cycle of logic — much like the Sudarshana Chakra rotating flawlessly.
            These statistics are pulled in real-time, verifying my algorithmic consistency.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="mb-16">
          <ProfileCards data={data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Activity Heatmap */}
          <StatCard title="Version Control / GitHub" icon={<SiGithub />}>
            <div className="p-4 md:p-8 border border-white/5 rounded-sm bg-white/[0.01] mb-8 overflow-hidden relative">
              <ActivityHeatmap />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Commits", val: data.github?.totalContributions || 0 },
                { label: "Projects", val: data.github?.public_repos || 0 },
                { label: "Stars", val: data.github?.stars || 0 },
                { label: "Followers", val: data.github?.followers || 0 }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col p-4 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden group hover:border-[#E6A700]/30 transition-colors transform-gpu">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 group-hover:bg-[#E6A700] transition-colors" />
                  <span className="text-slate-500 text-[9px] font-mono uppercase tracking-[0.2em] mb-1 group-hover:text-[#E6A700] transition-colors">{stat.label}</span>
                  <span className="text-xl font-bold font-mono text-slate-200 tracking-tight transition-colors">{stat.val}</span>
                </div>
              ))}
            </div>
          </StatCard>

          {/* LeetCode Activity Heatmap */}
          <StatCard title="LeetCode Activity">
            <div className="p-4 md:p-8 border border-white/5 rounded-sm bg-white/[0.01] mb-8 overflow-hidden relative min-h-[250px] flex items-center">
              <LeetCodeHeatmap activityData={data.leetcodeActivity} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Streak", val: `${data.leetcodeActivity?.streak || 0}d` },
                { label: "Active Days", val: data.leetcodeActivity?.activeDays || 0 },
                { label: "Solved", val: data.leetcode?.totalSolved || 0 },
                { label: "Submissions", val: data.leetcodeActivity?.totalSubmissions || 0 }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col p-4 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden group hover:border-[#E6A700]/30 transition-colors transform-gpu">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 group-hover:bg-[#E6A700] transition-colors" />
                  <span className="text-slate-500 text-[9px] font-mono uppercase tracking-[0.2em] mb-1 group-hover:text-[#E6A700] transition-colors">{stat.label}</span>
                  <span className="text-xl font-bold font-mono text-slate-200 tracking-tight transition-colors">{stat.val}</span>
                </div>
              ))}
            </div>
          </StatCard>
        </div>
      </div>
    </section>
  );
};

export default CodingDashboard;