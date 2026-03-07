import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaTerminal, FaMicrochip, FaUserAstronaut } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BACKEND_URL = 'http://localhost:5000';

// --- Markdown Formatter (Crucial for structured AI answers) ---
const MarkdownContent = ({ content }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-3 space-y-1.5" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-3 space-y-1.5 text-[#0055FF]" {...props} />,
            li: ({ node, ...props }) => <li className="text-gray-300 marker:text-[#0055FF]" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold text-white tracking-wide" {...props} />,
            code: ({ node, inline, ...props }) => 
                inline ? (
                    <code className="bg-[#0055FF]/10 text-[#0055FF] px-1.5 py-0.5 rounded text-[12px] font-mono border border-[#0055FF]/20" {...props} />
                ) : (
                    <div className="bg-[#050608] border border-white/10 rounded-md p-3 my-2 overflow-x-auto">
                        <code className="text-gray-300 text-[12px] font-mono" {...props} />
                    </div>
                )
        }}
    >
        {content}
    </ReactMarkdown>
);

const TypingIndicator = () => (
    <div className="flex items-end gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0055FF]/10 border border-[#0055FF]/30 flex items-center justify-center">
            <FaMicrochip size={12} className="text-[#0055FF] animate-pulse" />
        </div>
        <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none shadow-lg">
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#0055FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);

const Message = ({ msg }) => {
    const isBot = msg.role === 'bot';
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className={`flex items-end gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md
                ${isBot
                    ? 'bg-[#0055FF]/10 border border-[#0055FF]/30 text-[#0055FF]'
                    : 'bg-white/10 border border-white/20 text-white'
                }`}
            >
                {isBot ? <FaMicrochip size={12} /> : <FaUserAstronaut size={12} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[82%] px-4 py-3 text-[13px] 
                ${isBot
                    ? 'bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-white/5 text-gray-300 rounded-2xl rounded-bl-none shadow-lg'
                    : 'bg-gradient-to-br from-[#0055FF] to-[#0044cc] text-white rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(0,85,255,0.3)]'
                }`}
            >
                {isBot ? <MarkdownContent content={msg.text} /> : <p className="leading-relaxed">{msg.text}</p>}
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
            text: "### SYSTEM INITIALIZED\nHello! I'm Piyush's AI assistant. Ask me anything about his **skills**, **projects**, or **experience**.",
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
            // Formatting history for the backend to allow conversational memory
            const history = messages.map(m => ({
                role: m.role === 'bot' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));

            const res = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText, history }),
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
                { role: 'bot', text: '**ERROR 503:** Communication link interrupted. Please ensure the backend server is active.' },
            ]);
        } finally {
            setIsLoading(false);
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
                            <span className="absolute inset-0 rounded-full bg-[#0055FF] opacity-40 animate-ping duration-1000" />
                            <motion.button
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0044cc] to-[#0066ff] text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,85,255,0.4)] hover:shadow-[0_0_45px_rgba(0,85,255,0.6)] transition-shadow border border-white/10"
                            >
                                <FaRobot size={24} />
                            </motion.button>
                            
                            {/* Tooltip */}
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: pulse ? 1 : 0, x: pulse ? 0 : 10 }}
                                className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0a0a0a]/90 backdrop-blur border border-[#0055FF]/40 text-gray-200 text-xs font-mono px-3 py-2 whitespace-nowrap shadow-[0_0_15px_rgba(0,85,255,0.15)]"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
                            >
                                Ask AI Assistant
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
                        exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 z-[9999] w-[380px] md:w-[420px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(0,85,255,0.15)] rounded-2xl overflow-hidden"
                        style={{ maxHeight: 'calc(100vh - 100px)' }}
                    >
                        {/* ── Title bar ── */}
                        <div className="bg-[#050608] border border-white/10 border-b-0 flex items-center gap-3 px-4 py-3.5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0055FF]/10 to-transparent opacity-50 pointer-events-none" />
                            <div className="flex gap-1.5 relative z-10">
                                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-red-500 shadow-sm" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
                            </div>
                            <div className="flex-1 flex items-center gap-2 justify-center relative z-10">
                                <FaTerminal size={12} className="text-[#0055FF]" />
                                <span className="font-mono text-[11px] text-gray-300 tracking-[0.2em] uppercase">
                                    piyush_ai.exe
                                </span>
                            </div>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-500 hover:text-white transition-colors relative z-10"
                            >
                                <FaTimes size={14} />
                            </motion.button>
                        </div>

                        {/* ── Status bar ── */}
                        <div className="bg-[#0a0a0a] border-x border-b border-white/5 px-4 py-2 flex items-center gap-2 shadow-inner">
                            <span className="w-1.5 h-1.5 bg-[#27c93f] rounded-full animate-pulse shadow-[0_0_8px_#27c93f]" />
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Neural Link Active</span>
                            <span className="ml-auto font-mono text-[10px] text-[#0055FF]">v2.5</span>
                        </div>

                        {/* ── Messages Area ── */}
                        <div className="flex-1 overflow-y-auto bg-[#0a0b0d]/95 backdrop-blur-md border-x border-white/5 px-4 py-6 space-y-5"
                            style={{ minHeight: '350px', maxHeight: '450px' }}>
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
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#0a0b0d]/95 border-x border-white/5 px-4 pb-3 flex flex-wrap gap-2"
                                >
                                    {SUGGESTIONS.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(s)}
                                            className="text-[11px] font-sans text-gray-400 bg-white/5 hover:bg-[#0055FF]/10 hover:text-white border border-white/10 hover:border-[#0055FF]/40 px-3 py-1.5 rounded-lg transition-all duration-300"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Input bar ── */}
                        <div className="bg-[#050608] border border-white/10 p-4 flex items-center gap-3 relative">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0055FF] font-mono text-sm pointer-events-none font-bold">
                                    &gt;
                                </span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                    placeholder="Enter command or question..."
                                    disabled={isLoading}
                                    className="w-full bg-[#111] border border-white/10 focus:border-[#0055FF]/60 focus:bg-[#151515] text-white font-sans text-sm pl-8 pr-4 py-3 outline-none transition-all placeholder-gray-600 disabled:opacity-50"
                                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                                />
                            </div>
                            <motion.button
                                onClick={() => sendMessage()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!input.trim() || isLoading}
                                className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#0055FF] to-[#0044cc] text-white hover:shadow-[0_0_20px_rgba(0,85,255,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                            >
                                <FaPaperPlane size={14} className="ml-[-2px] mt-[2px]" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;