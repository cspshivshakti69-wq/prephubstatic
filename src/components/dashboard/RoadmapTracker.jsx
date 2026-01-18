import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight, Trophy, BookOpen, Video, Map } from 'lucide-react';

const RoadmapTracker = () => {
    // Phases of preparation
    const phases = [
        {
            id: 'foundation',
            title: 'Phase 1: Foundation',
            desc: 'Building core concepts from NCERT/Standard Books',
            duration: 'Months 1-3',
            color: 'from-blue-500 to-cyan-500',
            goals: [
                { id: 'f1', text: 'Complete 11th Grade Syllabus basics', completed: true },
                { id: 'f2', text: 'Solve NCERT Exercises', completed: true },
                { id: 'f3', text: 'Basic Formula Sheets creation', completed: false },
            ]
        },
        {
            id: 'concepts',
            title: 'Phase 2: Deep Dive',
            desc: 'Advanced problem solving & reference books',
            duration: 'Months 4-8',
            color: 'from-purple-500 to-pink-500',
            goals: [
                { id: 'c1', text: 'HC Verma / DC Pandey (Physics)', completed: false },
                { id: 'c2', text: 'Morrison Boyd / OP Tandon (Chem)', completed: false },
                { id: 'c3', text: 'Previous Year Questions (Last 5 Years)', completed: false },
            ]
        },
        {
            id: 'mock',
            title: 'Phase 3: Testing Ground',
            desc: 'Intensive Mock Tests & Analysis',
            duration: 'Months 9-11',
            color: 'from-orange-500 to-red-500',
            goals: [
                { id: 'm1', text: '20 Full Syllabus Mock Tests', completed: false },
                { id: 'm2', text: 'Error Analysis Notebook', completed: false },
                { id: 'm3', text: 'Time Management optimization', completed: false },
            ]
        },
        {
            id: 'final',
            title: 'Phase 4: Final Lap',
            desc: 'Rapid Revision & Mental Prep',
            duration: 'Final Month',
            color: 'from-green-500 to-emerald-500',
            goals: [
                { id: 'fi1', text: 'Formula Revision Daily', completed: false },
                { id: 'fi2', text: 'Sleep Cycle Adjustment', completed: false },
                { id: 'fi3', text: 'Stress Management', completed: false },
            ]
        }
    ];

    const [activePhase, setActivePhase] = useState('foundation');
    const [progressData, setProgressData] = useState(() => {
        try {
            const saved = localStorage.getItem('roadmap_progress');
            return saved ? JSON.parse(saved) : {}; // { goalId: boolean }
        } catch (e) {
            return {};
        }
    });

    const toggleGoal = (goalId) => {
        setProgressData(prev => {
            const newState = { ...prev, [goalId]: !prev[goalId] };
            localStorage.setItem('roadmap_progress', JSON.stringify(newState));
            return newState;
        });
    };

    const calculatePhaseProgress = (phase) => {
        const total = phase.goals.length;
        const completed = phase.goals.filter(g => progressData[g.id] ?? g.completed).length; // Fallback to default if not in storage
        return Math.round((completed / total) * 100);
    };

    return (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Map size={24} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white">Exam Success Roadmap</h2>
                    <p className="text-gray-400 text-sm font-medium">Your personalized journey to the top rank</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-white/5 -z-0"></div>

                {phases.map((phase, index) => {
                    const isActive = activePhase === phase.id;
                    const progress = calculatePhaseProgress(phase);

                    return (
                        <motion.div
                            key={phase.id}
                            layout
                            onClick={() => setActivePhase(phase.id)}
                            className={`relative cursor-pointer group z-10`}
                        >
                            <div className={`p-1 rounded-2xl bg-gradient-to-br ${phase.color} transition-all duration-300 ${isActive ? 'scale-105 shadow-xl' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}>
                                <div className="bg-[#0f1115] rounded-xl p-4 h-full border border-white/5 relative overflow-hidden">
                                    {/* Progress Bar Background */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-current opacity-50" style={{ width: `${progress}%`, color: 'white' }}></div>

                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-opacity-80 text-white bg-black/30 px-2 py-1 rounded">{phase.duration}</span>
                                        {progress === 100 ? <CheckCircle size={16} className="text-green-500" /> : <div className="text-xs font-bold text-gray-500">{progress}%</div>}
                                    </div>
                                    <h3 className="font-bold text-white text-lg leading-tight mb-1">{phase.title}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-2">{phase.desc}</p>
                                </div>
                            </div>

                            {/* Connector Dot */}
                            <div className={`hidden lg:flex absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black ${progress === 100 ? 'bg-green-500' : 'bg-gray-800'}`}></div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Phase Details */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 bg-[#0a0c10] border border-white/5 rounded-2xl p-6"
                >
                    {phases.map(p => {
                        if (p.id !== activePhase) return null;
                        return (
                            <div key={p.id} className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${p.color} mb-4`}>
                                        Current Focus: {p.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {p.goals.map(goal => {
                                            const isChecked = progressData[goal.id] ?? goal.completed;
                                            return (
                                                <div
                                                    key={goal.id}
                                                    onClick={() => toggleGoal(goal.id)}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}>
                                                        {isChecked && <CheckCircle size={12} className="text-black" />}
                                                    </div>
                                                    <span className={`text-sm font-medium ${isChecked ? 'text-gray-300 line-through' : 'text-white'}`}>{goal.text}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full md:w-64 bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col justify-center items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 mb-3 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                        <Trophy className="text-yellow-500" size={32} />
                                    </div>
                                    <h4 className="font-bold text-white mb-1">Keep Going!</h4>
                                    <p className="text-xs text-gray-500 mb-4">You are {calculatePhaseProgress(p)}% through this phase.</p>
                                    <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-xs font-bold text-white uppercase tracking-wider hover:opacity-90 transition-opacity">
                                        View Resources
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RoadmapTracker;
