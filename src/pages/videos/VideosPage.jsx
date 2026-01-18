import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Clock, Filter, Search, Zap, X } from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore'; // Import hook

const VideosPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('Main'); // 'Main', 'JEE_PYQ', 'NEET_PYQ'
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all videos from Firestore
    const { data: firestoreVideos, loading } = useFirestore('videos');
    const [allVideos, setAllVideos] = useState([]);

    useEffect(() => {
        if (loading) return;

        // Filter videos based on viewMode using the data from Firestore
        // We assume Firestore data has 'category_key' or 'category' that maps to these modes
        // For now, simple client-side logic to mimic previous behavior
        let filtered = [];
        if (viewMode === 'Main') {
            filtered = firestoreVideos.filter(v =>
                !v.category_key?.includes('PYQ') && !v.category_key?.includes('CodeWithHarry') && v.category_key !== 'MBBS'
            );
        } else if (viewMode === 'JEE_PYQ') {
            filtered = firestoreVideos.filter(v => v.category_key?.includes('JEE PYQ') || v.category_key === 'JEE Chemistry PYQ' || v.category_key === 'JEE Maths PYQ');
        } else if (viewMode === 'NEET_PYQ') {
            filtered = firestoreVideos.filter(v => v.category_key?.includes('NEET PYQ'));
        } else if (viewMode === 'MBBS') {
            filtered = firestoreVideos.filter(v => v.category_key === 'MBBS');
        } else if (viewMode === 'Engineering') {
            filtered = firestoreVideos.filter(v => v.category_key === 'CodeWithHarry');
        }

        // If data structure differs, we might need adjustments. 
        // For simple migration, we trust 'category_key' to hold the subject/type string.
        setAllVideos(filtered.length > 0 ? filtered : firestoreVideos); // Fallback to all if logic fails? No, better empty.

        // Actually, just set allVideos to the filtered list
        setAllVideos(filtered);

    }, [viewMode, firestoreVideos, loading]);

    const filteredVideos = (allVideos || []).filter(v => {
        const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
        const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.channel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    const VideoCard = ({ video }) => {
        const [isLoaded, setIsLoaded] = useState(false);

        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-[#1a1f2e] border border-cyan-500/20 rounded-2xl overflow-hidden group cursor-pointer shadow-lg shadow-black/40"
                onClick={() => setPlayingVideoId(video.videoId)}
            >
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={video.title}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={(e) => {
                            e.target.src = "https://img.youtube.com/vi/HcfVZzf1H3Y/hqdefault.jpg";
                            setIsLoaded(true);
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                            <Play fill="black" size={24} className="ml-1" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-mono border border-white/10">
                        {video.duration || "00:00"}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {video.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                            <Zap size={12} className="text-cyan-500" />
                            {video.channel}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-500 text-[10px] items-center flex gap-1">
                                <Star size={10} className="text-yellow-500" />
                                {video.rating || "4.8 ★ • 1.2M views"}
                            </p>
                            <span className="text-[10px] text-cyan-500/60 font-bold uppercase tracking-tighter">
                                {video.category}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-6 md:p-10 font-sans">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                        VIDEO PORTAL
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 tracking-widest font-light">ACCESS ELITE KNOWLEDGE STREAMS</p>
                </div>

                <div className="relative w-full md:w-96 flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50" size={18} />
                        <input
                            type="text"
                            placeholder="Search video library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#161b29] border border-cyan-500/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
                        />
                    </div>
                    <button
                        onClick={() => {
                            const url = prompt("Enter YouTube URL:");
                            if (url) {
                                // Simple extraction of ID for demo
                                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                const match = url.match(regExp);
                                if (match && match[2].length === 11) {
                                    const videoId = match[2];
                                    const title = prompt("Enter Video Title:") || "New Video";
                                    const newVideo = {
                                        id: Date.now(),
                                        videoId: videoId,
                                        title: title,
                                        channel: "User Added",
                                        category: selectedCategory !== 'All' ? selectedCategory : 'General',
                                        duration: "New"
                                    };
                                    setAllVideos(prev => [newVideo, ...prev]);
                                    alert("Video Added!");
                                } else {
                                    alert("Invalid YouTube URL");
                                }
                            }
                        }}
                        className="bg-cyan-500 text-black p-4 rounded-full font-bold hover:bg-cyan-400 transition-colors"
                        title="Add YouTube Video"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* View Mode Switching */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
                {[
                    { id: 'Main', label: 'Recommended Videos' },
                    { id: 'JEE_PYQ', label: 'JEE PYQ Solutions' },
                    { id: 'NEET_PYQ', label: 'NEET PYQ Solutions' },
                    { id: 'MBBS', label: 'MBBS Videos' },
                    { id: 'Engineering', label: 'Engineering / CodeWithHarry' }
                ].map(mode => (
                    <button
                        key={mode.id}
                        onClick={() => { setViewMode(mode.id); setSelectedCategory('All'); }}
                        className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${viewMode === mode.id
                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                            : 'bg-transparent border-cyan-500/20 text-cyan-500/60 hover:border-cyan-500/50'
                            }`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter */}
                <aside className="w-full lg:w-48 flex-shrink-0">
                    <div className="sticky top-10 space-y-2">
                        <div className="flex items-center gap-2 text-cyan-500/70 mb-4 px-2">
                            <Filter size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
                        </div>
                        {['All', 'Physics', 'Chemistry', 'Maths', 'Biology'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setPlayingVideoId(null); }}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <AnimatePresence mode="wait">
                        {filteredVideos.length > 0 ? (
                            <motion.div
                                key={viewMode + selectedCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            >
                                {filteredVideos.map((video) => (
                                    <VideoCard key={video.id + video.videoId} video={video} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-500">
                                <p className="text-xl">No videos found for this subject.</p>
                                <button onClick={() => setSelectedCategory('All')} className="mt-4 text-cyan-400 font-bold underline">Show all videos</button>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Load More Trigger Area */}
                    <div className="mt-12 text-center pb-10">
                        <button className="px-10 py-4 border border-cyan-500/30 rounded-full text-cyan-500 font-bold text-sm tracking-widest hover:bg-cyan-500/10 transition-all hover:scale-105 active:scale-95">
                            LOAD MORE CONTENT
                        </button>
                    </div>
                </main>
            </div>

            {/* Video Player Modal */}
            <AnimatePresence>
                {playingVideoId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                            onClick={() => setPlayingVideoId(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-black w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(0,245,255,0.2)] relative z-10"
                        >
                            <button
                                onClick={() => setPlayingVideoId(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <X size={24} />
                            </button>
                            <YouTube
                                videoId={playingVideoId}
                                opts={opts}
                                className="w-full h-full"
                                onReady={(e) => {
                                    console.log("Player Ready");
                                }}
                                onError={(e) => {
                                    console.error("YouTube Error:", e);
                                    alert("Video unavailable. Please try another one.");
                                    setPlayingVideoId(null);
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideosPage;
