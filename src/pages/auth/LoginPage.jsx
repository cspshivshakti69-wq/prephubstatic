import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { User, Lock, Diamond, Hexagon, Sparkles, ChevronRight } from 'lucide-react';

// Mock Chibi Characters Data (In a real app, these would be actual images)
// Using colorful avatars as placeholders for the "Chibi" requirement
const CHIBIS = [
    { id: 1, name: "Aqua", seed: "Aqua", color: "from-cyan-400 to-blue-500", pos: "top-20 -left-12" },
    { id: 2, name: "Terra", seed: "Terra", color: "from-green-400 to-emerald-600", pos: "bottom-32 -right-8" },
    { id: 3, name: "Pyra", seed: "Pyra", color: "from-orange-400 to-red-600", pos: "top-1/2 -left-20" },
    { id: 4, name: "Aero", seed: "Aero", color: "from-purple-400 to-pink-600", pos: "top-32 right-10" },
];

const LoginPage = () => {
    console.log("LoginPage");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(async () => {
            const result = login(email, password, rememberMe);
            if (result.success) {
                const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
                setLoggedInUser(storedUser.name);
                setShowToast(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setError(result.message);
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            <AnimatedBackground />

            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 20, opacity: 1 }}
                    className="fixed top-0 z-[100] bg-cyan-500 text-black px-6 py-3 rounded-full font-black shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-3"
                >
                    <Sparkles size={20} />
                    Welcome, {loggedInUser}! Start your prep journey 🚀
                </motion.div>
            )}

            {/* Floating Chibi Characters */}
            {CHIBIS.map((chibi, i) => (
                <motion.div
                    key={chibi.id}
                    className={`absolute hidden md:block z-10 ${chibi.pos}`}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-br ${chibi.color} shadow-[0_0_30px_rgba(255,255,255,0.4)]`}>
                        <img
                            src={`${import.meta.env.VITE_AVATAR_BASE_URL}?seed=${chibi.seed}&style=circle`}
                            alt={chibi.name}
                            className="w-full h-full rounded-full bg-white/90 border-2 border-white"
                        />
                    </div>
                </motion.div>
            ))}

            {/* Central Portal Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 w-fit h-fit"
            >
                {/* Rotating Rings Backend */}
                <div className="absolute inset-x-0 inset-y-0 -m-20 border-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-x-0 inset-y-0 -m-10 border border-purple-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                {/* Main Login Card */}
                <div className="relative w-[400px] md:w-[480px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(0,255,255,0.2)]">
                    <div className="text-center mb-10">
                        <motion.h1
                            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: "200% auto" }}
                        >
                            CHRONOFORGE
                        </motion.h1>
                        <p className="text-white/70 font-light tracking-[0.3em] text-sm mt-2 uppercase glow-text">Access Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm text-center font-medium backdrop-blur-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/70 group-focus-within:text-cyan-400 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="USERNAME / EMAIL"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 outline-none transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] font-medium tracking-wide h-14"
                                />
                            </div>

                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/70 group-focus-within:text-purple-400 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="PASSWORD"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 focus:border-purple-400 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/30 outline-none transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_0_15px_rgba(168,85,247,0.3)] font-medium tracking-wide h-14"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                                    <Diamond size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-white/20 group-hover:border-white/40'}`}>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    {rememberMe && <Sparkles size={12} className="text-black" fill="currentColor" />}
                                </div>
                                <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Remember Me</span>
                            </label>
                            <a href="#" className="text-xs text-purple-400 hover:text-white transition-colors font-bold uppercase tracking-widest">Reset Core</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-[2px] rounded-2xl ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                            <div className="relative bg-black/40 hover:bg-transparent transition-colors rounded-2xl py-4 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span className="font-black text-white tracking-[0.3em] text-lg uppercase">Initiate Sync</span>
                                        <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>

                        <div className="flex items-center gap-4 my-8">
                            <div className="h-px flex-1 bg-white/10"></div>
                            <span className="text-[10px] text-white/30 font-black tracking-widest uppercase">External Auth</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all font-bold text-xs uppercase tracking-widest">
                                <span className="text-red-400">G</span> Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all font-bold text-xs uppercase tracking-widest">
                                <Sparkles size={14} className="text-cyan-400" /> Email
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">New here? Create your free account in 10 seconds!</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/signup')}
                            className="inline-block w-full py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                        >
                            Create Account
                        </motion.button>
                    </div>
                </div>

                {/* Admin Hint for Demo */}
                <div className="absolute -bottom-16 w-full text-center">
                    <p className="text-white/20 text-xs font-mono">
                        System Admin: admin@examprephub.com / admin123
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
