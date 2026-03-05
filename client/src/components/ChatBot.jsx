import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaTerminal, FaMicrochip } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000';

const TypingIndicator = () => (
    <div className="flex items-end gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0055FF]/20 border border-[#0055FF]/40 flex items-center justify-center">
            <FaMicrochip size={10} className="text-[#0055FF]" />
        </div>
        <div className="bg-[#111]/80 border border-white/10 px-4 py-3 rounded-xl rounded-bl-none">
            <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);

const Message = ({ msg }) => {
    const isBot = msg.role === 'bot';
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold
                ${isBot
                    ? 'bg-[#0055FF]/20 border border-[#0055FF]/40 text-[#0055FF]'
                    : 'bg-white/10 border border-white/20 text-white'
                }`}
            >
                {isBot ? <FaMicrochip size={10} /> : 'U'}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] px-4 py-3 font-mono text-sm leading-relaxed whitespace-pre-wrap
                ${isBot
                    ? 'bg-[#111]/80 border border-white/10 text-gray-300 rounded-xl rounded-bl-none'
                    : 'bg-[#0055FF] text-white rounded-xl rounded-br-none shadow-[0_0_15px_rgba(0,85,255,0.3)]'
                }`}
            >
                {msg.text}
            </div>
        </motion.div>
    );
};

const SUGGESTIONS = [
    "What projects have you built?",
    "What are your core skills?",
    "Tell me about your experience",
    "How can I contact you?",
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: "// SYSTEM INITIALIZED\nHello! I'm Piyush's AI assistant. Ask me anything about his skills, projects, or experience.",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pulse, setPulse] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Pulse FAB when closed to attract attention
    useEffect(() => {
        if (!isOpen) {
            const interval = setInterval(() => setPulse(p => !p), 3000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    const sendMessage = async (text) => {
        const userText = text || input.trim();
        if (!userText || isLoading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                if (errorData.reply) {
                    setMessages(prev => [...prev, { role: 'bot', text: errorData.reply }]);
                    return;
                }
                throw new Error('API error');
            }
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (err) {
            console.error("Chat Error:", err);
            setMessages(prev => [
                ...prev,
                { role: 'bot', text: '// ERROR_CODE: 503\nCommunication link interrupted. Please ensure the backend server is active at port 5000 and check your internet connection.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-[9998]">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="relative"
                        >
                            {/* Pulsing ring */}
                            <span className="absolute inset-0 rounded-full bg-[#0055FF] opacity-30 animate-ping" />
                            <motion.button
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative w-14 h-14 rounded-full bg-[#0055FF] text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,85,255,0.5)] hover:shadow-[0_0_40px_rgba(0,85,255,0.7)] transition-shadow"
                                title="Chat with AI"
                            >
                                <FaRobot size={22} />
                            </motion.button>
                            {/* Tooltip */}
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: pulse ? 1 : 0, x: pulse ? 0 : 10 }}
                                className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#111] border border-[#0055FF]/30 text-white text-xs font-mono px-3 py-1.5 whitespace-nowrap pointer-events-none"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
                            >
                                Ask me anything
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 z-[9999] w-[360px] md:w-[420px] flex flex-col shadow-[0_0_50px_rgba(0,85,255,0.2)]"
                        style={{ maxHeight: 'calc(100vh - 100px)' }}
                    >
                        {/* ── Title bar ── */}
                        <div className="bg-[#0a0a0a] border border-white/10 border-b-0 rounded-t-xl flex items-center gap-3 px-4 py-3">
                            {/* macOS-style dots */}
                            <div className="flex gap-1.5">
                                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex-1 flex items-center gap-2 justify-center">
                                <FaTerminal size={10} className="text-[#0055FF]" />
                                <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
                                    piyush_ai.exe
                                </span>
                            </div>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-600 hover:text-white transition-colors"
                            >
                                <FaTimes size={14} />
                            </motion.button>
                        </div>

                        {/* ── Status bar ── */}
                        <div className="bg-[#050608] border-x border-white/10 px-4 py-1.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] text-gray-600">Gemini AI · Connected</span>
                            <span className="ml-auto font-mono text-[10px] text-gray-700">v1.5-flash</span>
                        </div>

                        {/* ── Messages ── */}
                        <div className="flex-1 overflow-y-auto bg-[#050608]/95 backdrop-blur border-x border-white/10 px-4 py-5 space-y-4"
                            style={{ minHeight: '320px', maxHeight: '400px' }}>
                            {messages.map((msg, i) => (
                                <Message key={i} msg={msg} />
                            ))}
                            {isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── Suggestions ── */}
                        <AnimatePresence>
                            {messages.length <= 1 && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-[#050608]/95 border-x border-white/10 px-4 pb-3 flex flex-wrap gap-2"
                                >
                                    {SUGGESTIONS.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(s)}
                                            className="text-[10px] font-mono text-gray-500 bg-white/5 hover:bg-[#0055FF]/10 hover:text-[#0055FF] border border-white/10 hover:border-[#0055FF]/30 px-3 py-1.5 transition-all duration-200"
                                            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Input bar ── */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-b-xl p-3 flex items-center gap-3">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0055FF] font-mono text-xs pointer-events-none">
                                    &gt;_
                                </span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a query..."
                                    disabled={isLoading}
                                    className="w-full bg-[#111]/80 border border-white/10 focus:border-[#0055FF]/50 text-white font-mono text-xs pl-9 pr-3 py-2.5 outline-none transition-colors placeholder-gray-700 disabled:opacity-50"
                                    style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                                />
                            </div>
                            <motion.button
                                onClick={() => sendMessage()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 flex items-center justify-center bg-[#0055FF] text-white hover:bg-[#0044cc] hover:shadow-[0_0_15px_rgba(0,85,255,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                            >
                                <FaPaperPlane size={13} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
