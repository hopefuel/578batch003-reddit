import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LikesProvider } from './contexts/LikesContext';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CryptoDetail } from './components/CryptoDetail';
import { Analytics } from './components/Analytics';
import { LikesPage } from './pages/LikesPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-cyber-darker text-white font-cyber">
            <Header />
            <main className="py-8">
              <Dashboard />
            </main>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/crypto/:id" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-cyber-darker text-white font-cyber">
            <Header />
            <main className="py-8">
              <CryptoDetail />
            </main>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/analytics" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-cyber-darker text-white font-cyber">
            <Header />
            <main className="py-8">
              <Analytics />
            </main>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/likes" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-cyber-darker text-white font-cyber">
            <Header />
            <main className="py-8">
              <LikesPage />
            </main>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LikesProvider>
          <AppRoutes />
        </LikesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;