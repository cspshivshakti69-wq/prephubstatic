import { Award, Shield, CreditCard, RefreshCcw, LogOut } from 'lucide-react';

export const getProfileOptions = (handlers) => [
    {
        id: 'achievements',
        name: 'Achievements',
        desc: 'View your badges and study milestones',
        icon: Award,
        color: 'text-yellow-400',
        action: handlers.onAchievements
    },
    {
        id: 'privacy',
        name: 'Privacy',
        desc: 'Manage your data and visibility settings',
        icon: Shield,
        color: 'text-blue-400',
        action: handlers.onPrivacy
    },
    {
        id: 'payments',
        name: 'Payments',
        desc: 'Billing history and subscription plan',
        icon: CreditCard,
        color: 'text-emerald-400',
        action: handlers.onPayments
    },
    {
        id: 'switch',
        name: 'Switch Account',
        desc: 'Sign in to a different profile',
        icon: RefreshCcw,
        color: 'text-purple-400',
        action: handlers.onSwitch
    },
    {
        id: 'logout',
        name: 'Log Out',
        desc: 'Securely end your current session',
        icon: LogOut,
        color: 'text-red-400',
        action: handlers.onLogout
    }
];
