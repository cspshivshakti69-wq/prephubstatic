import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FileText, Download, Plus, PenTool, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock notes data
const initialNotes = [
    { id: 1, title: 'JEE Physics - Mechanics Formulae', author: 'HC Verma', subject: 'Physics', content: '# Mechanics\n\n## Newton\'s Laws\n1. F = ma\n2. Action = Reaction\n\n## Work Energy\n- KE = 1/2 mv^2\n- PE = mgh' },
    { id: 2, title: 'Organic Chemistry Reactions', author: 'OP Tandon', subject: 'Chemistry', content: '# Reactions\n\n## SN1 vs SN2\n- SN1: Unimolecular, Carbocation intermediate\n- SN2: Bimolecular, Concerted mechanism' },
    { id: 3, title: 'Calculus Cheat Sheet', author: 'RD Sharma', subject: 'Mathematics', content: '# Calculus\n- d/dx(sin x) = cos x\n- Int(x^n) = x^(n+1)/(n+1)' },
];

const NotesPage = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');

    const handleSelectNote = (note) => {
        setSelectedNote(note);
        setIsEditing(false);
        setEditContent(note.content);
    };

    const handleCreateNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            author: 'Me',
            subject: 'General',
            content: '# New Note\nStart typing...'
        };
        setNotes([newNote, ...notes]);
        handleSelectNote(newNote);
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedNotes = notes.map(n =>
            n.id === selectedNote.id ? { ...n, content: editContent } : n
        );
        setNotes(updatedNotes);
        setSelectedNote({ ...selectedNote, content: editContent });
        setIsEditing(false);
    };

    const handleDelete = () => {
        const updatedNotes = notes.filter(n => n.id !== selectedNote.id);
        setNotes(updatedNotes);
        setSelectedNote(null);
        setIsEditing(false);
    };

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Sidebar List */}
            <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="font-bold text-gray-800">My Notes</h2>
                    <button
                        onClick={handleCreateNote}
                        className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {notes.map(note => (
                        <motion.div
                            key={note.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSelectNote(note)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedNote?.id === note.id
                                    ? 'border-primary bg-blue-50 shadow-sm'
                                    : 'border-gray-100 bg-white hover:border-blue-200'
                                }`}
                        >
                            <h3 className="font-bold text-gray-800 mb-1">{note.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{note.subject}</span>
                                <span>By {note.author}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Editor/Viewer */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                {selectedNote ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedNote.title}</h2>
                                <p className="text-sm text-gray-500">Based on {selectedNote.author}</p>
                            </div>
                            <div className="flex gap-2">
                                {isEditing ? (
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 shadow-sm"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
                                    >
                                        <PenTool size={16} /> Edit
                                    </button>
                                )}
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover shadow-sm">
                                    <Download size={16} /> PDF
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto">
                            {isEditing ? (
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full h-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-mono text-sm resize-none"
                                    placeholder="Type your markdown notes here..."
                                />
                            ) : (
                                <div className="prose max-w-none prose-blue">
                                    <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <FileText size={64} className="mb-4 opacity-20" />
                        <p>Select a note to view or create a new one.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesPage;
