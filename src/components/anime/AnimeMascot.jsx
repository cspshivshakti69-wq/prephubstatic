import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimeMascot = ({ message, type = 'happy' }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto-hide after 10 seconds unless hovered
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 10000);
        return () => clearTimeout(timer);
    }, [message]);

    const avatars = {
        happy: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aqua&eyes=happy&mouth=smile&eyebrows=raisedExcited',
        excited: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aqua&eyes=star&mouth=laughing&eyebrows=raisedExcited',
        worried: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aqua&eyes=cry&mouth=sad&eyebrows=sadConcerned',
        flirty: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aqua&eyes=wink&mouth=smile&eyebrows=raisedExcited',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="fixed bottom-6 right-6 flex items-end gap-3 z-50 pointer-events-auto"
                    onMouseEnter={() => setIsVisible(true)}
                >
                    {/* Chat Bubble */}
                    <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-blue-50 mb-4 max-w-[250px] relative animate-bounce-slow">
                        <p className="text-sm font-medium text-gray-800">{message}</p>
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-blue-50"></div>
                    </div>

                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 rounded-full bg-blue-100 border-4 border-white shadow-2xl overflow-hidden cursor-pointer"
                        onClick={() => setIsVisible(false)}
                    >
                        <img src={avatars[type] || avatars.happy} alt="Anime Mascot" className="w-full h-full object-cover" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimeMascot;
