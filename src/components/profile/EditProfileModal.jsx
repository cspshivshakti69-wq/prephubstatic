import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, ZoomIn, RotateCw, Camera } from 'lucide-react';
import getCroppedImg from '../../utils/cropImage';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [name, setName] = useState(user?.name || '');
    const [level, setLevel] = useState(user?.level || 'JEE Aspirant');
    const [bio, setBio] = useState(user?.bio || '');

    // Image State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            let avatarUrl = user?.avatar;
            if (imageSrc && croppedAreaPixels) {
                const croppedImage = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels,
                    rotation
                );
                avatarUrl = croppedImage;
            }

            onSave({
                name,
                level,
                bio,
                avatar: avatarUrl
            });
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-xl font-black text-white flex items-center gap-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                    Edit Profile
                                </span>
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar p-6 space-y-6">
                            {/* Image Section */}
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Profile Picture</label>

                                {imageSrc ? (
                                    <div className="space-y-4">
                                        <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden border border-white/10">
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                rotation={rotation}
                                                aspect={1}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                                onRotationChange={setRotation}
                                                cropShape="round"
                                                showGrid={false}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span className="flex items-center gap-1"><ZoomIn size={12} /> Zoom: {zoom}x</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    value={zoom}
                                                    min={1}
                                                    max={3}
                                                    step={0.1}
                                                    aria-labelledby="Zoom"
                                                    onChange={(e) => setZoom(e.target.value)}
                                                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span className="flex items-center gap-1"><RotateCw size={12} /> Rotate: {rotation}°</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    value={rotation}
                                                    min={0}
                                                    max={360}
                                                    step={1}
                                                    aria-labelledby="Rotation"
                                                    onChange={(e) => setRotation(e.target.value)}
                                                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setImageSrc(null)}
                                            className="text-xs text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                                        >
                                            Remove & Select New
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
                                        <div className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all">
                                            <div className="p-3 bg-gray-800 rounded-full group-hover:bg-cyan-500/20 text-cyan-400 transition-colors">
                                                <Camera size={24} />
                                            </div>
                                            <p className="text-sm text-gray-400 font-medium group-hover:text-cyan-200">Click to upload photo</p>
                                        </div>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            onChange={onFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Standard Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder-gray-600"
                                        placeholder="Enter your hero name..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Aspirant Level</label>
                                    <select
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option>JEE Aspirant</option>
                                        <option>NEET Aspirant</option>
                                        <option>Foundation (Class 9-10)</option>
                                        <option>Board Exam Warrior</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={3}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none transition-all resize-none placeholder-gray-600"
                                        placeholder="What's your goal?"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : <><Save size={18} /> Save Profile</>}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditProfileModal;
