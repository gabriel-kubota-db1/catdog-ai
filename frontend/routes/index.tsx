import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import PetListPage from '@/features/pets/pages/PetListPage';
import AdminDashboardPage from '@/features/dashboard/pages/AdminDashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PetListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route 
        path="/admin/dashboard" 
        element={
          <PrivateRoute action="manage" subject="all">
            <AdminDashboardPage />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
