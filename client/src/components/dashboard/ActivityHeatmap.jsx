import React, { useRef, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { USERNAMES } from '../../services/statsService';

const ActivityHeatmap = () => {
    const scrollRef = useRef(null);

    const blueTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#1a3b5c', '#155d8f', '#107fc2', '#0055FF'],
    };

    // Auto-scroll to the right to show recent contributions
    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-transparent group transition-colors w-full"
        >
            <div ref={scrollRef} className="overflow-x-auto select-none custom-scrollbar" style={{ scrollBehavior: 'smooth' }}>
                <div className="flex justify-center md:block min-w-fit pb-2">
                    <GitHubCalendar
                        username={USERNAMES.github}
                        colorScheme="dark"
                        theme={blueTheme}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={9}
                        hideMonthLabels={false}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default ActivityHeatmap;
