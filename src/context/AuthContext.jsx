import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Dummy login logic
        if (email === 'admin@examprephub.com' && password === 'admin123') {
            const adminUser = {
                name: 'Admin',
                email: email,
                role: 'admin',
                avatar: 'naviya', // Use an anime avatar name reference
            };
            localStorage.setItem('user', JSON.stringify(adminUser));
            setUser(adminUser);
            return { success: true };
        } else if (password.length >= 6) {
            // Allow any user login for demo
            const studentUser = {
                name: 'Demo Student',
                email: email,
                role: 'user',
                avatar: 'aqua',
            };
            localStorage.setItem('user', JSON.stringify(studentUser));
            setUser(studentUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
