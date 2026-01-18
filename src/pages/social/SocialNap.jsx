import React, { useState, useEffect, useRef } from 'react';
import {
    Heart, MessageCircle, Share2, Video, Users, Phone, Plus,
    Mic, MicOff, VideoOff, LogOut, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import Video from 'twilio-video'; // Uncomment if using real Twilio

// --- Dummy Data ---
const FEED_POSTS = [
    {
        id: 1,
        user: { name: 'IdeaGuru99', avatar: 'https://i.pravatar.cc/150?u=IdeaGuru99', handle: '@ideaguru' },
        title: 'Project Alpha: Group Study Session',
        content: 'Hey everyone, join the call to discuss Rotational Motion problems!',
        poll: { yes: 85, no: 15, totalVotes: 420 },
        likes: 142,
        comments: 12,
        isLiked: false
    },
    {
        id: 2,
        user: { name: 'NeuroNerd', avatar: 'https://i.pravatar.cc/150?u=Neuro', handle: '@neuronerd' },
        title: 'Flashcard Challenge?',
        content: 'Thinking of starting a biology flashcard marathon tonight. Who is in?',
        poll: { yes: 60, no: 40, totalVotes: 120 },
        likes: 45,
        comments: 5,
        isLiked: true
    }
];

const SUGGESTED_USERS = [
    { name: 'QuantumQueen', handle: '@physics_queen', avatar: 'https://i.pravatar.cc/150?u=Quantum' },
    { name: 'ChemWiz', handle: '@chem_master', avatar: 'https://i.pravatar.cc/150?u=Chem' },
    { name: 'MathNinja', handle: '@integration_god', avatar: 'https://i.pravatar.cc/150?u=Math' },
];

const SocialNap = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(FEED_POSTS);
    const [isInCall, setIsInCall] = useState(false);
    const [callParticipants, setCallParticipants] = useState([
        { id: 'local', name: 'You', isLocal: true, videoOn: true, audioOn: true },
        { id: 'p1', name: 'Alex', isLocal: false, videoOn: true, audioOn: true },
        { id: 'p2', name: 'Sam', isLocal: false, videoOn: false, audioOn: true },
        { id: 'p3', name: 'Jordan', isLocal: false, videoOn: true, audioOn: false },
    ]);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    // --- Mock Token Fetch & Room Join ---
    const joinCall = async (roomName) => {
        // In a real app:
        // const token = await fetch('/api/token', { method: 'POST', body: JSON.stringify({ identity: user.name, room: roomName }) }).then(r => r.json());
        // Video.connect(token, { name: roomName }).then(room => { ... });

        console.log(`Joining mock room: ${roomName}`);
        setIsInCall(true);
    };

    const leaveCall = () => {
        setIsInCall(false);
    };

    const toggleAudio = () => {
        setIsMuted(!isMuted);
        setCallParticipants(prev => prev.map(p => p.isLocal ? { ...p, audioOn: !isMuted } : p));
    };

    const toggleVideo = () => {
        setIsVideoOff(!isVideoOff);
        setCallParticipants(prev => prev.map(p => p.isLocal ? { ...p, videoOn: !isVideoOff } : p));
    };

    const handleVote = (postId, type) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                const total = p.poll.totalVotes + 1;
                const newYes = type === 'yes' ?
                    Math.round(((p.poll.yes * p.poll.totalVotes / 100) + 1) / total * 100) :
                    Math.round(((p.poll.yes * p.poll.totalVotes / 100)) / total * 100);
                return { ...p, poll: { ...p.poll, yes: newYes, no: 100 - newYes, totalVotes: total } };
            }
            return p;
        }));
    };

    const ActiveCallGrid = () => (
        <div className="grid grid-cols-2 gap-2 h-full">
            {callParticipants.map(participant => (
                <div key={participant.id} className={`relative bg-gray-900 rounded-xl overflow-hidden border border-white/10 ${participant.isLocal ? 'border-cyan-500/50' : ''}`}>
                    {participant.videoOn ? (
                        <img
                            src={`https://i.pravatar.cc/300?u=${participant.name}`}
                            alt={participant.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold text-white">
                                {participant.name[0]}
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-md text-xs font-bold text-white flex items-center gap-2">
                        {participant.name} {participant.isLocal && '(You)'}
                        {!participant.audioOn && <MicOff size={10} className="text-red-500" />}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-gray-400" />
                </button>
                <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Social Nap
                </h1>
            </div>

            <div className="container mx-auto max-w-7xl pt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
                {/* Left Sidebar (Navigation) */}
                <aside className="hidden lg:flex lg:col-span-2 flex-col gap-2">
                    {['Feed', 'Chats', 'Calls', 'My Network'].map((item) => (
                        <button key={item} className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${item === 'Feed' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                            {item}
                        </button>
                    ))}
                </aside>

                {/* Main Feed */}
                <main className="lg:col-span-6 space-y-6 overflow-y-auto custom-scrollbar pr-2">
                    {posts.map(post => (
                        <div key={post.id} className="bg-[#111] border border-white/10 rounded-2xl p-4 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={post.user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-white/10" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">{post.user.name}</h3>
                                    <p className="text-[10px] text-gray-500">{post.user.handle}</p>
                                </div>
                                <button className="ml-auto text-xs font-bold text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-lg hover:bg-cyan-500/10 transition-colors">Follow</button>
                            </div>

                            <h4 className="font-bold text-lg mb-2">{post.title}</h4>
                            <p className="text-gray-400 text-sm mb-4">{post.content}</p>

                            {/* Poll */}
                            <div className="bg-black/40 rounded-xl p-3 mb-4 border border-white/5">
                                <div className="flex h-10 rounded-lg overflow-hidden cursor-pointer relative">
                                    <motion.div
                                        onClick={() => handleVote(post.id, 'yes')}
                                        initial={{ width: `${post.poll.yes}%` }}
                                        animate={{ width: `${post.poll.yes}%` }}
                                        className="bg-green-500 flex items-center justify-start px-3 text-black font-bold text-xs hover:bg-green-400 transition-colors"
                                    >
                                        YES {post.poll.yes}%
                                    </motion.div>
                                    <motion.div
                                        onClick={() => handleVote(post.id, 'no')}
                                        initial={{ width: `${post.poll.no}%` }}
                                        animate={{ width: `${post.poll.no}%` }}
                                        className="bg-red-500 flex items-center justify-end px-3 text-white font-bold text-xs hover:bg-red-400 transition-colors"
                                    >
                                        NO {post.poll.no}%
                                    </motion.div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 transition-colors text-xs font-bold"><Heart size={16} /> {post.likes}</button>
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-400 transition-colors text-xs font-bold"><MessageCircle size={16} /> {post.comments}</button>
                                </div>
                                <button onClick={() => joinCall(post.title)} className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-cyan-500/20 transition-all border border-cyan-500/30 animate-pulse">
                                    <Video size={14} /> Join Call
                                </button>
                            </div>
                        </div>
                    ))}
                </main>

                {/* Right Sidebar (Calls & Suggestions) */}
                <aside className="hidden lg:block lg:col-span-4 space-y-6">
                    {/* Active Group Call Widget */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-4 h-80 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white flex items-center gap-2"><Phone size={16} className="text-green-400" /> Active Call</h3>
                            {isInCall && <span className="text-xs text-red-400 font-bold animate-pulse">● LIVE</span>}
                        </div>

                        <div className="flex-1 bg-black rounded-xl overflow-hidden mb-4 relative">
                            {isInCall ? (
                                <ActiveCallGrid />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                                        <VideoOff size={24} />
                                    </div>
                                    <p className="text-sm font-bold">No active call</p>
                                    <p className="text-xs">Join a group from the feed to start talking!</p>
                                </div>
                            )}
                        </div>

                        {isInCall && (
                            <div className="flex justify-center gap-4">
                                <button onClick={toggleAudio} className={`p-3 rounded-full ${isMuted ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-gray-800 text-white border-white/10'} border transition-colors`}><Mic size={18} /></button>
                                <button onClick={toggleVideo} className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-gray-800 text-white border-white/10'} border transition-colors`}><Video size={18} /></button>
                                <button onClick={leaveCall} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full text-sm transition-colors shadow-lg shadow-red-600/20">Leave</button>
                            </div>
                        )}
                    </div>

                    {/* Suggested People */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
                        <h3 className="font-bold text-white text-sm mb-4">Suggested to Follow</h3>
                        <div className="space-y-4">
                            {SUGGESTED_USERS.map((u, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={u.avatar} alt="u" className="w-8 h-8 rounded-full bg-gray-800" />
                                        <div className="truncate">
                                            <p className="text-xs font-bold text-white">{u.name}</p>
                                            <p className="text-[10px] text-gray-500">{u.handle}</p>
                                        </div>
                                    </div>
                                    <button className="text-cyan-400 hover:bg-cyan-500/10 p-1.5 rounded-lg transition-colors"><Plus size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SocialNap;
