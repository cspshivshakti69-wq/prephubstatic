import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl mb-4">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                        Entrance Exam <span className="text-primary">Prep Hub</span>
                    </h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-primary hover:text-primary-hover font-medium">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                    >
                        Sign in
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-primary font-medium hover:underline">
                        Sign up
                    </a>
                </div>
            </motion.div>

            {/* Anime Mascot Hint (Static for now) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
                className="fixed bottom-10 right-10 hidden md:flex items-end gap-4"
            >
                <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-lg mb-8 relative max-w-[200px]">
                    <p className="text-sm text-gray-700">"Psst! Use password <span className="font-mono bg-gray-100 px-1 rounded">admin123</span> for admin access!" 😉</p>
                </div>
                {/* Placeholder for Anime Avatar */}
                <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aqua&eyes=happy&mouth=smile" alt="Anime Character" className="w-full h-full object-cover" />
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
