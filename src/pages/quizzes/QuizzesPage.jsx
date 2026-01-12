import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizzes, exams } from '../../data/dummyData';
import AnimeMascot from '../../components/anime/AnimeMascot';
import { Search, Filter, Clock, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizzesPage = () => {
    const [selectedExam, setSelectedExam] = useState('All Exams');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredQuizzes = quizzes.filter(quiz => {
        return (
            (selectedExam === 'All Exams' || quiz.exam === selectedExam) &&
            (selectedLevel === 'All Levels' || quiz.difficulty === selectedLevel) &&
            (searchQuery === '' || quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Practice Quizzes</h1>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {/* Filters */}
                    <select
                        className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                    >
                        <option>All Exams</option>
                        {exams.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>

                    <select
                        className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option>All Levels</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search subject..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredQuizzes.map((quiz) => (
                    <motion.div
                        key={quiz.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative"
                    >
                        <div className="h-2 bg-primary"></div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-primary line-clamp-2 min-h-[3.5rem]">{quiz.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded font-bold ${quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                        quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {quiz.difficulty}
                                </span>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{quiz.description}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span>{quiz.time} mins</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HelpCircle size={16} />
                                    <span>{quiz.questionsCount} Qs</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/quiz/${quiz.id}`)}
                                className="w-full bg-blue-50 text-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                            >
                                Start Quiz
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredQuizzes.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No quizzes found fitting your criteria.</p>
                    <button
                        onClick={() => { setSelectedExam('All Exams'); setSearchQuery(''); }}
                        className="text-primary font-medium mt-2 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Reusing mascot for context */}
            <AnimeMascot message="Select a quiz to boost your rank! I'll be watching... 👀" type="flirty" />
        </div>
    );
};

export default QuizzesPage;
