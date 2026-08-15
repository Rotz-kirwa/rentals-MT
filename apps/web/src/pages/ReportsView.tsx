import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ReportsView() {
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [activeTab, setActiveTab] = useState<'income' | 'occupancy' | 'expenses'>('income');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/properties'),
      api.get('/dashboard/stats'),
    ])
      .then(([propsRes, statsRes]) => {
        setProperties(propsRes.data.data || []);
        setReportData(statsRes.data.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reports data:', err);
        setLoading(false);
      });
  }, []);

  const handleExportCSV = () => {
    alert('Exporting statement to CSV file...');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Generating Property Operations & Financial Reports...</span>
      </div>
    );
  }

  const kpis = reportData?.kpis || {};
  const propertyPerformance = reportData?.propertyPerformance || [];

  return (
    <section className="section">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontWeight: 800, color: '#0f172a', margin: 0, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Financial & Operational Reports
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Portfolio revenue statements, arrears breakdown, property profitability, and audit exports.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleExportCSV}>
            <i className="bi bi-download me-1"></i> Export CSV
          </button>
          <button className="btn btn-primary btn-sm" onClick={handlePrint}>
            <i className="bi bi-printer me-1"></i> Print Statement
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', margin: 0 }}>Property Filter:</label>
          <select
            className="form-select form-select-sm"
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            style={{ width: '220px' }}
          >
            <option value="">Entire Portfolio (All Properties)</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', margin: 0 }}>Period:</label>
          <select className="form-select form-select-sm" style={{ width: '180px' }}>
            <option value="current">Current Month (August 2026)</option>
            <option value="q3">Q3 2026</option>
            <option value="ytd">Year-to-Date 2026</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('income')}
          style={{
            background: 'none',
            border: 'none',
            paddingBottom: '0.75rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: activeTab === 'income' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'income' ? '3px solid #0284c7' : 'none',
            cursor: 'pointer',
          }}
        >
          Income & Collection Statement
        </button>
        <button
          onClick={() => setActiveTab('occupancy')}
          style={{
            background: 'none',
            border: 'none',
            paddingBottom: '0.75rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: activeTab === 'occupancy' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'occupancy' ? '3px solid #0284c7' : 'none',
            cursor: 'pointer',
          }}
        >
          Occupancy & Vacancy Analysis
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'income' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Executive Income & Rent Collection Summary</h5>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Total Billed Revenue</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>KES {Number(kpis.expectedRent || 0).toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '0.75rem', color: '#166534', textTransform: 'uppercase', fontWeight: 600 }}>Total Reconciled Receipts</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>KES {Number(kpis.collectedRent || 0).toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ fontSize: '0.75rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 600 }}>Outstanding Balance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626' }}>KES {Number(kpis.outstandingRent || 0).toLocaleString()}</div>
            </div>
          </div>

          <table className="table table-hover align-middle">
            <thead>
              <tr style={{ color: '#475569' }}>
                <th>Property</th>
                <th>Units</th>
                <th>Occupancy</th>
                <th>Gross Billed</th>
                <th>Collected</th>
                <th>Arrears</th>
              </tr>
            </thead>
            <tbody>
              {propertyPerformance.map((p: any) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700 }}>{p.name}</td>
                  <td>{p.unitsCount} Units</td>
                  <td><span className="badge bg-success">{p.occupancyRate}%</span></td>
                  <td style={{ fontWeight: 600 }}>KES {(p.revenue + p.arrears).toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: '#16a34a' }}>KES {p.revenue.toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: '#dc2626' }}>KES {p.arrears.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'occupancy' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Portfolio Occupancy Metrics</h5>
          <div className="alert alert-info">
            Portfolio occupancy rate is currently <strong>{kpis.occupancyRate}%</strong> across {kpis.totalProperties} properties and {kpis.totalHouses} total units.
          </div>
        </div>
      )}
    </section>
  );
}
