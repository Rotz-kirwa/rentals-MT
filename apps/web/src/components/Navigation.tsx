import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CommandPalette } from './common/CommandPalette';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (!sidebarCollapsed) {
      document.body.classList.add('toggle-sidebar');
    } else {
      document.body.classList.remove('toggle-sidebar');
    }
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />

      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/dashboard" className="logo d-flex align-items-center gap-2">
            <img src="/assets/img/logo.jpg" alt="My Nyumba Logo" style={{ borderRadius: '6px', maxHeight: '32px' }} />
            <span className="d-none d-lg-block" style={{ fontWeight: 700, color: '#012970', letterSpacing: '-0.02em' }}>
              My Nyumba <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.4rem', borderRadius: '4px', marginLeft: '0.2rem' }}>PRO</span>
            </span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '1.4rem' }}></i>
        </div>

        {/* Global Command Palette Search Trigger */}
        <div className="search-bar" onClick={() => setIsCommandPaletteOpen(true)} style={{ cursor: 'pointer' }}>
          <div className="search-form d-flex align-items-center" style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.4rem 0.8rem' }}>
            <i className="bi bi-search me-2" style={{ color: '#64748b' }}></i>
            <span style={{ fontSize: '0.875rem', color: '#64748b', flex: 1 }}>Search properties, tenants, invoices...</span>
            <kbd style={{ backgroundColor: '#ffffff', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
              ⌘K
            </kbd>
          </div>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center m-0 p-0" style={{ listStyle: 'none', gap: '0.5rem' }}>
            {/* Quick Action Button */}
            <li className="nav-item d-none d-md-block">
              <button
                className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                onClick={() => setIsCommandPaletteOpen(true)}
                style={{ borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Quick Action</span>
              </button>
            </li>

            <li className="nav-item px-1">
              <a className="nav-link nav-icon" href="#" title="Notifications" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-bell"></i>
                <span className="badge bg-danger badge-number">4</span>
              </a>
            </li>

            {/* User Profile */}
            <li className="nav-item dropdown pe-3 position-relative">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                onClick={(e) => { e.preventDefault(); setShowProfileDropdown(!showProfileDropdown); }}
              >
                <span
                  style={{
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  {user?.fullName?.charAt(0) || 'A'}
                </span>
                <span className="d-none d-md-block dropdown-toggle ps-2" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
                  {user?.fullName || 'Administrator'}
                </span>
              </a>

              {showProfileDropdown && (
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show position-absolute" style={{ top: '100%', right: 0, display: 'block', minWidth: '220px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <li className="dropdown-header text-start">
                    <h6 className="m-0 font-weight-bold" style={{ color: '#012970' }}>{user?.fullName}</h6>
                    <span className="small text-muted">{user?.role}</span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); setIsCommandPaletteOpen(true); setShowProfileDropdown(false); }}>
                      <i className="bi bi-search me-2"></i>
                      <span>Command Search (⌘K)</span>
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center text-danger" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* ======= Sidebar Navigation ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          
          {/* OVERVIEW */}
          <li className="nav-heading">Overview & Intelligence</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/dashboard') ? 'collapsed' : ''}`} to="/dashboard">
              <i className="bi bi-speedometer2"></i>
              <span>Executive Dashboard</span>
            </NavLink>
          </li>

          {/* PORTFOLIO */}
          <li className="nav-heading">Portfolio & Inventory</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/portfolio/properties') && !isActive('/properties') ? 'collapsed' : ''}`} to="/portfolio/properties">
              <i className="bi bi-buildings"></i>
              <span>Property Portfolio</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/portfolio/units') ? 'collapsed' : ''}`} to="/portfolio/units">
              <i className="bi bi-grid-3x3-gap"></i>
              <span>Visual Occupancy Grid</span>
            </NavLink>
          </li>

          {/* PEOPLE & LEASING */}
          <li className="nav-heading">Residents & Leasing</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/people/tenants') && !isActive('/tenants') ? 'collapsed' : ''}`} to="/people/tenants">
              <i className="bi bi-person-lines-fill"></i>
              <span>Resident Directory</span>
            </NavLink>
          </li>

          {/* FINANCE */}
          <li className="nav-heading">Financial Operating System</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/finance/invoices') && !isActive('/invoices') ? 'collapsed' : ''}`} to="/finance/invoices">
              <i className="bi bi-file-earmark-text"></i>
              <span>Invoices & Billing</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/finance/arrears') ? 'collapsed' : ''}`} to="/finance/arrears">
              <i className="bi bi-exclamation-triangle"></i>
              <span>Arrears Command Center</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/finance/payments') && !isActive('/payments') ? 'collapsed' : ''}`} to="/finance/payments">
              <i className="bi bi-phone-vibrate"></i>
              <span>Payments & M-Pesa</span>
            </NavLink>
          </li>

          {/* OPERATIONS */}
          <li className="nav-heading">Property Operations</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/operations/maintenance') && !isActive('/maintenance') ? 'collapsed' : ''}`} to="/operations/maintenance">
              <i className="bi bi-tools"></i>
              <span>Maintenance & Work Orders</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/operations/utilities') && !isActive('/utilities') ? 'collapsed' : ''}`} to="/operations/utilities">
              <i className="bi bi-lightning-charge"></i>
              <span>Utility Meter Readings</span>
            </NavLink>
          </li>

          {/* REPORTS */}
          <li className="nav-heading">Reports & System</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/reports') ? 'collapsed' : ''}`} to="/reports">
              <i className="bi bi-pie-chart"></i>
              <span>Reports & Analytics</span>
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <a className="nav-link collapsed text-danger" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
