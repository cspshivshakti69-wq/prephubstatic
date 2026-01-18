import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const AnimatedBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = {
        background: {
            color: {
                value: "#000000", // Dark void for contrast
            },
            image: "radial-gradient(circle at 50% 100%, #1a0b2e 0%, #000000 100%)", // Magical glow from bottom
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble", // Float effect
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 1,
                },
            },
        },
        particles: {
            color: {
                // Fantasy palette: Aurora Green, Mystic Purple, Starlight Gold, Crystal Blue, Dragon Red
                value: ["#00ff9d", "#bd00ff", "#ffd700", "#00b8ff", "#ff0055"],
            },
            move: {
                enable: true,
                direction: "none",
                speed: 0.8, // Floating speed
                random: true,
                straight: false,
                outModes: "out",
            },
            number: {
                value: 60,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            opacity: {
                value: { min: 0.3, max: 0.8 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            shape: {
                type: ["circle", "star"],
            },
            size: {
                value: { min: 2, max: 5 },
            },
            twinkle: {
                particles: {
                    enable: true,
                    color: "#ffffff",
                    frequency: 0.05,
                    opacity: 1
                }
            }
        },
        detectRetina: true,
    };

    return (
        <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden">
            {/* Base Particles */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={options}
                className="absolute inset-0"
            />

            {/* Fantasy Atmospheric Layers */}

            {/* 1. Aurora Borealis Effect - Top Gradient */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent blend-overlay pointer-events-none"></div>

            {/* 2. Mystical Fog - Bottom Blur */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/10 to-transparent backdrop-blur-[1px] pointer-events-none"></div>

            {/* 3. Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        </div>
    );
};

export default AnimatedBackground;
