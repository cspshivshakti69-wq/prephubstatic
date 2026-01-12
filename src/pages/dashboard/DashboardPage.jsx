import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AnimeMascot from '../../components/anime/AnimeMascot';
import {
    CheckSquare, MessageCircle, BarChart2, TrendingUp,
    BookOpen, Video, FileText, Calendar, Target, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
    >
        <div className={`p-4 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </motion.div>
);

const ActionCard = ({ title, desc, icon: Icon, color, to }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(to)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
        </motion.div>
    );
};

const DashboardPage = () => {
    const { user } = useAuth();

    // Dummy stats for now
    const stats = {
        quizzes: 0,
        questions: 0,
        accuracy: '0%',
        score: '0%'
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name?.split(' ')[0]}! <span className="animate-pulse">😊</span>
                    </h1>
                    <p className="text-gray-500 mt-1">Ready to ace your exams? Let's continue your preparation journey.</p>
                </div>
                <div className="bg-green-100 px-6 py-3 rounded-xl border border-green-200">
                    <p className="text-green-800 font-medium text-sm">
                        Daily Motivation: <span className="font-bold">"Dream Bigger. Do Bigger."</span>
                    </p>
                </div>
            </div>

            {/* Upcoming Exams Section */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Exams</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* GMAT */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-800">GMAT</h3>
                            <p className="text-sm text-gray-500">Jan 15, 2026</p>
                        </div>
                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-bold">3 days left</div>
                    </div>
                    {/* JEE */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-800">JEE Main</h3>
                            <p className="text-sm text-gray-500">Jan 24, 2026</p>
                        </div>
                        <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-sm font-bold">12 days left</div>
                    </div>
                    {/* GATE */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-800">GATE</h3>
                            <p className="text-sm text-gray-500">Feb 08, 2026</p>
                        </div>
                        <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-sm font-bold">27 days left</div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={CheckSquare} label="Quizzes Taken" value={stats.quizzes} color="bg-blue-500" />
                <StatCard icon={HelpCircle} label="Questions Solved" value={stats.questions} color="bg-green-500" />
                <StatCard icon={TrendingUp} label="Accuracy" value={stats.accuracy} color="bg-orange-500" />
                <StatCard icon={BarChart2} label="Avg Score" value={stats.score} color="bg-purple-500" />
            </div>

            {/* Main Grid Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ActionCard
                    to="/quizzes"
                    title="Practice Quizzes"
                    desc="Take practice quizzes to test your knowledge."
                    icon={CheckSquare}
                    color="bg-blue-500"
                />
                <ActionCard
                    to="/questions"
                    title="Question Bank"
                    desc="Browse through thousands of practice questions."
                    icon={BookOpen}
                    color="bg-indigo-500"
                />
                <ActionCard
                    to="/notes"
                    title="My Notes"
                    desc="Create and organize your study notes."
                    icon={FileText}
                    color="bg-green-500"
                />
                <ActionCard
                    to="/calendar"
                    title="Exam Calendar"
                    desc="Track important exam dates."
                    icon={Calendar}
                    color="bg-pink-500"
                />
                <ActionCard
                    to="/videos"
                    title="Video Tutorials"
                    desc="Learn from expert video recommendations."
                    icon={Video}
                    color="bg-red-500"
                />
                <ActionCard
                    to="/papers"
                    title="Question Papers"
                    desc="Download official past papers & PDFs."
                    icon={FileText}
                    color="bg-yellow-500"
                />
                <ActionCard
                    to="/profile"
                    title="Profile & Settings"
                    desc="Manage your profile and preferences."
                    icon={Target}
                    color="bg-gray-700"
                />
            </div>

            {/* Dynamic Mascot Helper */}
            <AnimeMascot
                message={`Hey ${user?.name?.split(' ')[0]}! Checking your stats... You haven't taken a quiz today! Let's do one now? 🚀`}
                type="excited"
            />
        </div>
    );
};

export default DashboardPage;
