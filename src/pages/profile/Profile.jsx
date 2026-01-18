import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Edit2, Star, Shield, Zap, Clock, Trophy,
    ChevronRight, Camera, Award, CreditCard,
    RefreshCcw, LogOut, CheckCircle, Lock,
    ChevronLeft, Loader2, ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfileOptions } from '../../utils/profileOptions';

const Profile = () => {
    const { user, logout, updateUser } = useAuth(); // Assuming updateUser exists in context
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // States
    const [avatar, setAvatar] = useState(null);
    const [activePanel, setActivePanel] = useState(null); // 'achievements', 'privacy', 'payments'
    const [loading, setLoading] = useState(false);

    // New States for requested features
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Edit Profile Form State
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        level: 'JEE Aspirant',
        bio: 'Dreaming big, working hard.'
    });

    // Mock Question Bank Data for Search
    const MOCK_QUESTIONS = [
        { id: 1, question: "Calculate the rotational kinetic energy...", subject: "Physics", topic: "Rotational Motion" },
        { id: 2, question: "What is the reactant in Reimer-Tiemann reaction?", subject: "Chemistry", topic: "Organic" },
        { id: 3, question: "Find the integral of log(x) dx", subject: "Maths", topic: "Calculus" },
        { id: 4, question: "Dimensional formula of Viscosity", subject: "Physics", topic: "Units" },
        { id: 5, question: "Hybridization of XeF4", subject: "Chemistry", topic: "Bonding" },
        { id: 6, question: "Probability of getting 3 heads in 5 tosses", subject: "Maths", topic: "Probability" },
        { id: 7, question: "Equation of trajectory of projectile", subject: "Physics", topic: "Kinematics" },
        { id: 8, question: "Acidity order of phenols", subject: "Chemistry", topic: "Organic" },
        { id: 9, question: "Equation of tangent to parabola y^2=4ax", subject: "Maths", topic: "Conics" },
        { id: 10, question: "Bohr model postulates", subject: "Physics", topic: "Modern Physics" },
        { id: 11, question: "Structure of DNA double helix", subject: "Biology", topic: "Genetics" },
        { id: 12, question: "Krebs cycle ATP yield", subject: "Biology", topic: "Respiration" }
    ];

    // default avatar
    const DEFAULT_AVATAR = "https://i.ibb.co/L5pS6Mv/anime-boy-avatar.jpg";

    // Initialize Avatar
    useEffect(() => {
        try {
            const savedAvatar = localStorage.getItem(`avatar_${user?.id || 'demo'}`);
            if (savedAvatar) setAvatar(savedAvatar);
            if (user) {
                setEditForm(prev => ({ ...prev, name: user.name }));
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                try {
                    const base64String = reader.result;
                    setAvatar(base64String);
                    localStorage.setItem(`avatar_${user?.id || 'demo'}`, base64String);
                } catch (error) {
                    alert("Storage full or error saving image.");
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        console.log("Saving profile:", editForm);
        // Update context/localStorage
        try {
            if (updateUser) updateUser({ name: editForm.name });
            localStorage.setItem('user_level', editForm.level);
            localStorage.setItem('user_bio', editForm.bio);
            alert("Profile Updated Successfully!"); // Toast placeholder
            setIsEditModalOpen(false);
        } catch (e) {
            console.error("Save failed", e);
        }
    };

    const filteredQuestions = MOCK_QUESTIONS.filter(q => {
        const matchesSubject = activeFilter === 'All' ||
            (activeFilter === 'Chem' ? q.subject === 'Chemistry' : q.subject === activeFilter);
        const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.topic.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSwitchAccount = () => {
        logout();
        navigate('/login');
    };

    const handlers = {
        onAchievements: () => setActivePanel('achievements'),
        onPrivacy: () => setActivePanel('privacy'),
        onPayments: () => setActivePanel('payments'),
        onSwitch: handleSwitchAccount,
        onLogout: handleLogout
    };

    const options = getProfileOptions(handlers);

    // --- Sub-Components ---
    const AchievementsPanel = () => (
        <div className="space-y-6">
            <button onClick={() => setActivePanel(null)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors mb-4">
                <ChevronLeft size={20} /> Back to Profile
            </button>
            <h2 className="text-3xl font-black text-white flex items-center gap-3"><Trophy className="text-yellow-400" /> Hero Stats & Badges</h2>
            {/* ... Existing Achievements Content ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: 'Total Quizzes', value: '124', icon: CheckCircle, color: 'text-green-400' },
                    { label: 'Avg Accuracy', value: '88%', icon: Zap, color: 'text-purple-400' },
                    { label: 'Global Rank', value: '#42', icon: Trophy, color: 'text-cyan-400' },
                    { label: 'Current Streak', value: '15 Days', icon: Star, color: 'text-pink-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-black/40 ${stat.color}`}><stat.icon size={24} /></div>
                        <div><p className="text-gray-400 text-xs font-bold uppercase">{stat.label}</p><p className="text-2xl font-black text-white">{stat.value}</p></div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-6">
                <h3 className="font-bold text-white mb-4">Milestone Badges</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {['🔥', '🚀', '⭐', '🎓', '🛡️', '💎', '🎯', '📚'].map((badge, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:scale-110 transition-transform cursor-pointer"><span className="text-2xl">{badge}</span></div>
                    ))}
                </div>
            </div>
        </div>
    );

    const PrivacyPanel = () => (
        <div className="space-y-6">
            <button onClick={() => setActivePanel(null)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors mb-4"><ChevronLeft size={20} /> Back to Profile</button>
            <h2 className="text-3xl font-black text-white flex items-center gap-3"><Lock className="text-blue-400" /> Privacy & Security</h2>
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 space-y-4">
                <p className="text-gray-400 leading-relaxed italic border-l-4 border-cyan-500 pl-4">Your data is secured with AES-256 encryption.</p>
            </div>
        </div>
    );

    const PaymentsPanel = () => (
        <div className="space-y-6">
            <button onClick={() => setActivePanel(null)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors mb-4"><ChevronLeft size={20} /> Back to Profile</button>
            <h2 className="text-3xl font-black text-white flex items-center gap-3"><CreditCard className="text-emerald-400" /> Membership & Billing</h2>
            <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-black text-white mb-2">PRO PLAN ACTIVE</h3>
                <button className="px-8 py-3 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all">MANAGE SUBSCRIPTION</button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Search and Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <ZoomIn size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search question bank..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all dark:bg-gray-800"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Physics', 'Chem', 'Maths'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === filter
                                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mock Question Results (Only show if searching) */}
            {searchQuery && (
                <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-4 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-white font-bold mb-3 flex items-center justify-between">
                        <span>Search Results</span>
                        <span className="text-xs text-cyan-400">{filteredQuestions.length} found</span>
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredQuestions.length > 0 ? filteredQuestions.map(q => (
                            <div key={q.id} className="p-3 bg-black/40 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors flex justify-between items-start gap-3">
                                <div>
                                    <p className="text-gray-200 text-sm font-medium line-clamp-2">{q.question}</p>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{q.subject} • {q.topic}</p>
                                </div>
                                <button className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded"><ChevronRight size={14} /></button>
                            </div>
                        )) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-sm">No questions found.</p>
                                <button onClick={() => setSearchQuery('')} className="text-cyan-400 text-xs font-bold mt-2 hover:underline">Clear Search</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hero Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Avatar with Hidden File Input */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-black">
                            {loading ? (
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-900">
                                    <Loader2 className="text-cyan-400 animate-spin" size={32} />
                                </div>
                            ) : (
                                <img
                                    src={avatar || DEFAULT_AVATAR}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover bg-gray-800 border-2 border-white/10"
                                    onError={(e) => { e.target.src = DEFAULT_AVATAR }}
                                />
                            )}

                            {/* Camera Overlay */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-3 bg-cyan-500 text-black rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-black"
                            >
                                <Camera size={18} />
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            {user?.name || editForm.name || 'Hero Student'}
                        </h1>
                        <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm flex items-center justify-center md:justify-start gap-2">
                            Level 12 <span className="text-gray-600">•</span> {editForm.level} <span className="text-gray-600">•</span> <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">Pro Member</span>
                        </p>
                        <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0 opacity-80 italic">"{editForm.bio}"</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider text-xs transition-shadow shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2"
                            >
                                Edit Profile <Edit2 size={12} fill="currentColor" />
                            </button>
                            <button className="px-6 py-2.5 rounded-xl border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/5 transition-colors">
                                View Public Profile
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats on Hero Card */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center group hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-2xl font-black text-white">12</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Day Streak</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center group hover:border-purple-500/30 transition-colors">
                            <h3 className="text-2xl font-black text-white">84%</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Accuracy</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ... Rest of the Layout (Panels, Activity, Badges) Remains Identical to Step 115 ... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode='wait'>
                        {!activePanel ? (
                            <motion.div key="main-profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                {/* Subject Progress */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[{ subject: 'Physics', progress: 80, color: 'text-purple-400', bar: 'bg-purple-500' }, { subject: 'Chemistry', progress: 65, color: 'text-cyan-400', bar: 'bg-cyan-500' }, { subject: 'Maths', progress: 92, color: 'text-blue-400', bar: 'bg-blue-500' }, { subject: 'Biology', progress: 45, color: 'text-pink-400', bar: 'bg-pink-500' }].map((stat, idx) => (
                                        <div key={idx} className="bg-gray-900 border border-white/10 rounded-2xl p-6 group hover:border-white/20 transition-all">
                                            <div className="flex justify-between items-end mb-4"><h3 className={`font-bold text-lg ${stat.color}`}>{stat.subject}</h3><span className="text-2xl font-black text-white">{stat.progress}%</span></div>
                                            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${stat.progress}%` }} transition={{ duration: 1, delay: 0.2 }} className={`h-full ${stat.bar} shadow-[0_0_10px_currentColor]`}></motion.div></div>
                                        </div>
                                    ))}
                                </div>
                                {/* Recent Activity Log */}
                                <div className="bg-gray-900 border border-white/10 rounded-3xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Clock className="text-cyan-400" /> Recent Activity</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors group">
                                                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-colors"><Zap size={20} /></div>
                                                <div className="flex-1"><h4 className="font-bold text-gray-200 group-hover:text-white">Completed Quiz: Thermodynamics</h4><p className="text-xs text-gray-500">2 hours ago • Score: 18/20</p></div><ChevronRight className="text-gray-600 group-hover:text-cyan-400" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="active-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                {activePanel === 'achievements' && <AchievementsPanel />}
                                {activePanel === 'privacy' && <PrivacyPanel />}
                                {activePanel === 'payments' && <PaymentsPanel />}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5"><h3 className="font-bold text-white">Account Settings</h3></div>
                        <div className="p-2 space-y-1">
                            {options.map((opt) => (
                                <button key={opt.id} onClick={() => opt.action()} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group group">
                                    <div className={`p-2.5 rounded-xl bg-black border border-white/5 ${opt.color} group-hover:scale-110 transition-transform`}><opt.icon size={20} /></div>
                                    <div className="text-left flex-1"><p className="font-bold text-gray-200 text-sm group-hover:text-white">{opt.name}</p><p className="text-[10px] text-gray-500 font-medium">{opt.desc}</p></div><ChevronRight size={16} className="text-gray-700 group-hover:text-cyan-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Badges Preview */}
                    <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Trophy className="text-yellow-400" /> Badges</h3>
                        <div className="grid grid-cols-3 gap-4">{['🔥', '🚀', '⭐', '🎓', '🛡️', '💎'].map((badge, i) => (<div key={i} className="aspect-square rounded-2xl bg-white/5 flex flex-col items-center justify-center border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-help"><span className="text-3xl mb-1">{badge}</span></div>))}</div>
                        <button onClick={() => setActivePanel('achievements')} className="w-full mt-6 py-3 rounded-xl border border-white/10 text-gray-400 font-bold uppercase text-xs hover:bg-white/5 hover:text-white transition-colors">View All Badges</button>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#111] border border-cyan-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.15)] relative"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><LogOut size={20} className="rotate-45" /></button>

                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                                <Edit2 className="text-cyan-400" /> Edit Profile
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Display Name</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Aspirant Type</label>
                                    <select
                                        value={editForm.level}
                                        onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none"
                                    >
                                        <option>JEE Aspirant</option>
                                        <option>NEET Aspirant</option>
                                        <option>Foundation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Bio</label>
                                    <textarea
                                        value={editForm.bio}
                                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none h-24 resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5">Cancel</button>
                                    <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">Save Changes</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
