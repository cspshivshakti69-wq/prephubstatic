import React, { useState, useEffect } from 'react';
import {
    Heart, MessageCircle, Share2, MoreHorizontal,
    Video, Users, Mic, Phone, Plus, Search,
    Bell, Menu, X, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Dummy Data ---

const FEED_POSTS = [
    {
        id: 1,
        user: { name: 'IdeaGuru99', avatar: 'https://i.pravatar.cc/150?u=IdeaGuru99', handle: '@ideaguru' },
        title: 'New Project Proposal: Sustainable City ii',
        content: 'Check out this new concept for eco-friendly urban planning. We need your votes to move this to the next stage!',
        videoThumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80',
        poll: { yes: 78, no: 22, totalVotes: 1240 },
        likes: 142,
        comments: 3,
        isLiked: false,
        isFollowed: false
    },
    {
        id: 2,
        user: { name: 'TechNinja', avatar: 'https://i.pravatar.cc/150?u=TechNinja', handle: '@techninja' },
        title: 'AI Integration in Syllabus',
        content: 'Should we replace the old C++ module with a new Python AI course? Watch the breakdown.',
        videoThumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
        poll: { yes: 92, no: 8, totalVotes: 856 },
        likes: 215,
        comments: 12,
        isLiked: true,
        isFollowed: true
    },
    {
        id: 3,
        user: { name: 'PhysicsWiz', avatar: 'https://i.pravatar.cc/150?u=PhysicsWiz', handle: '@phywiz' },
        title: 'Quantum Mechanics Workshop',
        content: 'Proposing a weekend workshop for advanced learners. Who is in?',
        videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
        poll: { yes: 45, no: 55, totalVotes: 320 },
        likes: 56,
        comments: 8,
        isLiked: false,
        isFollowed: false
    }
];

const CALL_PARTICIPANTS = [
    { name: 'Foxtrot', image: 'https://i.pravatar.cc/150?u=Foxtrot', isSpeaking: true },
    { name: 'Burhan', image: 'https://i.pravatar.cc/150?u=Burhan', isSpeaking: false },
    { name: 'Sarah', image: 'https://i.pravatar.cc/150?u=Sarah', isSpeaking: false },
    { name: 'Mike', image: 'https://i.pravatar.cc/150?u=Mike', isSpeaking: false },
];

const SUGGESTED_USERS = [
    { name: 'Moster Chief', handle: '@chief117', avatar: 'https://i.pravatar.cc/150?u=Moster' },
    { name: 'Limoas', handle: '@limoas', avatar: 'https://i.pravatar.cc/150?u=Limoas' },
    { name: 'Onogigure', handle: '@onogi', avatar: 'https://i.pravatar.cc/150?u=Onogi' },
    { name: 'ZenMaster', handle: '@zen', avatar: 'https://i.pravatar.cc/150?u=Zen' },
];

// --- Components ---

const GroupDecision = () => {
    const [posts, setPosts] = useState(FEED_POSTS);
    const [following, setFollowing] = useState({}); // Map of user IDs/handles to follow state

    const handleVote = (postId, type) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const total = post.poll.totalVotes + 1;
                let newYes = post.poll.yes; // Keeps percentage somewhat consistent for demo
                // Ideally this would recalculate percentages based on raw counts, 
                // but for this demo visual, we'll just slightly nudge it.
                if (type === 'yes') newYes = Math.min(100, Math.round(((post.poll.yes * post.poll.totalVotes / 100) + 1) / total * 100));
                else newYes = Math.max(0, Math.round(((post.poll.yes * post.poll.totalVotes / 100)) / total * 100));

                return {
                    ...post,
                    poll: { ...post.poll, yes: newYes, no: 100 - newYes, totalVotes: total }
                };
            }
            return post;
        }));
    };

    const toggleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const toggleFollow = (handle) => {
        setFollowing(prev => ({ ...prev, [handle]: !prev[handle] }));
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 font-sans pb-20">
            {/* Top Navigation - Styled to match screenshot vaguely or app theme */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        PrepHub<span className="text-white">Social</span>
                    </h1>
                    <nav className="hidden md:flex gap-1">
                        {['Dashboard', 'Group Decision', 'Explore Ideas', 'Profile'].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === 'Group Decision'
                                        ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold uppercase hover:bg-green-500/20 transition-all">
                        <Video size={14} /> Join Call
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                        <Plus size={20} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl pt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24 h-fit">
                    {[
                        { icon: Menu, label: 'Feed' },
                        { icon: MessageCircle, label: 'Chats' },
                        { icon: MessageCircle, label: 'Chats (Groups)' }, // Screenshot had it twice? Keeping faithful.
                        { icon: Phone, label: 'Calls' },
                        { icon: Users, label: 'My Network' },
                        { icon: ThumbsUp, label: 'Group Decision', active: true },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] font-bold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Main Feed */}
                <main className="lg:col-span-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pointer-events-none"> {/* Visual header */}
                        <h2 className="text-2xl font-black text-white">Group Decision Feed</h2>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Users size={14} className="text-cyan-400" />
                            <span className="text-sm font-bold text-cyan-400">65% Consensus</span>
                        </div>
                    </div>

                    {/* Feed Posts */}
                    {posts.map(post => (
                        <div key={post.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group shadow-lg">
                            {/* Card Header */}
                            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full border border-white/10" />
                                    <div>
                                        <h3 className="text-sm font-bold text-white leading-tight">{post.user.name}</h3>
                                        <p className="text-[10px] text-gray-500">{post.user.handle}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFollow(post.user.handle)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${following[post.user.handle]
                                            ? 'bg-transparent text-gray-500 border border-white/10'
                                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'
                                        }`}
                                >
                                    {following[post.user.handle] ? 'Following' : 'Follow'}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h4 className="text-lg font-bold text-gray-200 mb-2">{post.title}</h4>
                                <p className="text-sm text-gray-400 mb-4">{post.content}</p>

                                {/* Video Thumbnail */}
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group mb-6 cursor-pointer">
                                    <img src={post.videoThumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                            <Video fill="currentColor" className="text-white" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Poll Section */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                                        <span>Community Vote</span>
                                        <span>{post.poll.totalVotes} Votes</span>
                                    </div>
                                    <div className="flex h-12 rounded-xl overflow-hidden cursor-pointer">
                                        <motion.div
                                            initial={{ width: `${post.poll.yes}%` }}
                                            animate={{ width: `${post.poll.yes}%` }}
                                            className="bg-cyan-500 hover:bg-cyan-400 flex items-center justify-start px-4 text-black font-black transition-colors relative group/yes"
                                            onClick={() => handleVote(post.id, 'yes')}
                                        >
                                            <span className="z-10">YES {post.poll.yes}%</span>
                                        </motion.div>
                                        <motion.div
                                            initial={{ width: `${post.poll.no}%` }}
                                            animate={{ width: `${post.poll.no}%` }}
                                            className="bg-purple-600 hover:bg-purple-500 flex items-center justify-end px-4 text-white font-black transition-colors relative group/no"
                                            onClick={() => handleVote(post.id, 'no')}
                                        >
                                            <span className="z-10">NO {post.poll.no}%</span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Interaction Bar */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
                                        >
                                            <Heart size={20} fill={post.isLiked ? "currentColor" : "none"} />
                                            <span className="text-xs font-bold">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors">
                                            <MessageCircle size={20} />
                                            <span className="text-xs font-bold">{post.comments}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                    <div className="text-xs font-bold text-gray-600 cursor-pointer hover:text-cyan-400 transition-colors">
                                        {post.comments} comments
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    {/* Active Group Call */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white text-sm">Active Group Call</h3>
                            <button className="text-xs text-cyan-400 font-bold hover:underline">Join</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {CALL_PARTICIPANTS.map((p, i) => (
                                <div key={i} className="relative aspect-square rounded-xl bg-gray-800 overflow-hidden border border-white/5 group">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                                        {p.name}
                                    </div>
                                    {p.isSpeaking && (
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggested People */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
                        <h3 className="font-bold text-white text-sm mb-4">Suggested People to Follow</h3>
                        <div className="space-y-4">
                            {SUGGESTED_USERS.map((user, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-gray-800" />
                                        <div className="overflow-hidden">
                                            <h4 className="text-xs font-bold text-white truncate w-24">{user.name}</h4>
                                            <p className="text-[10px] text-gray-500 truncate">{user.handle}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFollow(user.handle)}
                                        className={`p-1.5 rounded-lg transition-colors ${following[user.handle]
                                                ? 'text-gray-500 bg-white/5'
                                                : 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20'
                                            }`}
                                    >
                                        {following[user.handle] ? <CheckCircle size={14} /> : <Plus size={14} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

// Helper for check circle since I didn't import CheckCircle in the main list above, 
// just adding it here or adding to imports. 
// Ah, I missed importing CheckCircle. Let me add it to the imports at top or use a different icon.
// I'll grab CheckCircle from lucide-react in the SVG render to be safe or update imports.
// Actually, I'll update the imports now in the component definition above.

function CheckCircle({ size = 16, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );
}

export default GroupDecision;
