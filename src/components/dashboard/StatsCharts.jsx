import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    RadialLinearScale
} from 'chart.js';
import { Line, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    RadialLinearScale
);

export const StatsCharts = () => {
    // Mock Data - In real app, props

    // 1. Performance History (Line Chart)
    const lineData = {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
        datasets: [
            {
                label: 'Physics',
                data: [65, 70, 68, 75, 82, 85],
                borderColor: 'rgb(147, 51, 234)', // Purple
                backgroundColor: 'rgba(147, 51, 234, 0.5)',
                tension: 0.4
            },
            {
                label: 'Chemistry',
                data: [60, 65, 72, 70, 78, 80],
                borderColor: 'rgb(16, 185, 129)', // Green
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4
            },
            {
                label: 'Maths',
                data: [55, 60, 58, 65, 70, 75],
                borderColor: 'rgb(59, 130, 246)', // Blue
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    };

    // 2. Subject Weakness (Radar Chart)
    const radarData = {
        labels: ['Mechanics', 'Organic Chem', 'Calculus', 'Optics', 'Inorganic', 'Algebra'],
        datasets: [
            {
                label: 'Proficiency Score',
                data: [80, 55, 70, 90, 60, 75],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    // 3. Accuracy Overview (Doughnut)
    const doughnutData = {
        labels: ['Correct', 'Incorrect', 'Skipped'],
        datasets: [
            {
                data: [350, 120, 30],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)', // Green
                    'rgba(239, 68, 68, 0.8)', // Red
                    'rgba(243, 244, 246, 0.8)', // Gray
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trend */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Trends</h3>
                <div className="h-64">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>

            {/* Topic Mastery Radar */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Topic Mastery</h3>
                <div className="h-64 flex justify-center">
                    <Radar data={radarData} options={{ scales: { r: { min: 0, max: 100 } } }} />
                </div>
            </div>

            {/* Accuracy Breakdown */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 lg:col-span-2 flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 h-56 flex justify-center">
                    <Doughnut data={doughnutData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                </div>
                <div className="flex-1 space-y-4 w-full">
                    <h3 className="text-xl font-bold text-gray-800">Analysis Insight</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Your performance in <span className="font-bold text-purple-600">Physics (Optics)</span> is outstanding!
                        However, <span className="font-bold text-red-500">Organic Chemistry</span> needs immediate attention.
                        Accuracy has improved by <span className="text-green-600 font-bold">+12%</span> this week.
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 text-right">Top 15% of students globally</p>
                </div>
            </div>
        </div>
    );
};
