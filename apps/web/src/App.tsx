import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import DashboardView from './pages/DashboardView';
import PropertiesView from './pages/PropertiesView';
import VisualOccupancyView from './pages/VisualOccupancyView';
import TenantsLeasesView from './pages/TenantsLeasesView';
import InvoicesPaymentsView from './pages/InvoicesPaymentsView';
import ArrearsCenterView from './pages/ArrearsCenterView';
import UtilitiesView from './pages/UtilitiesView';
import MaintenanceExpensesView from './pages/MaintenanceExpensesView';
import ReportsView from './pages/ReportsView';

function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-5 text-center text-muted">Loading My Nyumba Enterprise Platform...</div>;
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
    return <div className="p-5 text-center text-muted">Loading My Nyumba...</div>;
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
            
            {/* Portfolio Domain */}
            <Route path="/portfolio/properties" element={<PropertiesView />} />
            <Route path="/properties" element={<PropertiesView />} />
            <Route path="/portfolio/units" element={<VisualOccupancyView />} />

            {/* People & Leasing Domain */}
            <Route path="/people/tenants" element={<TenantsLeasesView />} />
            <Route path="/tenants" element={<TenantsLeasesView />} />
            <Route path="/leasing/leases" element={<TenantsLeasesView />} />

            {/* Finance Domain */}
            <Route path="/finance/invoices" element={<InvoicesPaymentsView />} />
            <Route path="/invoices" element={<InvoicesPaymentsView />} />
            <Route path="/finance/arrears" element={<ArrearsCenterView />} />
            <Route path="/finance/payments" element={<InvoicesPaymentsView />} />
            <Route path="/payments" element={<InvoicesPaymentsView />} />

            {/* Operations Domain */}
            <Route path="/operations/maintenance" element={<MaintenanceExpensesView />} />
            <Route path="/maintenance" element={<MaintenanceExpensesView />} />
            <Route path="/operations/utilities" element={<UtilitiesView />} />
            <Route path="/utilities" element={<UtilitiesView />} />

            {/* Reports Domain */}
            <Route path="/reports" element={<ReportsView />} />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
