import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user
        const storedUser = localStorage.getItem('user');
        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from local storage:", error);
            localStorage.removeItem('user');
        }
        setLoading(false);
    }, []);

    const login = (email, password, remember = false) => {
        // Dummy login logic
        let loggedUser = null;
        if (email === 'admin@examprephub.com' && password === 'admin123') {
            loggedUser = {
                name: 'Admin',
                email: email,
                role: 'admin',
                avatar: 'naviya',
            };
        } else if (password.length >= 6) {
            loggedUser = {
                name: 'Student',
                email: email,
                role: 'user',
                avatar: 'aqua',
            };
        }

        if (loggedUser) {
            if (remember) {
                localStorage.setItem('user', JSON.stringify(loggedUser));
            } else {
                sessionStorage.setItem('user', JSON.stringify(loggedUser));
            }
            setUser(loggedUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (name, email, password) => {
        // Dummy signup logic
        const newUser = {
            name: name || 'Explorer',
            email: email,
            role: 'user',
            avatar: 'aqua',
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        // We don't necessarily login immediately if the user wants an intermediate success screen
        return { success: true, user: newUser };
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
