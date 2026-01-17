import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import QuizzesPage from './pages/quizzes/QuizzesPage';
import QuizPlayer from './pages/quizzes/QuizPlayer';
import QuestionBankPage from './pages/questions/QuestionBankPage';
import NotesPage from './pages/notes/NotesPage';
import VideosPage from './pages/videos/VideosPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageQuestions from './pages/admin/ManageQuestions';
import ProfilePage from './pages/profile/ProfilePage';
import Layout from './components/layout/Layout';

// Placeholder imports for now
// const QuizzesPage = () => <div>Quizzes Page</div>;


const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes wrapped in Layout */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quiz/:quizId" element={<QuizPlayer />} />
        <Route path="/questions" element={<QuestionBankPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<div>Manage Users</div>} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/videos" element={<div>Manage Videos</div>} />
        <Route path="/admin/settings" element={<div>Settings</div>} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
