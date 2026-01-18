import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Search, Upload, FileText,
    Download, Bot, Sparkles, X, Plus, BookOpen
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NotePDF from '../../components/pdf/NotePDF';
import { notesData } from '../../data/notesData';
import { neetPyqNotes } from '../../data/neetPyqNotesData';

const MagicNotes = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('Main'); // 'Main', 'NEET_PYQ'
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [viewingNote, setViewingNote] = useState(null); // For View Note Modal

    // Flatten notes for the grid view safely
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        try {
            if (viewMode === 'Main') {
                setAllNotes(notesData || []);
                console.log("Main Notes loaded:", (notesData || []).length);
            } else {
                setAllNotes(neetPyqNotes || []);
                console.log("NEET PYQ Notes loaded:", (neetPyqNotes || []).length);
            }
        } catch (e) {
            console.error("Error loading notes:", e);
            setAllNotes([]);
        }
    }, [viewMode]);

    const filteredNotes = (allNotes || []).filter(note =>
        (selectedCategory === 'All' || note.subject === selectedCategory) &&
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDownload = (noteTitle) => {
        // Fallback simple download action if PDF generator fails or for direct interaction
        alert(`Initiating download for "${noteTitle}"...`);
    };

    const NoteCard = ({ note }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -8, boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" }}
            className="group relative bg-[#141928]/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 overflow-hidden transition-all duration-300"
        >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
                        <FileText size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/60 bg-cyan-900/20 px-2 py-1 rounded-md border border-cyan-500/10">
                        {note.subject}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[56px] group-hover:text-cyan-200 transition-colors">
                    {note.title}
                </h3>

                <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    {note.author}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => setViewingNote(note)}
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {note.viewButtonText || "View Note"} <Zap size={14} />
                    </button>

                    <button
                        onClick={() => handleDownload(note.title)}
                        className="p-2.5 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors h-full flex items-center justify-center"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen text-gray-100 font-sans selection:bg-cyan-500/30 bg-[#0a0d14]">
            {/* Header Section */}
            <header className="relative mb-12">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
                    <div>
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter mb-2"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                                MAGIC NOTES
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg font-light tracking-wide flex items-center gap-2"
                        >
                            Explore 200+ expert resources and PYQ summaries.
                            <Sparkles size={16} className="text-cyan-400" />
                        </motion.p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => { setViewMode('Main'); setSelectedCategory('All'); }}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${viewMode === 'Main'
                                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50'
                                }`}
                        >
                            Main Library
                        </button>
                        <button
                            onClick={() => { setViewMode('NEET_PYQ'); setSelectedCategory('All'); }}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${viewMode === 'NEET_PYQ'
                                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50'
                                }`}
                        >
                            NEET PYQ Notes
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Grid */}
                <div className="flex-1">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map(note => <NoteCard key={note.id} note={note} />)
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-500">
                                <p className="text-xl">No notes found for "{selectedCategory}"</p>
                                <button onClick={() => setSelectedCategory('All')} className="mt-4 text-cyan-400 font-bold underline">Clear Filters</button>
                            </div>
                        )}

                        {/* New Note Placeholder */}
                        <motion.div
                            whileHover={{ scale: 1.02, borderStyle: 'solid' }}
                            onClick={() => setIsUploadModalOpen(true)}
                            className="border-2 border-dashed border-gray-700 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer group bg-black/20 backdrop-blur-sm min-h-[300px] transition-all"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-800 group-hover:bg-cyan-500/20 flex items-center justify-center mb-4 transition-colors">
                                <Plus size={32} className="text-gray-500 group-hover:text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">Add Custom Note</h3>
                            <p className="text-sm text-gray-600 mt-2">Personalize your study bank</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 space-y-6">
                    {/* Search Panel */}
                    <div className="bg-[#141928]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl sticky top-24">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Subject Filters</h3>
                            {['All', 'Physics', 'Chemistry', 'Maths', 'Biology'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition-all ${selectedCategory === cat
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span className="font-medium">{cat}</span>
                                    {selectedCategory === cat && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 text-purple-300 flex items-center justify-center gap-2 hover:bg-purple-900/70 transition-colors">
                                <Bot size={18} />
                                AI Note Analyzer
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* View Note Modal */}
            <AnimatePresence>
                {viewingNote && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setViewingNote(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0f172a] border border-cyan-500/30 w-full max-w-4xl h-[80vh] rounded-3xl relative z-50 shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-900/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{viewingNote.title}</h2>
                                    <p className="text-cyan-400 text-sm">By {viewingNote.author}</p>
                                </div>
                                <button onClick={() => setViewingNote(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto bg-black/20">
                                <div className="max-w-2xl mx-auto space-y-6">
                                    <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-200 flex gap-4 items-start">
                                        <BookOpen className="shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Knowledge Preview</h4>
                                            <p className="text-sm opacity-80">You are viewing the summary for "{viewingNote.title}". Download the full PDF for complete study materials.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-gray-300 leading-relaxed">
                                        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Description</h3>
                                        <p>{viewingNote.shortDescription}</p>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Author</span>
                                                <span className="text-lg font-bold text-white">{viewingNote.author}</span>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Category</span>
                                                <span className="text-lg font-bold text-white">{viewingNote.subject}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-gray-900/50 flex justify-end gap-4">
                                <button onClick={() => setViewingNote(null)} className="px-6 py-3 rounded-xl text-gray-400 hover:text-white font-bold transition-colors">
                                    Close
                                </button>
                                <button onClick={() => handleDownload(viewingNote.title)} className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                    Download Full Resource
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Upload Modal (Visual Only) */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsUploadModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0f172a] border border-cyan-500/30 p-8 rounded-3xl w-full max-w-lg relative z-50 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                        >
                            <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                <X size={24} />
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400">
                                    <CloudUpload size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Note Repository</h2>
                                <p className="text-gray-400">Search or upload high-quality study materials</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 mb-6 text-center hover:border-cyan-500/50 transition-colors cursor-pointer bg-black/20">
                                <p className="text-gray-500">Drop files to add to your library</p>
                            </div>

                            <button onClick={() => setIsUploadModalOpen(false)} className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors">
                                Upload Now
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper Icon for Modal
const CloudUpload = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export default MagicNotes;
