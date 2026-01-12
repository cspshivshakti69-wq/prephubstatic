import React, { useState } from 'react';
import { quizzes } from '../../data/dummyData';
import { Search, Filter, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionBankPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Flatten questions from quizzes for the bank view
    const allQuestions = quizzes.flatMap(quiz =>
        quiz.questions.map(q => ({
            ...q,
            exam: quiz.exam,
            subject: quiz.subject,
            difficulty: quiz.difficulty
        }))
    );

    const filteredQuestions = allQuestions.filter(q =>
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search thousands of questions..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">Question</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Subject</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Exam</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Difficulty</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredQuestions.map((q) => (
                                <React.Fragment key={q.id}>
                                    <tr className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-800 line-clamp-2">{q.text}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{q.subject}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{q.exam}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${q.difficulty === 'Easy' ? 'text-green-600 bg-green-100' :
                                                    q.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-100' :
                                                        'text-red-600 bg-red-100'
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                                                className="text-primary hover:bg-blue-100 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                                            >
                                                <Eye size={18} /> {expandedId === q.id ? 'Hide' : 'View'}
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Expanded View */}
                                    {expandedId === q.id && (
                                        <tr className="bg-blue-50/30">
                                            <td colSpan="5" className="px-6 py-6 border-b border-gray-100">
                                                <div className="space-y-4 max-w-3xl">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {q.options.map((opt, i) => (
                                                            <div key={i} className={`p-3 rounded-lg border ${i === q.correct ? 'bg-green-100 border-green-200 text-green-800 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}>
                                                                {String.fromCharCode(65 + i)}. {opt}
                                                                {i === q.correct && <CheckCircle size={16} className="float-right mt-1" />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="bg-blue-100 p-4 rounded-xl text-sm border border-blue-200 text-blue-800">
                                                        <strong>Explanation:</strong> {q.explanation}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredQuestions.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No questions found matching your search.</div>
                )}
            </div>
        </div>
    );
};

export default QuestionBankPage;
