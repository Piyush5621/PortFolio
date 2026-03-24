import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LeetCodeHeatmap = ({ activityData }) => {
    const scrollRef = useRef(null);

    // Auto-scroll to show most recent activity
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [activityData]);

    const heatmapData = useMemo(() => {
        if (!activityData || !activityData.activityData) return [];
        return activityData.activityData;
    }, [activityData]);

    const { weeks, monthLabels } = useMemo(() => {
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const dataMap = new Map();
        heatmapData.forEach(d => dataMap.set(d.date, d));

        // Start from the Sunday of the week containing oneYearAgo
        const start = new Date(oneYearAgo);
        start.setDate(start.getDate() - start.getDay());

        const grid = [];
        const labels = [];
        let cursor = new Date(start);
        let currentMonth = -1;

        for (let w = 0; w < 53; w++) {
            const week = [];
            for (let d = 0; d < 7; d++) {
                const dateStr = cursor.toISOString().split('T')[0];
                const dayData = dataMap.get(dateStr);

                week.push({
                    date: dateStr,
                    count: dayData?.count || 0,
                    level: dayData?.level || 0,
                    isInRange: cursor >= oneYearAgo && cursor <= today
                });

                if (cursor.getDate() === 1 || (w === 0 && d === 0)) {
                    const month = cursor.getMonth();
                    if (month !== currentMonth) {
                        labels.push({ weekIndex: w, name: cursor.toLocaleString('default', { month: 'short' }) });
                        currentMonth = month;
                    }
                }
                cursor.setDate(cursor.getDate() + 1);
            }
            grid.push(week);
        }
        return { weeks: grid, monthLabels: labels };
    }, [heatmapData]);

    const getColor = (level) => {
        const colors = ['rgba(255,255,255,0.03)', '#4a3700', '#8a6500', '#c49000', '#E6A700'];
        return colors[level] || colors[0];
    };

    if (!activityData) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white/[0.01] border border-white/5 rounded-sm">
                <div className="w-8 h-8 border-2 border-[#E6A700]/20 border-t-[#E6A700] animate-spin rounded-full mb-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Establishing Link...</p>
            </div>
        );
    }

    if (heatmapData.length === 0 && !activityData.error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white/[0.01] border border-white/5 rounded-sm text-center">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 opacity-50 text-[#E6A700]">No Signal Detected</p>
                <p className="text-xs text-slate-400 max-w-xs font-mono">Profile data could not be retrieved. Ensure your LeetCode profile is public.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full">
                <div ref={scrollRef} className="overflow-x-auto pb-2 custom-scrollbar select-none">
                    <div className="min-w-max pb-5 relative">
                        {/* Month Labels */}
                        <div className="flex mb-1 relative h-4">
                            {monthLabels.map((l, i) => (
                                <div key={i} className="absolute text-[9px] font-mono text-slate-500 uppercase tracking-tighter"
                                    style={{ left: `${l.weekIndex * 15 + 26}px` }}>
                                    {l.name}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {/* Day Headers */}
                            <div className="flex flex-col gap-[4px] pt-1">
                                {['', 'M', '', 'W', '', 'F', ''].map((day, i) => (
                                    <div key={i} className="h-[11px] text-[8px] font-mono text-slate-600 w-4 text-center leading-[11px]">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* The Grid */}
                            <div className="flex gap-[4px]">
                                {weeks.map((week, wi) => (
                                    <div key={wi} className="flex flex-col gap-[4px]">
                                        {week.map((day, di) => (
                                            <div key={`${wi}-${di}`}
                                                className={`w-[11px] h-[11px] rounded-[1.5px] transition-all duration-300 hover:scale-150 relative z-0 hover:z-10 cursor-crosshair ${day.isInRange ? 'opacity-100' : 'opacity-[0.05]'
                                                    }`}
                                                style={{
                                                    backgroundColor: getColor(day.level),
                                                    boxShadow: day.level > 0 ? `0 0 5px ${getColor(day.level)}20` : 'none'
                                                }}
                                                title={`${day.date}: ${day.count} submissions`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend Positioned Bottom Right LIKE GITHUB */}
                        <div className="absolute bottom-0 right-0 flex items-center gap-2 font-mono text-[9px] text-slate-500 mr-2">
                            <span>Less</span>
                            <div className="flex gap-1">
                                {[0, 1, 2, 3, 4].map(l => (
                                    <div key={l} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getColor(l) }} />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LeetCodeHeatmap;