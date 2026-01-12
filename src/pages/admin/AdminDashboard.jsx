import React from 'react';
import { Users, FileQuestion, Video, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
// Chart.js imports could go here for real charts

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
    >
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="1,245" icon={Users} color="bg-blue-600" />
                <StatCard title="Total Questions" value="15,304" icon={FileQuestion} color="bg-green-600" />
                <StatCard title="Video Lectures" value="342" icon={Video} color="bg-red-600" />
                <StatCard title="Active Now" value="128" icon={Activity} color="bg-purple-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400">
                    Chart Placeholder (User Growth)
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400">
                    Chart Placeholder (Test Activity)
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
