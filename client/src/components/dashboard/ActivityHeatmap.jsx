import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { USERNAMES } from '../../services/statsService';

const ActivityHeatmap = () => {
    const explicitTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#1a3b5c', '#155d8f', '#107fc2', '#0055FF'], // Custom blue theme
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 group hover:border-[#0055FF]/30 transition-colors w-full overflow-x-auto"
        >
            <h4 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest border-b border-white/5 pb-4">Contribution Heatmap</h4>
            <div className="flex justify-center md:block">
                <GitHubCalendar
                    username={USERNAMES.github}
                    colorScheme="dark"
                    theme={explicitTheme}
                    blockSize={12}
                    blockMargin={4}
                    fontSize={10}
                    hideMonthLabels={false}
                />
            </div>
        </motion.div>
    );
};

export default ActivityHeatmap;
