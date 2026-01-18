import React, { useState } from 'react';
import { NOTES_DATA } from '../../data/notesData';
import { FileText, Download, Folder, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotesPage = () => {
    const [selectedExam, setSelectedExam] = useState('JEE');
    const [expandedSubject, setExpandedSubject] = useState(null);

    const subjects = NOTES_DATA[selectedExam];

    const toggleSubject = (subject) => {
        setExpandedSubject(expandedSubject === subject ? null : subject);
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Study Notes Library</h1>
                    <p className="text-gray-500">Comprehensive notes from top authors and sources.</p>
                </div>

                {/* Exam Toggle */}
                <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm">
                    {['JEE', 'NEET'].map((e) => (
                        <button
                            key={e}
                            onClick={() => { setSelectedExam(e); setExpandedSubject(null); }}
                            className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${selectedExam === e
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {e} Notes
                        </button>
                    ))}
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px]">
                {/* Decorative Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-gray-700 uppercase tracking-wider text-sm">Subject Categories</span>
                    <span className="text-sm text-gray-400">{Object.keys(subjects).length} Subjects Available</span>
                </div>

                {/* Accordion List */}
                <div className="divide-y divide-gray-100">
                    {Object.keys(subjects).map((subject) => (
                        <div key={subject} className="bg-white">
                            <button
                                onClick={() => toggleSubject(subject)}
                                className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${subject === 'Physics' ? 'bg-purple-500 shadow-purple-200' :
                                        subject === 'Chemistry' ? 'bg-green-500 shadow-green-200' :
                                            subject === 'Maths' ? 'bg-blue-500 shadow-blue-200' :
                                                'bg-orange-500 shadow-orange-200'
                                        }`}>
                                        <Folder size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">{subject}</h3>
                                        <p className="text-xs text-gray-400 font-medium">{subjects[subject].length} Resources</p>
                                    </div>
                                </div>
                                {expandedSubject === subject ? <ChevronDown className="text-primary" /> : <ChevronRight className="text-gray-300" />}
                            </button>

                            <AnimatePresence>
                                {expandedSubject === subject && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-gray-50/50 overflow-hidden"
                                    >
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {subjects[subject].map((note) => (
                                                <div key={note.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                                            {note.type}
                                                        </span>
                                                        <FileText size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                                                    </div>

                                                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 min-h-[40px]">{note.title}</h4>
                                                    <p className="text-sm text-gray-500 mb-4">By {note.author}</p>

                                                    <a
                                                        href={note.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-full text-center py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                                                    >
                                                        {note.type === 'Drive' ? (
                                                            <>
                                                                Open Folder <ExternalLink size={14} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                Download <Download size={14} />
                                                            </>
                                                        )}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
