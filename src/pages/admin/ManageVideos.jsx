import React, { useState } from 'react';
import { videosBySubject } from '../../data/videosData';
import { Video, Plus, Edit2, Trash2, ExternalLink, Play } from 'lucide-react';

const ManageVideos = () => {
    // Check key types to guess exam OR just map all
    const getAllVideos = () => {
        let all = [];
        Object.keys(videosBySubject).forEach(subject => {
            const list = videosBySubject[subject].map(v => ({
                ...v,
                exam: ['Physics', 'Chemistry', 'Maths'].includes(subject) ? 'JEE' :
                    ['Biology'].includes(subject) ? 'NEET' :
                        'MBBS', // Simple heuristic
                subject
            }));
            all = [...all, ...list];
        });
        return all;
    };

    const [videos, setVideos] = useState(getAllVideos());
    const [filterExam, setFilterExam] = useState('All');

    const handleDelete = (id) => {
        if (confirm('Delete this video?')) {
            setVideos(videos.filter(v => v.id !== id));
        }
    };

    const filtered = filterExam === 'All' ? videos : videos.filter(v => v.exam === filterExam);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Videos</h1>
                    <p className="text-gray-500">Curate educational content for JEE & NEET</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-lg hover:shadow-blue-200 transition-all hover:-translate-y-0.5">
                    <Plus size={20} />
                    Add Video
                </button>
            </header>

            {/* Admin Filters */}
            <div className="flex gap-2">
                {['All', 'JEE', 'NEET', 'MBBS'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilterExam(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filterExam === f ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative aspect-video bg-gray-100">
                            {/* Placeholder for thumbnail if actual image fails */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                <Video size={32} />
                            </div>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/40 transition-colors">
                                    <Play size={20} fill="currentColor" />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                                <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                                    {video.exam}
                                </span>
                                <span className="bg-primary/90 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                                    {video.platform}
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${video.subject === 'Physics' ? 'bg-purple-100 text-purple-600' :
                                    video.subject === 'Chemistry' ? 'bg-green-100 text-green-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                    {video.subject}
                                </span>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(video.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-800 line-clamp-1 mb-1" title={video.title}>{video.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{video.views} views</span>
                                <span>•</span>
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                    Link <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <button className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all min-h-[300px]">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="font-medium">Add New Video</span>
                </button>
            </div>
        </div>
    );
};

export default ManageVideos;
