import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (!sidebarCollapsed) {
      document.body.classList.add('toggle-sidebar');
    } else {
      document.body.classList.remove('toggle-sidebar');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/dashboard" className="logo d-flex align-items-center">
            <img src="/assets/img/logo.jpg" alt="My Nyumba Logo" />
            <span className="d-none d-lg-block">My Nyumba</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} style={{ cursor: 'pointer' }}></i>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="query" placeholder="Search properties, tenants, invoices..." title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center m-0 p-0" style={{ listStyle: 'none' }}>
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle" href="#" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item px-2">
              <a className="nav-link nav-icon" href="#" title="Notifications" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-bell"></i>
                <span className="badge bg-danger badge-number">4</span>
              </a>
            </li>

            <li className="nav-item px-2">
              <a className="nav-link nav-icon" href="#" title="Messages" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-chat-dots"></i>
                <span className="badge bg-primary badge-number">2</span>
              </a>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown pe-3 position-relative">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                onClick={(e) => { e.preventDefault(); setShowProfileDropdown(!showProfileDropdown); }}
              >
                <span className="mn-avatar-icon" aria-hidden="true" style={{ backgroundColor: '#4154f1', color: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-person-fill"></i>
                </span>
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user?.fullName || 'Administrator'}
                </span>
              </a>

              {showProfileDropdown && (
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show position-absolute" style={{ top: '100%', right: 0, display: 'block', minWidth: '220px' }}>
                  <li className="dropdown-header text-start">
                    <h6 className="m-0 font-weight-bold" style={{ color: '#012970' }}>{user?.fullName}</h6>
                    <span className="small text-muted">{user?.role}</span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e) => e.preventDefault()}>
                      <i className="bi bi-person me-2"></i>
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e) => e.preventDefault()}>
                      <i className="bi bi-gear me-2"></i>
                      <span>Account Settings</span>
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

      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-heading">Overview</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/dashboard') ? 'collapsed' : ''}`} to="/dashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-heading">Properties & Units</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/properties') ? 'collapsed' : ''}`} to="/properties">
              <i className="bi bi-buildings"></i>
              <span>Properties & Houses</span>
            </NavLink>
          </li>

          <li className="nav-heading">Tenants & Leases</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/tenants') ? 'collapsed' : ''}`} to="/tenants">
              <i className="bi bi-people"></i>
              <span>Tenants & Leases</span>
            </NavLink>
          </li>

          <li className="nav-heading">Finance</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/invoices') ? 'collapsed' : ''}`} to="/invoices">
              <i className="bi bi-receipt"></i>
              <span>Invoices & Billing</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/payments') ? 'collapsed' : ''}`} to="/payments">
              <i className="bi bi-file-earmark-check"></i>
              <span>Payments & Receipts</span>
            </NavLink>
          </li>

          <li className="nav-heading">Utilities</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/utilities') ? 'collapsed' : ''}`} to="/utilities">
              <i className="bi bi-lightning-charge"></i>
              <span>Meter Readings</span>
            </NavLink>
          </li>

          <li className="nav-heading">Operations</li>
          <li className="nav-item">
            <NavLink className={`nav-link ${!isActive('/maintenance') ? 'collapsed' : ''}`} to="/maintenance">
              <i className="bi bi-tools"></i>
              <span>Maintenance & Expenses</span>
            </NavLink>
          </li>

          <li className="nav-heading">System</li>
          <li className="nav-item">
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
