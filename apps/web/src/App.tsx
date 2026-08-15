import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import DashboardView from './pages/DashboardView';
import PropertiesView from './pages/PropertiesView';
import TenantsLeasesView from './pages/TenantsLeasesView';
import InvoicesPaymentsView from './pages/InvoicesPaymentsView';
import UtilitiesView from './pages/UtilitiesView';
import MaintenanceExpensesView from './pages/MaintenanceExpensesView';

function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-5 text-center text-muted">Loading application...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navigation />
      <main id="main" className="main">
        <Outlet />
      </main>
    </>
  );
}

function PublicAuthRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-5 text-center text-muted">Loading application...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicAuthRoute />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/properties" element={<PropertiesView />} />
            <Route path="/tenants" element={<TenantsLeasesView />} />
            <Route path="/invoices" element={<InvoicesPaymentsView />} />
            <Route path="/payments" element={<InvoicesPaymentsView />} />
            <Route path="/utilities" element={<UtilitiesView />} />
            <Route path="/maintenance" element={<MaintenanceExpensesView />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
