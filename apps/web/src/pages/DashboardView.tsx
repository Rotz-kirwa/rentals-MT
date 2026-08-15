import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function DashboardView() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Loading Executive Property Operations Command Center...</span>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const actionCenter = data?.actionCenter || {};
  const propertyPerformance = data?.propertyPerformance || [];

  return (
    <section className="section">
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontWeight: 800, color: '#0f172a', margin: 0, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Portfolio Command Center
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Welcome back, <strong>{user?.fullName || 'Property Manager'}</strong> • Real-time operational intelligence across Nairobi portfolio.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/portfolio/units" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-grid-3x3-gap-fill"></i> Visual Floor Plan
          </Link>
          <Link to="/finance/arrears" className="btn btn-danger btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-exclamation-triangle-fill"></i> Arrears Center ({actionCenter.overdueInvoicesCount || 0})
          </Link>
        </div>
      </div>

      {/* 1. Executive Metric KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Occupancy Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Portfolio Occupancy</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', backgroundColor: '#dcfce7', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
              {kpis.occupancyDelta || '+2.4%'}
            </span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>{kpis.occupancyRate}%</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            <strong>{kpis.occupiedHouses}</strong> occupied of <strong>{kpis.totalHouses}</strong> units
          </div>
        </div>

        {/* Expected Rent Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Expected Rent</span>
            <i className="bi bi-cash-stack" style={{ color: '#0284c7', fontSize: '1.1rem' }}></i>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            KES {Number(kpis.expectedRent || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            Total billed for current period
          </div>
        </div>

        {/* Collected Rent Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Rent Collected</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
              {kpis.collectionPercentage}%
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>
            KES {Number(kpis.collectedRent || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            Successfully reconciled payments
          </div>
        </div>

        {/* Outstanding Arrears Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Outstanding Arrears</span>
            <i className="bi bi-exclamation-triangle-fill" style={{ color: '#dc2626', fontSize: '1.1rem' }}></i>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626' }}>
            KES {Number(kpis.outstandingRent || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '0.25rem', fontWeight: 500 }}>
            {actionCenter.overdueInvoicesCount} invoices pending collection
          </div>
        </div>
      </div>

      {/* 2. Rent Collection Performance Gauge & Action Center */}
      <div className="row g-4 mb-4">
        {/* Rent Collection Gauge */}
        <div className="col-lg-8">
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h5 style={{ fontWeight: 700, margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Rent Collection Progress</h5>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Billing Cycle Performance</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>{kpis.collectionPercentage}%</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Target: 95%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress mb-3" style={{ height: '14px', borderRadius: '7px', backgroundColor: '#f1f5f9' }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${kpis.collectionPercentage}%` }}
                aria-valuenow={kpis.collectionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
              <div><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#059669', borderRadius: '50%', marginRight: '6px' }}></span>Collected: <strong>KES {Number(kpis.collectedRent || 0).toLocaleString()}</strong></div>
              <div><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#dc2626', borderRadius: '50%', marginRight: '6px' }}></span>Arrears: <strong>KES {Number(kpis.outstandingRent || 0).toLocaleString()}</strong></div>
              <div><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#cbd5e1', borderRadius: '50%', marginRight: '6px' }}></span>Total Billed: <strong>KES {Number(kpis.expectedRent || 0).toLocaleString()}</strong></div>
            </div>
          </div>
        </div>

        {/* Action Center Checklist */}
        <div className="col-lg-4">
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <h5 style={{ fontWeight: 700, margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.1rem' }}>Operational Action Center</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/finance/arrears" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <i className="bi bi-exclamation-circle-fill text-danger"></i>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#991b1b' }}>Overdue Rent Invoices</span>
                  </div>
                  <span className="badge bg-danger">{actionCenter.overdueInvoicesCount || 0} Required</span>
                </div>
              </Link>

              <Link to="/operations/maintenance" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#fffbebfb', border: '1px solid #fde68a', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <i className="bi bi-tools text-warning"></i>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>Open Maintenance Tickets</span>
                  </div>
                  <span className="badge bg-warning text-dark">{actionCenter.openMaintenanceCount || 0} Open</span>
                </div>
              </Link>

              <Link to="/portfolio/units" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <i className="bi bi-house-door-fill text-info"></i>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0369a1' }}>Vacant Units Ready</span>
                  </div>
                  <span className="badge bg-info text-white">{actionCenter.vacantUnitsCount || 0} Vacant</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Portfolio Performance Breakdown Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h5 style={{ fontWeight: 700, margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Portfolio Performance Breakdown</h5>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Individual property occupancy, monthly revenue & active arrears</span>
          </div>
          <Link to="/portfolio/properties" className="btn btn-link btn-sm text-decoration-none">
            View All Properties →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ color: '#475569', fontWeight: 600 }}>Property Name</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Location</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Total Units</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Occupancy %</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Monthly Revenue</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Outstanding Arrears</th>
                <th style={{ color: '#475569', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {propertyPerformance.map((prop: any) => (
                <tr key={prop.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{prop.name}</td>
                  <td style={{ color: '#64748b' }}>{prop.location}</td>
                  <td>
                    <strong>{prop.occupiedCount}</strong> / {prop.unitsCount} units
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress flex-fill" style={{ height: '6px', maxWidth: '80px', backgroundColor: '#f1f5f9' }}>
                        <div
                          className={`progress-bar bg-${prop.occupancyRate >= 90 ? 'success' : prop.occupancyRate >= 75 ? 'primary' : 'warning'}`}
                          style={{ width: `${prop.occupancyRate}%` }}
                        ></div>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{prop.occupancyRate}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>
                    KES {Number(prop.revenue).toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 700, color: prop.arrears > 0 ? '#dc2626' : '#64748b' }}>
                    KES {Number(prop.arrears).toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/portfolio/properties?id=${prop.id}`} className="btn btn-outline-secondary btn-sm" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Live Activity Timeline & Overdue Invoices */}
      <div className="row g-4">
        {/* Overdue Invoices Quick Follow-up */}
        <div className="col-lg-6">
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h5 style={{ fontWeight: 700, margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Overdue Invoices Requiring Follow-Up</h5>
              <Link to="/finance/arrears" className="badge bg-danger text-decoration-none">Arrears Center</Link>
            </div>

            <div className="table-responsive">
              <table className="table table-sm align-middle" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ color: '#64748b' }}>
                    <th>Tenant</th>
                    <th>Unit</th>
                    <th>Balance</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.overdueInvoices || []).map((inv: any) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 600 }}>{inv.tenant?.fullName}</td>
                      <td>{inv.house?.houseNumber} ({inv.house?.property?.name})</td>
                      <td style={{ fontWeight: 700, color: '#dc2626' }}>KES {Number(inv.balance).toLocaleString()}</td>
                      <td style={{ color: '#94a3b8' }}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Recent Payments Timeline */}
        <div className="col-lg-6">
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h5 style={{ fontWeight: 700, margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Recent Payment Reconciliations</h5>
              <Link to="/finance/payments" className="badge bg-success text-decoration-none">M-Pesa Ledger</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(data?.recentPayments || []).map((pay: any) => (
                <div key={pay.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                      ✓
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>{pay.tenant?.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ref: {pay.transactionReference || 'M-PESA'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#059669' }}>+KES {Number(pay.amountPaid).toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(pay.paymentDate).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
