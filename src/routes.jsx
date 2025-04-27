import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import PrivateRoute from "./components/PrivateRoute";

// ... existing code ...
const HomePage = lazy(() => import('./pages/public/HomePage'));
const PlantsPage = lazy(() => import('./pages/public/PlantsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'));
const DashboardPage = lazy(() => import('./pages/user/DashboardPage'));
const CartPage = lazy(() => import('./pages/user/CartPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const PlantDetailPage = lazy(() => import('./pages/public/PlantDetailPage'));
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/plants/:id" element={<PlantsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plants/:id" element={<PlantDetailPage />} />
        <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
        </Route>

        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;