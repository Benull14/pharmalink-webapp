import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';

// Lazy-loaded pages
const Products = lazy(() => import('./pages/Products'));
const Warehouses = lazy(() => import('./pages/Warehouses'));
const Pharmacies = lazy(() => import('./pages/Pharmacies'));
const Commissions = lazy(() => import('./pages/Commissions'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Products />
            </Suspense>
          } />
          <Route path="warehouses" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Warehouses />
            </Suspense>
          } />
          <Route path="pharmacies" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Pharmacies />
            </Suspense>
          } />
          <Route path="commissions" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Commissions />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App