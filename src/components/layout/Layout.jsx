import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, CheckSquare, BookOpen, FileText,
    Video, Calendar, User, LogOut, Menu, X, Rocket, Upload, Search, Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AnimatedBackground from '../ui/AnimatedBackground';

// Sidebar Link Component - Updated for Neon Theme
const SidebarLink = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group mb-1 ${isActive
                ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-cyan-400 border-l-4 border-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`
        }
    >
        <div className="relative z-10 flex items-center gap-3">
            <Icon size={20} className="transition-transform group-hover:scale-110" />
            <span className="font-medium tracking-wide">{label}</span>
        </div>
        {/* Neon Glow on Hover */}
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
    </NavLink>
);

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/quizzes', icon: CheckSquare, label: 'Quiz Area' },
        { to: '/questions', icon: BookOpen, label: 'Question Bank' },
        { to: '/notes', icon: FileText, label: 'Magic Notes' },
        { to: '/videos', icon: Video, label: 'Video Portals' },
        { to: '/calendar', icon: Calendar, label: 'Chrono Calendar' },
        { to: '/profile', icon: User, label: 'Hero Profile' },
    ];

    // Dynamic Header Data based on Route
    const getHeaderInfo = () => {
        const path = location.pathname;
        if (path.includes('quizzes')) return { title: 'Quiz Area', button: 'Upload PDF' };
        if (path.includes('questions')) return { title: 'Question Bank', button: 'Upload PDF' };
        if (path.includes('videos')) return { title: 'Video Portals', button: 'Upload Video' };
        if (path.includes('calendar')) return { title: 'Chrono Calendar', button: 'Add Event' };
        if (path.includes('profile')) return { title: 'Hero Profile', button: 'Edit Profile' };
        if (path.includes('notes')) return { title: 'Magic Notes', button: 'New Note' };
        if (path.includes('dashboard')) return { title: 'Dashboard', button: 'Customize' };
        return { title: 'Prep Hub', button: 'Action' };
    };

    const headerData = getHeaderInfo();

    return (
        <div className="min-h-screen relative text-gray-100 font-sans bg-black selection:bg-cyan-500/30">
            {/* Dark/Neon Background Wrapper */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none z-0" />

            <div className="flex h-screen overflow-hidden relative z-10">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 md:hidden transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed md:sticky top-0 h-full w-72 bg-black/80 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                        }`}
                >
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                <Rocket className="text-cyan-400 w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                                Prep Hub
                            </h1>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <SidebarLink
                                    key={item.to}
                                    {...item}
                                    onClick={() => setIsSidebarOpen(false)}
                                />
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/5 bg-white/5">
                        <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-black border border-white/10 shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-400">
                                <User className="text-white w-5 h-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-200 truncate">{user?.name || 'Demo Student'}</p>
                                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">USER</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 w-full py-3 rounded-xl transition-all font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto relative scroll-smooth custom-scrollbar flex flex-col">
                    {/* Header Section */}
                    <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 p-6 md:px-10 md:py-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                            {/* Mobile Toggle & Logo */}
                            <div className="flex items-center justify-between md:hidden">
                                <div className="flex items-center gap-2">
                                    <Rocket className="text-cyan-400 w-5 h-5" />
                                    <span className="font-bold text-gray-100">Prep Hub</span>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-2 text-gray-400"
                                >
                                    {isSidebarOpen ? <X /> : <Menu />}
                                </button>
                            </div>

                            {/* Title & Search */}
                            <div className="flex-1 md:flex md:items-center md:justify-between">
                                {/* Left Name + Subtitle (Centralized visually on desktop) */}
                                <div className="hidden md:block">
                                    <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                        {headerData.title}
                                    </h2>
                                    <p className="text-gray-400 text-xs tracking-widest mt-1 uppercase flex items-center gap-2">
                                        Capture ideas. Unlock knowledge. Study smarter. <span className="text-cyan-400">★</span>
                                    </p>
                                </div>

                                {/* Right Controls */}
                                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                                    {/* Search Bar */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-4 w-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search by title or author..."
                                            className="bg-gray-900 border border-gray-800 text-gray-100 text-sm rounded-xl focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 block w-full pl-10 p-2.5 placeholder-gray-600 transition-all shadow-inner"
                                        />
                                    </div>

                                    {/* Filters */}
                                    <div className="flex items-center bg-gray-900 rounded-xl p-1 border border-gray-800">
                                        {['All', 'Physics', 'Chem', 'Maths'].map(f => ( // Shortened due to space
                                            <button key={f} className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                                {f}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <button className="hidden md:flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                        {headerData.button.includes('Upload') ? <Upload size={16} /> : <Rocket size={16} />}
                                        {headerData.button}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Subtitle */}
                        <div className="md:hidden mt-4 text-center">
                            <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                {headerData.title}
                            </h2>
                            <p className="text-gray-500 text-[10px] tracking-widest mt-1 uppercase">
                                Capture ideas. Unlock knowledge. Study smarter. ★
                            </p>
                        </div>
                    </div>

                    <div className="p-4 md:p-8 flex-1">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
