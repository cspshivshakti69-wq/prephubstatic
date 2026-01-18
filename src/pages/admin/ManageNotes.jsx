import React, { useState } from 'react';
import { NOTES_DATA } from '../../data/notesData';
import { FileText, Plus, Trash2, Folder, Save } from 'lucide-react';

const ManageNotes = () => {
    // Flatten data for admin view
    const getInitialNotes = () => {
        let all = [];
        Object.keys(NOTES_DATA).forEach(exam => {
            Object.keys(NOTES_DATA[exam]).forEach(subject => {
                const list = NOTES_DATA[exam][subject].map(n => ({ ...n, exam, subject }));
                all = [...all, ...list];
            });
        });
        return all;
    };

    const [notes, setNotes] = useState(getInitialNotes());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', author: '', exam: 'JEE', subject: 'Physics', type: 'PDF' });

    const handleDelete = (id) => {
        if (confirm('Delete this note?')) {
            setNotes(notes.filter(n => n.id !== id));
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const note = {
            id: Date.now().toString(),
            ...newNote,
            link: '#'
        };
        setNotes([note, ...notes]);
        setIsFormOpen(false);
        setNewNote({ title: '', author: '', exam: 'JEE', subject: 'Physics', type: 'PDF' });
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Notes</h1>
                    <p className="text-gray-500">Upload and organize study materials</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-lg hover:shadow-blue-200 transition-all hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    Upload Note
                </button>
            </header>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-gray-800 mb-4">Add New Resource</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="bg-gray-50 p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Title (e.g., HC Verma Solutions)"
                            value={newNote.title}
                            onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                            required
                        />
                        <input
                            className="bg-gray-50 p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Author (e.g., HC Verma)"
                            value={newNote.author}
                            onChange={e => setNewNote({ ...newNote, author: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                className="bg-gray-50 p-3 rounded-lg border outline-none"
                                value={newNote.exam}
                                onChange={e => setNewNote({ ...newNote, exam: e.target.value })}
                            >
                                <option>JEE</option>
                                <option>NEET</option>
                                <option>MBBS</option>
                            </select>
                            <select
                                className="bg-gray-50 p-3 rounded-lg border outline-none"
                                value={newNote.subject}
                                onChange={e => setNewNote({ ...newNote, subject: e.target.value })}
                            >
                                <option>Physics</option>
                                <option>Chemistry</option>
                                <option>Maths</option>
                                <option>Biology</option>
                                <option>Anatomy</option>
                                <option>Physiology</option>
                                <option>Pathology</option>
                                <option>Pharmacology</option>
                            </select>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold flex-1">
                                Save Resource
                            </button>
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-bold">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Author</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {notes.map(note => (
                            <tr key={note.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                                    <FileText size={18} className="text-gray-400" />
                                    {note.title}
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold mr-2">{note.exam}</span>
                                    {note.subject}
                                </td>
                                <td className="p-4 text-sm text-gray-500">{note.author}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageNotes;
