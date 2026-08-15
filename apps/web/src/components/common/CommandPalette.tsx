import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    properties: any[];
    tenants: any[];
    invoices: any[];
    maintenance: any[];
  }>({ properties: [], tenants: [], invoices: [], maintenance: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ properties: [], tenants: [], invoices: [], maintenance: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [propsRes, tenantsRes, invoicesRes, maintRes] = await Promise.all([
          api.get('/properties').catch(() => ({ data: { data: [] } })),
          api.get('/tenants').catch(() => ({ data: { data: [] } })),
          api.get('/billing/invoices').catch(() => ({ data: { data: [] } })),
          api.get('/maintenance').catch(() => ({ data: { data: [] } })),
        ]);

        const q = query.toLowerCase();

        const properties = (propsRes.data.data || []).filter((p: any) =>
          p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
        ).slice(0, 3);

        const tenants = (tenantsRes.data.data || []).filter((t: any) =>
          t.fullName.toLowerCase().includes(q) || (t.email && t.email.toLowerCase().includes(q)) || t.phoneNumber.includes(q)
        ).slice(0, 3);

        const invoices = (invoicesRes.data.data || []).filter((i: any) =>
          i.invoiceNumber.toLowerCase().includes(q) || (i.tenant && i.tenant.fullName.toLowerCase().includes(q))
        ).slice(0, 3);

        const maintenance = (maintRes.data.data || []).filter((m: any) =>
          m.title.toLowerCase().includes(q) || (m.house && m.house.houseNumber.toLowerCase().includes(q))
        ).slice(0, 3);

        setResults({ properties, tenants, invoices, maintenance });
      } catch (err) {
        console.error('Command search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
          <i className="bi bi-search" style={{ fontSize: '1.25rem', color: '#64748b', marginRight: '0.75rem' }}></i>
          <input
            type="text"
            placeholder="Search properties, tenants, invoices, work orders... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#0f172a',
              backgroundColor: 'transparent',
            }}
          />
          <kbd
            style={{
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Command Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.5rem 0' }}>
          {!query.trim() && (
            <div style={{ padding: '0.5rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Quick Action Shortcuts
              </div>
              <div
                className="command-item"
                onClick={() => handleSelect('/portfolio/properties')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <i className="bi bi-building-add" style={{ color: '#0284c7' }}></i>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1e293b' }}>View Property Portfolio</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Explore all 4 properties across Nairobi</div>
                </div>
              </div>

              <div
                className="command-item"
                onClick={() => handleSelect('/portfolio/units')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <i className="bi bi-grid-3x3-gap-fill" style={{ color: '#059669' }}></i>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1e293b' }}>Visual Unit Occupancy Grid</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Interactive floor plan map (Occupied / Vacant / Maintenance)</div>
                </div>
              </div>

              <div
                className="command-item"
                onClick={() => handleSelect('/finance/arrears')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <i className="bi bi-exclamation-triangle-fill" style={{ color: '#dc2626' }}></i>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1e293b' }}>Open Arrears Command Center</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Review overdue rent balances and send reminders</div>
                </div>
              </div>

              <div
                className="command-item"
                onClick={() => handleSelect('/finance/payments')}
                style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <i className="bi bi-phone-vibrate-fill" style={{ color: '#7c3aed' }}></i>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1e293b' }}>M-Pesa Reconciliation Engine</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Verify STK push callbacks and receipts</div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Searching portfolio database...
            </div>
          )}

          {!loading && query.trim().length >= 2 && (
            <div>
              {results.properties.length > 0 && (
                <div style={{ padding: '0.5rem 1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Properties
                  </div>
                  {results.properties.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelect(`/portfolio/properties?id=${p.id}`)}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#0f172a' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.location}</div>
                      </div>
                      <span className="badge bg-primary text-white">{p.stats?.occupancyRate ?? 0}% Occupied</span>
                    </div>
                  ))}
                </div>
              )}

              {results.tenants.length > 0 && (
                <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Tenants & Residents
                  </div>
                  {results.tenants.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleSelect(`/people/tenants?id=${t.id}`)}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#0f172a' }}>{t.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Phone: {t.phoneNumber}</div>
                      </div>
                      <span className="badge bg-light text-dark">Resident</span>
                    </div>
                  ))}
                </div>
              )}

              {results.invoices.length > 0 && (
                <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Invoices
                  </div>
                  {results.invoices.map((inv) => (
                    <div
                      key={inv.id}
                      onClick={() => handleSelect('/finance/invoices')}
                      style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#0f172a' }}>{inv.invoiceNumber}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tenant: {inv.tenant?.fullName ?? 'N/A'}</div>
                      </div>
                      <span className={`badge bg-${inv.status === 'PAID' ? 'success' : inv.status === 'OVERDUE' ? 'danger' : 'warning'}`}>
                        KES {Number(inv.totalAmount).toLocaleString()} ({inv.status})
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {results.properties.length === 0 && results.tenants.length === 0 && results.invoices.length === 0 && results.maintenance.length === 0 && (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                  No matching records found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '0.5rem 1rem', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          <div>
            Press <kbd style={{ backgroundColor: '#e2e8f0', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>⌘K</kbd> anytime to open Command Palette
          </div>
          <div>My Nyumba Enterprise v2.0</div>
        </div>
      </div>
    </div>
  );
};
