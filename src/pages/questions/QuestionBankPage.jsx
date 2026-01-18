import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Download, Star, HelpCircle, FileText, Search } from 'lucide-react';
import { quizzesBySubject } from '../../data/quizzesData';
import { neetPhysicsQuizzes } from '../../data/neetPhysicsQuizzesData';
import { neetChemistryQuizzes } from '../../data/neetChemistryQuizzesData';
import { neetBiologyQuizzes } from '../../data/neetBiologyQuizzesData';

const QuestionBankPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        try {
            const jeePhysCount = (quizzesBySubject.physics || []).reduce((acc, q) => acc + q.totalQuestions, 0);
            const jeeChemCount = (quizzesBySubject.chemistry || []).reduce((acc, q) => acc + q.totalQuestions, 0);
            const jeeMathCount = (quizzesBySubject.maths || []).reduce((acc, q) => acc + q.totalQuestions, 0);
            const neetPhysCount = (neetPhysicsQuizzes || []).reduce((acc, q) => acc + q.totalQuestions, 0);
            const neetChemCount = (neetChemistryQuizzes || []).reduce((acc, q) => acc + q.totalQuestions, 0);
            const neetBioCount = (neetBiologyQuizzes || []).reduce((acc, q) => acc + q.totalQuestions, 0);

            const allBanks = [
                { id: 'bp1', exam: 'JEE', subject: 'Physics', title: 'JEE Physics Complete Repository', questions: jeePhysCount, firstId: quizzesBySubject.physics?.[0]?.quizId },
                { id: 'bc1', exam: 'JEE', subject: 'Chemistry', title: 'JEE Chemistry Complete Repository', questions: jeeChemCount, firstId: quizzesBySubject.chemistry?.[0]?.quizId },
                { id: 'bm1', exam: 'JEE', subject: 'Maths', title: 'JEE Maths Complete Repository', questions: jeeMathCount, firstId: quizzesBySubject.maths?.[0]?.quizId },
                { id: 'bnp1', exam: 'NEET', subject: 'Physics', title: 'NEET Physics Question Bank', questions: neetPhysCount, firstId: neetPhysicsQuizzes?.[0]?.quizId },
                { id: 'bnc1', exam: 'NEET', subject: 'Chemistry', title: 'NEET Chemistry Question Bank', questions: neetChemCount, firstId: neetChemistryQuizzes?.[0]?.quizId },
                { id: 'bnb1', exam: 'NEET', subject: 'Biology', title: 'NEET Biology master Bank', questions: neetBioCount, firstId: neetBiologyQuizzes?.[0]?.quizId }
            ];
            setBanks(allBanks);
            console.log("Question Banks initialized with", allBanks.length, "subjects");
        } catch (e) {
            console.error("Error loading question banks:", e);
        }
    }, []);

    const filteredBanks = banks.filter(bank =>
        bank.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getSubjectColor = (subject) => {
        switch (subject) {
            case 'Physics': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
            case 'Chemistry': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
            case 'Maths': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
            default: return 'text-pink-400 border-pink-500/30 bg-pink-500/10';
        }
    };

    const handleViewBank = (bank) => {
        // Redir to the first quiz of that subject in practice mode
        navigate(`/quiz/${bank.firstId}?subject=${bank.subject}&exam=${bank.exam}&mode=Practice`);
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent uppercase">
                        Question Bank
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 tracking-widest font-light">ACCESS THE GLOBAL REPOSITORY OF KNOWLEDGE.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/50" size={18} />
                    <input
                        type="text"
                        placeholder="Search for subject banks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#161b29] border border-purple-500/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all font-medium h-12"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredBanks.map((bank) => (
                    <div
                        key={bank.id}
                        className="group bg-[#111622] hover:bg-black border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 relative overflow-hidden flex flex-col hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                    >
                        {/* Card Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-3xl -mr-8 -mt-8 transition-opacity opacity-50 group-hover:opacity-100" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black tracking-widest uppercase ${getSubjectColor(bank.subject)}`}>
                                {bank.exam} • {bank.subject}
                            </div>
                            <button className="text-gray-600 hover:text-white transition-colors">
                                <Download size={20} />
                            </button>
                        </div>

                        <div className="flex-1 mb-8 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-white/5 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
                                <FileText className="text-gray-500 group-hover:text-purple-400 transition-colors" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight uppercase tracking-tighter">
                                {bank.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 opacity-40">Classified Database</p>

                            <div className="flex items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                <span className="bg-white/5 px-3 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                                    <HelpCircle size={14} className="text-purple-500" />
                                    {bank.questions.toLocaleString()} QUESTIONS
                                </span>
                                <span className="bg-white/5 px-3 py-2 rounded-lg border border-white/5">PDF READY</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleViewBank(bank)}
                            className="w-full py-4 rounded-2xl bg-purple-500/5 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-500 font-black text-xs tracking-widest transition-all uppercase flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                            Access Repository <Star size={14} fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionBankPage;
