import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Video, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-screen">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            <p className="text-xs text-gray-400">Entrance Exam Hub</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <AdminSidebarLink to="/admin" icon={LayoutDashboard} label="Overview" />
                        <AdminSidebarLink to="/admin/users" icon={Users} label="User Management" />
                        <AdminSidebarLink to="/admin/questions" icon={FileText} label="Questions" />
                        <AdminSidebarLink to="/admin/videos" icon={Video} label="Videos" />
                        <AdminSidebarLink to="/admin/settings" icon={Settings} label="Settings" />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
