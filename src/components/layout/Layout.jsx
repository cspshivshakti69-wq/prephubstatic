import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, BookOpen, FileText, CheckSquare,
    Video, Calendar, User, LogOut, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SidebarLink = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-50 hover:text-primary'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/quizzes', icon: CheckSquare, label: 'Practice Quizzes' },
        { to: '/questions', icon: BookOpen, label: 'Question Bank' },
        { to: '/notes', icon: FileText, label: 'My Notes' },
        { to: '/videos', icon: Video, label: 'Video Tutorials' },
        { to: '/calendar', icon: Calendar, label: 'Exam Calendar' },
        { to: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-[#f0f8ff] flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r border-blue-100 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-primary p-2 rounded-lg">
                            <BookOpen className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">Exam Prep Hub</h1>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <SidebarLink
                                key={item.to}
                                {...item}
                                onClick={() => setIsSidebarOpen(false)}
                            />
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-full p-6 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-primary">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.avatar || 'Felix'}&eyes=happy`} alt="Avatar" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">{user?.name || 'Student'}</p>
                            <p className="text-xs text-gray-500 uppercase">{user?.role || 'User'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors w-full"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <BookOpen className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-800">Exam Prep Hub</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
