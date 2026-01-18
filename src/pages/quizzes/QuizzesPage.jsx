import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Download, Play, Trophy, Clock, HelpCircle, Star, Search, Filter } from 'lucide-react';
import { quizzesBySubject } from '../../data/quizzesData';
import { neetPhysicsQuizzes } from '../../data/neetPhysicsQuizzesData';
import { neetChemistryQuizzes } from '../../data/neetChemistryQuizzesData';
import { neetBiologyQuizzes } from '../../data/neetBiologyQuizzesData';

const QuizzesPage = () => {
    const navigate = useNavigate();
    const [selectedExam, setSelectedExam] = useState('All');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [allQuizzes, setAllQuizzes] = useState([]);

    useEffect(() => {
        try {
            const jeePhysics = (quizzesBySubject.physics || []).map(q => ({ ...q, exam: 'JEE', subject: 'Physics', category: 'JEE Physics' }));
            const jeeChemistry = (quizzesBySubject.chemistry || []).map(q => ({ ...q, exam: 'JEE', subject: 'Chemistry', category: 'JEE Chemistry' }));
            const jeeMaths = (quizzesBySubject.maths || []).map(q => ({ ...q, exam: 'JEE', subject: 'Maths', category: 'JEE Mathematics' }));
            const nPhys = (neetPhysicsQuizzes || []).map(q => ({ ...q, exam: 'NEET', subject: 'Physics', category: 'NEET Physics' }));
            const nChem = (neetChemistryQuizzes || []).map(q => ({ ...q, exam: 'NEET', subject: 'Chemistry', category: 'NEET Chemistry' }));
            const nBio = (neetBiologyQuizzes || []).map(q => ({ ...q, exam: 'NEET', subject: 'Biology', category: 'NEET Biology' }));
            // Start MBBS with more granular subjects mock mapping for demo
            const mbbsAnat = (quizzesBySubject['MBBS'] || []).map((q, i) => {
                const subjects = ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology'];
                return { ...q, exam: 'MBBS', subject: subjects[i % subjects.length], category: `MBBS ${subjects[i % subjects.length]}` };
            });
            const neetPg = (quizzesBySubject['NEET PG'] || []).map(q => ({ ...q, exam: 'NEET PG', subject: 'Clinical', category: 'NEET PG Clinical' }));
            const engineering = (quizzesBySubject['CodeWithHarry'] || []).map(q => ({ ...q, exam: 'Engineering', subject: 'Programming', category: 'Programming' }));

            const combined = [...jeePhysics, ...jeeChemistry, ...jeeMaths, ...nPhys, ...nChem, ...nBio, ...mbbsAnat, ...neetPg, ...engineering];
            setAllQuizzes(combined);
            console.log("Quizzes loaded:", combined.length);
        } catch (error) {
            console.error("Error loading quizzes:", error);
            setAllQuizzes([]);
        }
    }, []);

    // Exam Tabs
    const exams = ['All', 'JEE', 'NEET', 'MBBS', 'Engineering', 'NEET PG'];

    // Dynamic Subjects based on Exam
    const getSubjects = () => {
        if (selectedExam === 'All') return [];
        if (selectedExam === 'JEE') return ['Physics', 'Chemistry', 'Maths'];
        if (selectedExam === 'NEET') return ['Physics', 'Chemistry', 'Biology'];
        if (selectedExam === 'MBBS') return [
            'All', 'Anatomy', 'Physiology', 'Biochemistry', // Pre-Clinical
            'Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine', 'Community Medicine', // Para-Clinical
            'Medicine', 'Surgery', 'OBG', 'Pediatrics' // Clinical
        ];
        if (selectedExam === 'Engineering') return ['Programming', 'Data Science', 'Web Dev'];
        return [];
    };

    const filteredQuizzes = allQuizzes.filter(quiz => {
        const matchesExam = selectedExam === 'All' || quiz.exam === selectedExam;
        const matchesSubject = selectedSubject === 'All' || quiz.subject === selectedSubject;
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesExam && matchesSubject && matchesSearch;
    });

    const getSubjectColor = (subject) => {
        if (['Physics', 'Maths', 'Biochemistry', 'Surgery'].some(s => subject.includes(s))) return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
        if (['Chemistry', 'Physiology', 'Medicine', 'Pediatrics'].some(s => subject.includes(s))) return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
        if (['Biology', 'Anatomy', 'Pathology', 'OBG'].some(s => subject.includes(s))) return 'text-green-400 border-green-500/30 bg-green-500/10';
        return 'text-pink-400 border-pink-500/30 bg-pink-500/10';
    };

    const handleStartQuiz = (quiz) => {
        navigate(`/quiz/${quiz.quizId}?subject=${quiz.subject}&exam=${quiz.exam}&mode=Timed`);
    };

    return (
        <div className="space-y-8 min-h-screen pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        QUIZ ARENA
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 tracking-widest font-light">TEST YOUR LIMITS. BREAK THE BARRIER.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50" size={18} />
                    <input
                        type="text"
                        placeholder="Search for a specific mock test..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#161b29] border border-cyan-500/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all font-medium h-12"
                    />
                </div>
            </div>

            {/* Exam Filters (Tabs) */}
            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[#161b29] rounded-2xl w-fit mx-auto md:mx-0">
                {exams.map((exam) => (
                    <button
                        key={exam}
                        onClick={() => { setSelectedExam(exam); setSelectedSubject('All'); }}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${selectedExam === exam
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {exam}
                    </button>
                ))}
            </div>

            {/* Subject Filters (Pills) - Only show if specific exam selected */}
            {selectedExam !== 'All' && selectedExam !== 'NEET PG' && (
                <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    {getSubjects().map((sub) => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSubject(sub)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedSubject === sub
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                                : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}

            {/* Content Area */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Remove old Sidebar, keep full width grid if needed or keep sidebar for other widgets */}
                {/* For now, removing sidebar filter as it's replaced by top tabs */}

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map((quiz, idx) => (
                            <div
                                key={quiz.quizId}
                                className="group bg-[#111622] hover:bg-black border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden flex flex-col hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                            >
                                {/* Card Glow */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-3xl -mr-4 -mt-4 transition-opacity opacity-50 group-hover:opacity-100" />

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className={`p-3 rounded-xl mb-4 w-fit ${getSubjectColor(quiz.subject)}`}>
                                        {quiz.category}
                                    </div>
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>

                                <div className="flex-1 mb-6 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gray-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                        <CheckSquare className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-4 opacity-60">Verified Mock Test</p>

                                    <div className="flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><HelpCircle size={14} className="text-cyan-500" /> {quiz.totalQuestions} Questions</span>
                                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-cyan-500" /> {quiz.duration}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleStartQuiz(quiz)}
                                    className="w-full py-3.5 rounded-xl bg-cyan-500/5 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/30 hover:border-cyan-500 font-black text-xs tracking-widest transition-all uppercase flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                >
                                    Initiate Simulation <Star size={12} fill="currentColor" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <HelpCircle size={48} className="mx-auto text-gray-700 mb-4" />
                            <h3 className="text-xl font-bold text-gray-500">No simulations found</h3>
                            <p className="text-sm text-gray-600 mt-2">Adjust your filters or search query.</p>
                            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="mt-6 text-cyan-400 font-bold underline text-sm">Reset Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizzesPage;
