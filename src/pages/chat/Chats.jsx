import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertTriangle } from 'lucide-react';

const Chats = () => {
    return (
        <div className="min-h-screen bg-[#0a0d14] text-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-[#161b29] border border-purple-500/20 rounded-2xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
                    <MessageSquare size={40} />
                </div>
                <h2 className="text-3xl font-black mb-4">Chat System Upgrade</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-yellow-200 mb-6 flex items-start gap-3 text-left">
                    <AlertTriangle className="shrink-0 mt-1" size={18} />
                    <p className="text-sm">We are migrating our real-time infrastructure to a global serverless network (Firebase) for better performance.</p>
                </div>
                <p className="text-gray-400 mb-8">
                    The chat modules are temporarily offline while we transfer data. Check back soon for the new experience!
                </p>

                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-colors">
                    Notify Me When Ready
                </button>
            </motion.div>
        </div>
    );
};

export default Chats;
