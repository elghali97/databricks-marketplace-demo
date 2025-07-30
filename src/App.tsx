import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types/user';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Dashboard from './pages/Dashboard';
import MarketplacePage from './pages/MarketplacePage';
import DatasetDetailsPage from './pages/DatasetDetailsPage';
import ProfilePage from './pages/ProfilePage';
import MyDataPage from './pages/MyDataPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DatasetManagement from './pages/admin/DatasetManagement';
import UserManagement from './pages/admin/UserManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import LoginPage from './pages/auth/LoginPage';

// Context
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  
  // Handle login for demo
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <UserProvider>
      <Routes>
        {/* Public and User Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="datasets/:id" element={<DatasetDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-data" element={<MyDataPage />} />
          <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="datasets" element={<DatasetManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
}

export default App;