import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
    User, Mail, Camera, Edit2, LogOut,
    Award, Star, Shield, BookOpen, Settings,
    Bell, Zap, ChevronRight
} from 'lucide-react';
import AnimeMascot from '../../components/anime/AnimeMascot';

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [activeTab, setActiveTab] = useState('Overview');

    const handleSave = () => {
        updateUser({ name });
        setIsEditing(false);
    };

    const stats = [
        { label: 'Study Streak', value: '12 Days', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        { label: 'Quizzes Aced', value: '18', icon: Star, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Global Rank', value: '#142', icon: Trophy, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    ];

    const badges = [
        { id: 1, icon: '🚀', name: 'Early Bird', desc: 'Joined in beta' },
        { id: 2, icon: '🔥', name: 'On Fire', desc: '7 day streak' },
        { id: 3, icon: '📚', name: 'Scholar', desc: 'First 100 Qs' },
        { id: 4, icon: '🎯', name: 'Sniper', desc: '100% Accuracy' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header / Cover */}
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 px-4 -mt-20">
                {/* Left: Avatar & Quick Actions */}
                <div className="md:w-1/3 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center relative z-10">
                        <div className="relative inline-block mb-4">
                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-500 mx-auto">
                                <img
                                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full bg-white object-cover border-4 border-white"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2.5 bg-gray-900 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </button>
                        </div>

                        {isEditing ? (
                            <div className="flex gap-2 justify-center mb-2">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border rounded px-2 py-1 text-center w-full"
                                />
                                <button onClick={handleSave} className="text-green-600 font-bold text-sm">Save</button>
                            </div>
                        ) : (
                            <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                                {user?.name}
                                <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 transition-colors">
                                    <Edit2 size={16} />
                                </button>
                            </h2>
                        )}
                        <p className="text-gray-500 font-medium mb-6">{user?.email}</p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 font-bold">
                                <div className="text-2xl">Lvl 12</div>
                                <div className="text-[10px] uppercase opacity-70">Scholar</div>
                            </div>
                            <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 font-bold">
                                <div className="text-2xl">84%</div>
                                <div className="text-[10px] uppercase opacity-70">Accuracy</div>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full py-3 rounded-xl border-2 border-red-50 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="text-yellow-500" size={20} /> Achievements
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {badges.map(badge => (
                                <div key={badge.id} className="aspect-square rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-help group relative hover:bg-yellow-50 transition-colors">
                                    <span className="text-2xl mb-1">{badge.icon}</span>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                        {badge.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Main Content */}
                <div className="flex-1 pt-8 md:pt-20 space-y-6">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-gray-100">
                        {['Overview', 'Activity', 'Settings'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {activeTab === 'Overview' && (
                                <div className="space-y-6">
                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {stats.map((stat, i) => (
                                            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                                    <stat.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-xs font-bold uppercase">{stat.label}</p>
                                                    <p className="text-xl font-black text-gray-900">{stat.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity Feed */}
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-sm">
                                                        Q{i}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-gray-800 text-sm">Completed JEE Physics Mock {i}</p>
                                                        <p className="text-gray-400 text-xs">2 hours ago • <span className="text-green-500">Score 85%</span></p>
                                                    </div>
                                                    <ChevronRight size={16} className="text-gray-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Settings' && (
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    {[
                                        { icon: Bell, title: 'Notifications', desc: 'Manage email and push alerts' },
                                        { icon: Shield, title: 'Privacy & Security', desc: 'Password and 2FA' },
                                        { icon: Database, title: 'Data Management', desc: 'Download your study data' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                                                <item.icon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <AnimeMascot
                message={`Looking stylish, ${user?.name?.split(' ')[0]}! Ready to conquer some more quizzes? ✨`}
                type="happy"
            />
        </div>
    );
};

// Helper for missing Trophy icon
const Trophy = ({ size, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);
// Helper for missing Database icon
const Database = ({ size, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);


export default ProfilePage;
