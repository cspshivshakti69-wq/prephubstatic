import React, { useState } from 'react';
import { videoResources } from '../../data/dummyData';
import { Play, Search, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';

const VideosPage = () => {
    const [platform, setPlatform] = useState('Physics Wallah');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeVideoId, setActiveVideoId] = useState(null);

    // Filter videos based on platform and search
    const filteredVideos = videoResources.filter(v =>
        v.platform === platform &&
        (v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const opts = {
        height: '480',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const getVideoId = (url) => {
        // Simple parser for youtube URL
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Video Tutorials</h1>

                {/* Platform Toggle */}
                <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm">
                    {['Physics Wallah', 'Unacademy'].map((p) => (
                        <button
                            key={p}
                            onClick={() => { setPlatform(p); setActiveVideoId(null); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${platform === p
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Player Modal/Section */}
            <AnimatePresence>
                {activeVideoId && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black relative"
                    >
                        <div className="aspect-video w-full">
                            <YouTube videoId={activeVideoId} opts={opts} className="w-full h-full" />
                        </div>
                        <button
                            onClick={() => setActiveVideoId(null)}
                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 font-bold"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder={`Search ${platform} lectures...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => {
                    const vId = getVideoId(video.url) || 'dQw4w9WgXcQ'; // Fallback
                    return (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                            onClick={() => setActiveVideoId(vId)}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gray-100 group-hover:opacity-90 transition-opacity">
                                <img src={`https://img.youtube.com/vi/${vId}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                        <Play className="fill-primary text-primary ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                                        {video.platform}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">• {video.exam}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-500">{video.subject}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredVideos.length === 0 && (
                <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed">
                    <GraduationCap size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No videos found for {platform}. Try searching for something else!</p>
                </div>
            )}
        </div>
    );
};

export default VideosPage;
