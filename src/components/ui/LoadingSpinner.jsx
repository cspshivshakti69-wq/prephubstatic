import React from 'react';

const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
        <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
    </div>
);

export default LoadingSpinner;
