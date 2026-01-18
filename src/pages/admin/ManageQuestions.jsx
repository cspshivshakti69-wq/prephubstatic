import React, { useState } from 'react';

import { QUESTION_DATA } from '../../data/questions';
import { FileQuestion, Plus, Trash2, CheckCircle } from 'lucide-react';

const ManageQuestions = () => {
    // Flatten questions
    const getAllQuestions = () => {
        let all = [];
        // Handle JEE, NEET, MBBS structure
        Object.keys(QUESTION_DATA).forEach(exam => {
            Object.keys(QUESTION_DATA[exam]).forEach(subject => {
                const questions = QUESTION_DATA[exam][subject].map(q => ({ ...q, exam, subject }));
                all = [...all, ...questions];
            });
        });
        return all;
    };

    const [questions, setQuestions] = useState(getAllQuestions());
    const [filterExam, setFilterExam] = useState('All');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newMsg, setNewMsg] = useState({ text: '', correct: 'a', exam: 'MBBS', subject: 'University' });

    const filtered = filterExam === 'All' ? questions : questions.filter(q => q.exam === filterExam);

    const handleDelete = (id) => {
        if (confirm("Delete this question?")) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Question Bank Manager</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={18} /> Add Question
                </button>
            </header>

            {/* Filters */}
            <div className="flex gap-2 pb-4 border-b border-gray-100">
                {['All', 'JEE', 'NEET', 'MBBS'].map(e => (
                    <button
                        key={e}
                        onClick={() => setFilterExam(e)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold ${filterExam === e ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        {e}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                {filtered.slice(0, 50).map((q, idx) => (
                    <div key={idx} className="p-4 border-b last:border-0 hover:bg-gray-50 flex gap-4 items-start">
                        <div className="mt-1 text-gray-400"><FileQuestion size={20} /></div>
                        <div className="flex-1">
                            <div className="flex gap-2 mb-1">
                                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{q.exam}</span>
                                <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded font-bold uppercase">{q.subject}</span>
                            </div>
                            <p className="font-medium text-gray-800 mb-2">{q.text}</p>
                            <div className="flex gap-2 text-sm">
                                <span className={q.correctAnswer === 'a' ? 'text-green-600 font-bold' : 'text-gray-400'}>A</span>
                                <span className={q.correctAnswer === 'b' ? 'text-green-600 font-bold' : 'text-gray-400'}>B</span>
                                <span className={q.correctAnswer === 'c' ? 'text-green-600 font-bold' : 'text-gray-400'}>C</span>
                                <span className={q.correctAnswer === 'd' ? 'text-green-600 font-bold' : 'text-gray-400'}>D</span>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(q.id)} className="text-gray-300 hover:text-red-500">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageQuestions;
