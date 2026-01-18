import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { User, Lock, Diamond, Hexagon, Sparkles, ChevronRight, Mail, ShieldCheck } from 'lucide-react';

const CHIBIS = [
    { id: 1, name: "Aqua", seed: "Aqua", color: "from-cyan-400 to-blue-500", pos: "top-20 -left-12" },
    { id: 2, name: "Terra", seed: "Terra", color: "from-green-400 to-emerald-600", pos: "bottom-32 -right-8" },
    { id: 3, name: "Pyra", seed: "Pyra", color: "from-orange-400 to-red-600", pos: "top-1/2 -left-20" },
    { id: 4, name: "Aero", seed: "Aero", color: "from-purple-400 to-pink-600", pos: "top-32 right-10" },
];

const SignupPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isPasswordStrong = password.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!isPasswordStrong) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);

        // Simulate network delay
        setTimeout(async () => {
            const result = signup(name, email, password);
            if (result.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError("Signup failed. Try again.");
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            <AnimatedBackground />

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
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chibi.seed}&style=circle`}
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
                className="relative z-20 w-fit h-fit"
            >
                {/* Rotating Rings Backend */}
                <div className="absolute inset-x-0 inset-y-0 -m-20 border-2 border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-x-0 inset-y-0 -m-10 border border-cyan-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                {/* Main Signup Card */}
                <div className="relative w-[400px] md:w-[480px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(168,85,247,0.2)]">

                    {isSuccess ? (
                        <div className="text-center py-10 space-y-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                            >
                                <ShieldCheck size={40} className="text-black" />
                            </motion.div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Account Created!</h2>
                            <p className="text-cyan-400 font-bold animate-pulse">Now login → Redirecting in 3s...</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <motion.h1
                                    className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 tracking-tighter"
                                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    style={{ backgroundSize: "200% auto" }}
                                >
                                    CREATE IDENTITY
                                </motion.h1>
                                <p className="text-white/50 font-bold tracking-[0.2em] text-[10px] mt-2 uppercase">Establish Neural Link</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-xs text-center font-bold uppercase tracking-widest">
                                        {error}
                                    </div>
                                )}

                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/50 group-focus-within:text-purple-400 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="FULL NAME (OPTIONAL)"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/30 border border-white/5 focus:border-purple-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all h-14 font-medium"
                                    />
                                </div>

                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="EMAIL ADDRESS"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/30 border border-white/5 focus:border-cyan-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all h-14 font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 group-focus-within:text-blue-400 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="PASSWORD"
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-black/30 border border-white/5 focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all h-14 font-medium text-sm"
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 group-focus-within:text-blue-400 transition-colors">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="CONFIRM"
                                            value={confirmPassword}
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-black/30 border border-white/5 focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 outline-none transition-all h-14 font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="px-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Entropy Level</span>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${isPasswordStrong ? 'text-green-400' : 'text-orange-400'}`}>
                                                {isPasswordStrong ? 'Secure' : 'Weak (Min 6)'}
                                            </span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: isPasswordStrong ? "100%" : "30%" }}
                                                className={`h-full ${isPasswordStrong ? 'bg-green-500' : 'bg-orange-500'}`}
                                            />
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full relative overflow-hidden group bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-600 p-[2px] rounded-2xl mt-6 ${isLoading ? 'opacity-80' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                                    <div className="relative bg-black/40 hover:bg-transparent transition-colors rounded-2xl py-4 flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span className="font-black text-white tracking-[0.2em] text-sm uppercase">Secure Registration</span>
                                                <Sparkles size={16} className="text-cyan-400" />
                                            </>
                                        )}
                                    </div>
                                </motion.button>

                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-[10px] uppercase tracking-widest text-white/60">
                                        <span className="text-red-400">G</span> Google
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-[10px] uppercase tracking-widest text-white/60">
                                        <Mail size={12} className="text-cyan-400" /> GitHub
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-cyan-400 transition-colors"
                                >
                                    Already synched? Return to Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
