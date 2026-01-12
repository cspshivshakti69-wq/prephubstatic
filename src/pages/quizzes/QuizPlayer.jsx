import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzes } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';
import AnimeMascot from '../../components/anime/AnimeMascot';
import { Timer, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizPlayer = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { updateUser } = useAuth();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const quiz = quizzes.find(q => q.id === parseInt(quizId));

    useEffect(() => {
        if (quiz) {
            setTimeLeft(quiz.time * 60);
        }
    }, [quiz]);

    useEffect(() => {
        if (timeLeft > 0 && !quizFinished) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !quizFinished) {
            handleFinishQuiz();
        }
    }, [timeLeft, quizFinished]);

    if (!quiz) return <div className="p-8">Quiz not found</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === currentQuestion.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            handleFinishQuiz();
        }
    };

    const handleFinishQuiz = () => {
        setQuizFinished(true);
        // Update local user stats (simple implementation)
        // In real app, push to history array
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (quizFinished) {
        const accuracy = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center max-w-lg w-full"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed! 🎉</h2>
                    <p className="text-gray-500 mb-6">You scored {score}/{quiz.questions.length}</p>

                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${accuracy}%` }}
                            className={`h-4 rounded-full ${accuracy >= 80 ? 'bg-green-500' : accuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        />
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/quizzes')}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                        >
                            Back to Quizzes
                        </button>
                        <button
                            onClick={() => navigate('/videos')} // Suggest videos
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium shadow-lg shadow-blue-200"
                        >
                            Watch Related Videos
                        </button>
                    </div>
                </motion.div>

                {accuracy >= 80 ? (
                    <AnimeMascot message="INCREDIBLE!! You're a genius! Keep this up and you'll top the exams! 💖" type="excited" />
                ) : (
                    <AnimeMascot message="Don't worry! We can improve this score together. Try watching some tutorials! 💪" type="worried" />
                )}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-50 p-6 flex justify-between items-center border-b border-blue-100">
                    <div>
                        <h2 className="font-bold text-xl text-primary">{quiz.title}</h2>
                        <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg font-mono font-bold text-gray-700 shadow-sm">
                        <Timer className="w-5 h-5 text-red-500" />
                        <span className={timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}>{formatTime(timeLeft)}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="p-8">
                    <p className="text-lg font-medium text-gray-800 mb-6">{currentQuestion.text}</p>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
                            if (selectedOption === null) {
                                btnClass += "border-gray-100 hover:border-blue-200 hover:bg-blue-50";
                            } else {
                                if (index === currentQuestion.correct) {
                                    btnClass += "border-green-500 bg-green-50 text-green-700 font-bold"; // Correct
                                } else if (index === selectedOption) {
                                    btnClass += "border-red-500 bg-red-50 text-red-700"; // Wrong selected
                                } else {
                                    btnClass += "border-gray-100 opacity-50"; // Others
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    disabled={isAnswered}
                                    onClick={() => handleOptionSelect(index)}
                                    className={btnClass}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{String.fromCharCode(65 + index)}. {option}</span>
                                        {selectedOption !== null && index === currentQuestion.correct && <CheckCircle size={20} />}
                                        {selectedOption !== null && index === selectedOption && index !== currentQuestion.correct && <XCircle size={20} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation Area */}
                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="mt-6 bg-blue-50 p-4 rounded-xl text-sm border border-blue-100"
                            >
                                <span className="font-bold text-blue-800">Explanation: </span>
                                <span className="text-blue-700">{currentQuestion.explanation}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <button
                        disabled={!isAnswered}
                        onClick={handleNext}
                        className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${isAnswered ? 'bg-primary hover:bg-primary-hover shadow-lg shadow-blue-200' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>

            {/* Mascot Reaction */}
            {isAnswered && selectedOption === currentQuestion.correct && (
                <AnimeMascot message="Yesss! That's correct! You're on fire! 🔥" type="happy" />
            )}
            {isAnswered && selectedOption !== currentQuestion.correct && (
                <AnimeMascot message="Oops! Close call... read the explanation carefully! 🧐" type="worried" />
            )}
        </div>
    );
};

export default QuizPlayer;
