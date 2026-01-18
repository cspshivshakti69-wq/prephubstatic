import React, { useState, useEffect } from 'react';
import { Calendar as CalIcon, Clock, CheckCircle, Video, FileText, ChevronRight, Star, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarPage = () => {
    // Initial dummy data as fallback
    const INITIAL_EVENTS = [
        { id: 1, type: 'quiz', subject: 'PHYSICS', title: 'Mechanics Revision Day', time: '10:00 AM', status: 'Upcoming', description: 'Complete Chapter 4 revision.' },
        { id: 2, type: 'live', subject: 'MATHS', title: 'Live Class: Calculus', time: '02:00 PM', status: 'Live Now', description: 'Join via Zoom link.' },
        { id: 3, type: 'note', subject: 'CHEMISTRY', title: 'Read Organic Notes', time: '05:00 PM', status: 'Pending', description: 'Review reaction mechanisms.' },
        { id: 4, type: 'quiz', subject: 'BIOLOGY', title: 'Mock Test 4', time: '08:00 PM', status: 'Upcoming', description: 'Full syllabus mock test.' },
    ];

    const [events, setEvents] = useState(() => {
        try {
            const saved = localStorage.getItem('calendar_events');
            return saved ? JSON.parse(saved) : INITIAL_EVENTS;
        } catch (e) {
            return INITIAL_EVENTS;
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        subject: 'General',
        type: 'other',
        description: ''
    });

    useEffect(() => {
        localStorage.setItem('calendar_events', JSON.stringify(events));
    }, [events]);

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.date) return;

        const eventToAdd = {
            id: Date.now(),
            ...newEvent,
            status: 'Upcoming',
            time: newEvent.time // Simplified for demo
        };

        setEvents(prev => [...prev, eventToAdd]);
        setIsModalOpen(false);
        setNewEvent({ title: '', date: new Date().toISOString().split('T')[0], time: '10:00', subject: 'General', type: 'other', description: '' });
        alert("Event added successfully!");
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'quiz': return <CheckCircle size={18} />;
            case 'live': return <Video size={18} />;
            default: return <FileText size={18} />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'quiz': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case 'live': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] relative">
            {/* Header Button for Mobile (or if layout has space) - though usually in Sidebar header */}
            <div className="lg:hidden mb-4">
                <button onClick={() => setIsModalOpen(true)} className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl flex items-center justify-center gap-2">
                    <Plus size={18} /> Add New Event
                </button>
            </div>

            {/* Main Calendar Area (Placeholder for full calendar) */}
            <div className="flex-1 bg-gray-900/30 border border-white/5 rounded-3xl p-6 hidden lg:flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h2 className="text-xl font-bold text-gray-200">January 2026</h2>
                    <div className="flex gap-2">
                        <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400">{'<'}</button>
                        <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400">{'>'}</button>
                    </div>
                </div>

                {/* Mock Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 flex-1 relative z-10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-center text-xs font-bold text-gray-500 uppercase py-2">{d}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className={`rounded-xl border border-white/5 p-2 transition-colors hover:bg-white/5 relative group ${i === 14 ? 'bg-cyan-900/20 border-cyan-500/30' : ''}`}>
                            <span className={`text-sm font-bold ${i === 14 ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-300'}`}>{i + 1 > 31 ? i - 30 : i + 1}</span>
                            {i === 14 && <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_cyan]"></div>}
                        </div>
                    ))}
                </div>

                {/* Floating Add Button for Desktop */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-6 right-6 p-4 bg-cyan-500 text-black rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform z-20"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Event Timeline / Day View */}
            <div className="w-full lg:w-96 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-200">Upcoming Events</h3>
                    <button className="text-xs font-bold text-cyan-400 uppercase tracking-wider hover:text-cyan-300">View All</button>
                </div>

                <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
                    {events.length > 0 ? events.slice().reverse().map((event, idx) => (
                        <div key={idx} className="bg-black border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group hover:shadow-lg hover:shadow-cyan-500/5">
                            <div className="flex items-start justify-between mb-2">
                                <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                                    {getTypeIcon(event.type)}
                                </div>
                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                                    <Clock size={10} /> {event.time}
                                </span>
                            </div>

                            <h4 className="font-bold text-gray-100 text-lg mb-1 group-hover:text-cyan-400 transition-colors">{event.title}</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{event.subject}</p>

                            <button className="w-full py-2.5 rounded-xl border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all flex items-center justify-center gap-2">
                                View Details <Star size={10} fill="currentColor" />
                            </button>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-500">No events scheduled.</div>
                    )}
                </div>

                <div className="mt-auto bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-5 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-gray-200 mb-2">Study Streak</h4>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-black text-white">12</span>
                        <span className="text-sm font-bold text-gray-500 mb-1">Days</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_cyan]"></div>
                    </div>
                </div>
            </div>

            {/* Add Event Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                            <h2 className="text-2xl font-black text-white mb-6">Add New Event</h2>

                            <form onSubmit={handleAddEvent} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Event Title</label>
                                    <input required type="text" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Physics Mock Test" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Date</label>
                                        <input required type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Time</label>
                                        <input required type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Type</label>
                                    <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none">
                                        <option value="quiz">Quiz</option>
                                        <option value="live">Live Class</option>
                                        <option value="note">Study Session</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Description</label>
                                    <textarea value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none resize-none" placeholder="Add details..."></textarea>
                                </div>

                                <button type="submit" className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-2">
                                    Save Event
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CalendarPage;
