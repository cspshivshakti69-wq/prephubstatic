import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Camera, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatarSeed, setAvatarSeed] = useState(user?.avatar || 'Felix');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        updateUser({ name, email, avatar: avatarSeed });
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const randomizeAvatar = () => {
        const seeds = ['Felix', 'Aneka', 'Zoe', 'Midnight', 'Bear', 'Tiger', 'Leo', 'Max'];
        const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
        setAvatarSeed(randomSeed);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-500">Manage your account settings and preferences</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>

                        <div className="relative z-10">
                            <div className="w-32 h-32 mx-auto bg-white rounded-full p-2 shadow-lg mb-4 relative group">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&eyes=happy`}
                                    alt="Profile"
                                    className="w-full h-full rounded-full bg-blue-50"
                                />
                                {isEditing && (
                                    <button
                                        onClick={randomizeAvatar}
                                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                                        title="Randomize Avatar"
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mt-2 uppercase">
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Edit Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-1 md:col-span-2"
                >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isEditing
                                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        : 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-200'
                                    }`}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {message && (
                            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing} // Email usually shouldn't be edited easily, but for demo OK
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={user?.role}
                                        disabled
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2 ml-1">Role cannot be changed.</p>
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
                                    >
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
