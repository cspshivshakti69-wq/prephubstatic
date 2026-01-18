import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AnimeMascot from '../../components/anime/AnimeMascot';
import { StatsCharts } from '../../components/dashboard/StatsCharts';
import {
    CheckSquare, BarChart2, TrendingUp,
    BookOpen, Video, FileText, Calendar, Target, HelpCircle, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SocialNap from '../social/SocialNap';
import RoadmapTracker from '../../components/dashboard/RoadmapTracker';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/40 flex items-center gap-4 transition-all hover:shadow-lg hover:bg-white/90"
    >
        <div className={`p-4 rounded-xl ${color} shadow-lg shadow-gray-200`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-gray-800">{value}</p>
        </div>
    </motion.div>
);

const ActionCard = ({ title, desc, icon: Icon, color, to }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(to)}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/40 cursor-pointer hover:shadow-xl hover:border-white/60 transition-all group"
        >
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm font-medium">{desc}</p>
        </motion.div>
    );
};

const DashboardPage = () => {
    const { user } = useAuth();
    console.log(user);
    const [isSocialNapOpen, setIsSocialNapOpen] = useState(() => {
        return localStorage.getItem('isSocialNapOpen') === 'true';
    });

    const toggleSocialNap = () => {
        const newState = !isSocialNapOpen;
        setIsSocialNapOpen(newState);
        localStorage.setItem('isSocialNapOpen', newState);
    };

    // In real app, fetch these from Context or API based on user history
    const stats = useMemo(() => ({
        quizzes: 12,
        questions: 350,
        accuracy: '82%',
        score: '78%'
    }), []);

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Welcome, {user?.name?.split(' ')[0]}!
                        </h1>
                        <span className="text-3xl animate-bounce">👋</span>
                    </div>
                    <p className="text-gray-600 mt-2 font-medium">
                        Your preparation is on track! You've improved by <span className="text-green-600 font-bold">+5%</span> this week.
                    </p>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-600 px-6 py-4 rounded-2xl shadow-lg shadow-green-500/20 text-white flex flex-col items-center">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-90">Daily Motivation</p>
                    <p className="font-bold text-lg italic">"Dream Bigger. Do Bigger."</p>
                </div>
            </div>

            {/* Social Nap Entry (Inline Expandable) */}
            <div className="space-y-4">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={toggleSocialNap}
                    className={`bg-black border rounded-3xl p-1 cursor-pointer group shadow-xl relative overflow-hidden transition-all ${isSocialNapOpen ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'border-white/10'}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="bg-[#0a0a0a] rounded-[22px] p-6 flex items-center justify-between relative z-10 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                <Video size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    Social Nap
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500 text-white animate-pulse">LIVE</span>
                                </h2>
                                <p className="text-gray-400 font-medium">{isSocialNapOpen ? 'Click to collapse social feed' : 'Join 2 active study rooms • 15 friends online'}</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: isSocialNapOpen ? 90 : 0 }}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-cyan-500 group-hover:text-black transition-all"
                            >
                                <ChevronRight size={24} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isSocialNapOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <SocialNap />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Roadmap Tracker */}
            <RoadmapTracker />

            {/* Upcoming Exams (Countdown) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* JEE */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-2xl shadow-lg shadow-indigo-500/20">
                    <div className="bg-white p-4 h-full rounded-xl flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-gray-800 text-lg">JEE Main</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase">Jan 24, 2026</p>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl font-black text-indigo-600">12</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Days Left</p>
                        </div>
                    </div>
                </div>
                {/* NEET */}
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-1 rounded-2xl shadow-lg shadow-emerald-500/20">
                    <div className="bg-white p-4 h-full rounded-xl flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-gray-800 text-lg">NEET UG</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase">May 05, 2026</p>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl font-black text-emerald-600">115</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Days Left</p>
                        </div>
                    </div>
                </div>
                {/* BITSAT */}
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-1 rounded-2xl shadow-lg shadow-orange-500/20">
                    <div className="bg-white p-4 h-full rounded-xl flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-gray-800 text-lg">BITSAT</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase">May 20, 2026</p>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl font-black text-orange-600">130</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Days Left</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={CheckSquare} label="Quizzes Taken" value={stats.quizzes} color="bg-gradient-to-br from-blue-400 to-blue-600" />
                <StatCard icon={HelpCircle} label="Questions Solved" value={stats.questions} color="bg-gradient-to-br from-green-400 to-green-600" />
                <StatCard icon={TrendingUp} label="Overall Accuracy" value={stats.accuracy} color="bg-gradient-to-br from-orange-400 to-orange-600" />
                <StatCard icon={BarChart2} label="Avg. Score" value={stats.score} color="bg-gradient-to-br from-purple-400 to-purple-600" />
            </div>

            {/* Advanced Charts Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart2 className="text-primary" /> Performance Analytics
                </h2>
                <StatsCharts />
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Target className="text-red-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ActionCard
                        to="/quizzes"
                        title="Quiz Arena"
                        desc="Challenge yourself with timed mock tests."
                        icon={CheckSquare}
                        color="bg-gradient-to-br from-blue-400 to-blue-600"
                    />
                    <ActionCard
                        to="/questions"
                        title="Question Bank"
                        desc="Practice specific topics from standard books."
                        icon={BookOpen}
                        color="bg-gradient-to-br from-indigo-400 to-indigo-600"
                    />
                    <ActionCard
                        to="/videos"
                        title="Video Portals"
                        desc="Watch curated lectures from top educators."
                        icon={Video}
                        color="bg-gradient-to-br from-red-400 to-red-600"
                    />
                    <ActionCard
                        to="/notes"
                        title="Magic Notes"
                        desc="Access premium study materials & PDFs."
                        icon={FileText}
                        color="bg-gradient-to-br from-emerald-400 to-teal-600"
                    />
                </div>
            </div>

            <AnimeMascot
                message={`Great progress, ${user?.name?.split(' ')[0]}! Your accuracy in Optics is rising! 📈 Keep pushing!`}
                type="happy"
            />
        </div>
    );
};

export default DashboardPage;
