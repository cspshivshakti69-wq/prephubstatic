import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import QuizzesPage from './pages/quizzes/QuizzesPage';
import QuizPlayer from './pages/quizzes/QuizPlayer';
import QuestionBankPage from './pages/questions/QuestionBankPage';
// import NotesPage from './pages/notes/NotesPage'; // Deprecated
import VideosPage from './pages/videos/VideosPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageQuestions from './pages/admin/ManageQuestions';
import ManageUsers from './pages/admin/ManageUsers';
import ManageVideos from './pages/admin/ManageVideos';
import ManageNotes from './pages/admin/ManageNotes';
import MagicNotes from './pages/notes/MagicNotes';
import Profile from './pages/profile/Profile'; // Updated Import
import GroupDecision from './pages/social/GroupDecision';
import CalendarPage from './pages/calendar/CalendarPage';
import Layout from './components/layout/Layout';
import GeminiBot from './components/ai/GeminiBot'; // Updated Import
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';

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
      <Route path="/signup" element={<SignupPage />} />

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
        <Route path="/notes" element={<MagicNotes />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/group-decision" element={<GroupDecision />} />
      </Route>

      {/* Admin Routes */}
      <Route element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/videos" element={<ManageVideos />} />
        <Route path="/admin/notes" element={<ManageNotes />} />
        <Route path="/admin/settings" element={<div>Settings</div>} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <AuthProvider>
          <AppRoutes />
          <GeminiBot />
        </AuthProvider>
      </Router>
    </Suspense>
  );
}

export default App;
