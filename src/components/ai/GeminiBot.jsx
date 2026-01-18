import React, { useState, useEffect, useRef } from 'react';
import { BsChatDotsFill, BsSendFill, BsRobot, BsX, BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const GeminiBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Load history
    useEffect(() => {
        try {
            const saved = localStorage.getItem('gemini-chat-history');
            if (saved) {
                setMessages(JSON.parse(saved));
            } else {
                setMessages([
                    {
                        role: 'model',
                        text: "Hi! I'm your AI Study Assistant. 🧠 I can help you with Physics, Chemistry, Maths, and Biology doubts. Ask me anything!"
                    }
                ]);
            }
        } catch (e) {
            console.error("Failed to load chat history", e);
        }
    }, []);

    // Save history
    useEffect(() => {
        try {
            const limitedMessages = messages.slice(-50);
            localStorage.setItem('gemini-chat-history', JSON.stringify(limitedMessages));
        } catch (e) {
            console.error("Failed to save chat history", e);
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const userName = localStorage.getItem('userName') || 'Friend';

        const systemPrompt = `You are GeminiBot – expert JEE/NEET tutor for Entrance Exam Prep Hub.
   Help with: Physics (HC Verma/DC Pandey), Chemistry (OP Tandon/N Awasthi/P Bahadur), Maths (RD Sharma/Amit Agarwal/SL Loney), Biology (NCERT/Trueman/MTG).
   Explain concepts step-by-step, solve PYQs, generate 10–20 MCQs with a/b/c/d options + explanations.
   User Info: Name=${userName}.
   Be encouraging, concise, and always tie back to website features like Quizzes and Video Portals.`;

        try {
            if (!apiKey) throw new Error("API Key missing");

            const recentHistory = messages.slice(-10).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const payload = {
                contents: [
                    { role: 'user', parts: [{ text: systemPrompt }] },
                    ...recentHistory,
                    { role: 'user', parts: [{ text: userMsg.text }] }
                ]
            };

            const response = await fetch(`${import.meta.env.VITE_GEMINI_API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            const botResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!botResponseText) throw new Error("No response text");

            setMessages(prev => [...prev, { role: 'model', text: botResponseText }]);

        } catch (error) {
            console.error("Gemini Request Failed:", error);
            await new Promise(r => setTimeout(r, 1000));
            setMessages(prev => [...prev, {
                role: 'model',
                text: "I'm currently in offline mode (API Key missing). I can still guide you to the Question Bank! 📚"
            }]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button - Purple & Neon */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center border-2 border-white/20 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                    } text-white`}
            >
                {isOpen ? <BsX size={30} /> : <BsStars size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-black/90 backdrop-blur-xl rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-purple-500/30 ring-1 ring-white/10"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-4 flex items-center gap-3 border-b border-white/10">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                                <BsRobot size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">AI Study Assistant</h3>
                                <p className="text-purple-300 text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl relative text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-purple-600 text-white rounded-br-sm shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                                            : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-sm backdrop-blur-md'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-4 rounded-2xl rounded-bl-sm border border-white/10 w-16 flex items-center justify-center gap-1">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2 backdrop-blur-md">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask a doubt..."
                                    className="w-full bg-white/5 text-white rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 border border-white/10 transition-all placeholder-gray-500"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] flex items-center justify-center"
                            >
                                <BsSendFill size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GeminiBot;
