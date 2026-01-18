import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { QUESTION_DATA } from '../../data/questions';
import { quizzesBySubject } from '../../data/quizzesData';
import { neetPhysicsQuizzes } from '../../data/neetPhysicsQuizzesData';
import { neetChemistryQuizzes } from '../../data/neetChemistryQuizzesData';
import { neetBiologyQuizzes } from '../../data/neetBiologyQuizzesData';
import AnimeMascot from '../../components/anime/AnimeMascot';
import { Timer, CheckCircle, XCircle, AlertTriangle, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizPlayer = () => {
    const { quizId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const mode = searchParams.get('mode') || 'Timed';
    const subject = searchParams.get('subject');
    const exam = searchParams.get('exam');

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        try {
            // Consolidated Quiz Search
            const allCollections = [
                ...(quizzesBySubject.physics || []),
                ...(quizzesBySubject.chemistry || []),
                ...(quizzesBySubject.maths || []),
                ...(neetPhysicsQuizzes || []),
                ...(neetChemistryQuizzes || []),
                ...(neetBiologyQuizzes || [])
            ];

            const foundQuiz = allCollections.find(q => q.quizId === quizId);

            if (foundQuiz) {
                setQuestions(foundQuiz.questions);
                setTimeLeft(parseInt(foundQuiz.duration) * 60 || 3600);
            } else if (exam && subject && QUESTION_DATA[exam] && QUESTION_DATA[exam][subject]) {
                const legacyData = QUESTION_DATA[exam][subject];
                setQuestions(legacyData.slice(0, 60));
                setTimeLeft(3600);
            }
        } catch (error) {
            console.error("Error loading quiz:", error);
        } finally {
            setIsLoading(false);
        }
    }, [quizId, exam, subject]);

    // Timer Logic
    useEffect(() => {
        if (mode === 'Timed' && timeLeft > 0 && !quizFinished) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (mode === 'Timed' && timeLeft === 0 && !quizFinished && questions.length > 0) {
            handleFinishQuiz();
        }
    }, [timeLeft, quizFinished, mode, questions]);

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        // Scoring Logic: +4 Correct, -1 Wrong
        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 4);
            setCorrectCount(prev => prev + 1);
        } else {
            setScore(prev => prev - 1);
            setWrongCount(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            handleFinishQuiz();
        }
    };

    const handleFinishQuiz = () => {
        setQuizFinished(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-500 font-bold animate-pulse uppercase tracking-widest">Initialising Neural Link...</p>
        </div>
    );

    if (!questions.length) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-200">Data Link Severed</h2>
            <p className="text-gray-500 mt-2">Invalid Simulation ID or Subject Parameters.</p>
            <button onClick={() => navigate('/quizzes')} className="mt-6 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg">Return to Base</button>
        </div>
    );

    if (quizFinished) {
        const totalPossible = questions.length * 4;
        const accuracy = Math.round((correctCount / (correctCount + wrongCount || 1)) * 100);

        return (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 max-w-2xl mx-auto">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#111622] p-8 rounded-3xl border border-cyan-500/30 text-center w-full relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

                    <Zap className="mx-auto text-cyan-400 mb-4 animate-pulse" size={40} />
                    <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Simulation Complete</h2>

                    <div className="py-8">
                        <div className="text-7xl font-black text-cyan-400 mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                            {score}
                            <span className="text-xl text-gray-600 font-medium ml-2">/ {totalPossible}</span>
                        </div>
                        <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Composite Score Intelligence</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-2xl">
                            <div className="text-green-400 font-black text-2xl">{correctCount}</div>
                            <div className="text-[10px] text-green-500/70 uppercase font-black tracking-tighter">Accurate</div>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl">
                            <div className="text-red-400 font-black text-2xl">{wrongCount}</div>
                            <div className="text-[10px] text-red-500/70 uppercase font-black tracking-tighter">Errors</div>
                        </div>
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl">
                            <div className="text-blue-400 font-black text-2xl">{accuracy}%</div>
                            <div className="text-[10px] text-blue-500/70 uppercase font-black tracking-tighter">Precision</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/quizzes')}
                            className="w-full py-4 bg-cyan-500 text-black rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                        >
                            Back to Arena
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            Retry Simulation
                        </button>
                    </div>
                </motion.div>

                <AnimeMascot
                    message={score > totalPossible * 0.7 ? "Sync Level: ADVANCED. You have exceeded normal cognitive limits! 🚀" : "Sync Level: STABLE. Further data processing required to reach peak efficiency. 📚"}
                    type={score > totalPossible * 0.7 ? "excited" : "calm"}
                />
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden relative shadow-2xl flex flex-col min-h-[700px]">
                {/* Cyber Header */}
                <div className="p-6 flex justify-between items-center border-b border-white/5 relative bg-black/20">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col">
                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Subject Protocol</span>
                            <span className="text-white font-bold text-sm tracking-tighter">{subject} • {exam}</span>
                        </div>
                        <div className="h-10 w-px bg-white/5 hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">Sequence Progress</span>
                            <span className="text-white font-bold text-sm tracking-tighter">Node {currentQuestionIndex + 1} / {questions.length}</span>
                        </div>
                    </div>

                    {mode === 'Timed' && (
                        <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl font-black text-xl border shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all ${timeLeft < 300 ? 'bg-red-500/10 text-red-500 border-red-500/50 animate-pulse' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            }`}>
                            <Timer className="w-5 h-5" />
                            <span className="font-mono tracking-tighter">{formatTime(timeLeft)}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col lg:flex-row h-full">
                    {/* Left: Question Content */}
                    <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                        <div className="mb-10">
                            <span className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Query Identification {currentQuestion.id}</span>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-100 leading-relaxed mb-12">
                                {currentQuestion.text}
                            </h2>
                        </div>

                        <div className="space-y-4 max-w-3xl">
                            {Object.entries(currentQuestion.options).map(([key, val]) => {
                                const isSelected = selectedOption === key;
                                const isCorrect = key === currentQuestion.correctAnswer;

                                let stateStyles = "bg-white/5 border-white/5 text-gray-400 hover:border-cyan-500/30 hover:bg-white/10";

                                if (isSelected) {
                                    stateStyles = "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50";
                                }

                                return (
                                    <button
                                        key={key}
                                        onClick={() => { if (!isAnswered) setSelectedOption(key); }}
                                        disabled={isAnswered}
                                        className={`w-full group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${stateStyles}`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all duration-300 ${isSelected ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-black/40 border-white/10 text-gray-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400'}`}>
                                                {key.toUpperCase()}
                                            </div>
                                            <span className="font-bold text-base md:text-lg tracking-tight">{val}</span>
                                        </div>
                                        {isSelected && <Zap className="text-cyan-500 animate-pulse" size={20} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Interface Controls */}
                    <aside className="w-full lg:w-96 bg-black/30 border-t lg:border-t-0 lg:border-l border-white/5 p-8 flex flex-col">
                        <div className="flex-1 space-y-8">
                            <div>
                                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Protocol Details</h3>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Difficulty</p>
                                        <p className={`font-black text-sm ${currentQuestion.difficulty === 'Hard' ? 'text-red-500' : 'text-cyan-400'}`}>{currentQuestion.difficulty}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Points</p>
                                        <p className="font-black text-sm text-cyan-400">+4 / -1</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Source Author</p>
                                    <p className="font-black text-sm text-white">{currentQuestion.author}</p>
                                </div>
                            </div>

                            <div className="hidden lg:block pt-8 border-t border-white/5">
                                <AnimeMascot
                                    message={timeLeft > 0 ? "Maintain focus. Neural synchronization at optimum levels." : "Analyze the question carefully. Efficiency is key."}
                                    type="calm"
                                />
                            </div>
                        </div>

                        <div className="mt-12 space-y-4">
                            <button
                                disabled={!selectedOption}
                                onClick={() => {
                                    handleOptionSelect(selectedOption);
                                    handleNext();
                                }}
                                className={`w-full group flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${selectedOption ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5'}`}
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Terminate Simulation' : 'Commit & Next Node'}
                                <ChevronRight size={18} />
                            </button>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Safety Override</span>
                                <button onClick={() => navigate('/quizzes')} className="text-[10px] text-red-500/50 hover:text-red-500 font-black uppercase tracking-widest transition-colors mb-4">Abort Mission</button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-white/5 w-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizPlayer;
