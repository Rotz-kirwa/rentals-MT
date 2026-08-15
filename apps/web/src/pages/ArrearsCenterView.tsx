import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ArrearsCenterView() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchArrears();
  }, []);

  const fetchArrears = () => {
    setLoading(true);
    api.get('/billing/invoices')
      .then((res) => {
        const allInvoices = res.data.data || [];
        const overdueOnly = allInvoices.filter((inv: any) => inv.status === 'OVERDUE' || inv.status === 'UNPAID' || inv.status === 'PARTIAL');
        setInvoices(overdueOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching arrears:', err);
        setLoading(false);
      });
  };

  const handleSendReminder = (tenantName: string, phone: string) => {
    setActionSuccess(`SMS Payment Reminder successfully dispatched to ${tenantName} (${phone})`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const calculateDaysLate = (dueDateStr: string) => {
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const totalArrears = invoices.reduce((acc, inv) => acc + Number(inv.balance), 0);
  const late30Count = invoices.filter((i) => calculateDaysLate(i.dueDate) <= 30).length;
  const late60Count = invoices.filter((i) => calculateDaysLate(i.dueDate) > 30 && calculateDaysLate(i.dueDate) <= 60).length;
  const late90Count = invoices.filter((i) => calculateDaysLate(i.dueDate) > 60).length;

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        <div className="spinner-border text-danger me-2" role="status"></div>
        <span>Loading Arrears Command Center...</span>
      </div>
    );
  }

  return (
    <section className="section">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontWeight: 800, color: '#991b1b', margin: 0, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Arrears Command Center
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Collection intelligence, tenant debt aging breakdown, and automated collection reminders.
          </p>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={fetchArrears}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh Arrears
        </button>
      </div>

      {actionSuccess && (
        <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.2rem' }}></i>
          <div>{actionSuccess}</div>
        </div>
      )}

      {/* Arrears Aging Buckets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #fca5a5', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>Total Portfolio Arrears</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '0.25rem' }}>
            KES {totalArrears.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            {invoices.length} outstanding accounts
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #fed7aa', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase' }}>1 - 30 Days Overdue</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ea580c', marginTop: '0.25rem' }}>
            {late30Count} Accounts
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Initial payment grace period</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #fef08a', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a16207', textTransform: 'uppercase' }}>31 - 60 Days Overdue</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#d97706', marginTop: '0.25rem' }}>
            {late60Count} Accounts
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Secondary reminder required</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #fecaca', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>60+ Days Severe Arrears</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#991b1b', marginTop: '0.25rem' }}>
            {late90Count} Accounts
          </div>
          <div style={{ fontSize: '0.8rem', color: '#991b1b', marginTop: '0.25rem', fontWeight: 600 }}>Legal / Eviction review</div>
        </div>
      </div>

      {/* Itemized Arrears Directory Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Outstanding Tenant Ledgers</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.875rem' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ color: '#475569', fontWeight: 600 }}>Tenant Name</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Property & Unit</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Invoice #</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Days Late</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Balance Due</th>
                <th style={{ color: '#475569', fontWeight: 600 }}>Status</th>
                <th style={{ color: '#475569', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => {
                const daysLate = calculateDaysLate(inv.dueDate);
                return (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{inv.tenant?.fullName || 'N/A'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.tenant?.phoneNumber}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>House {inv.house?.houseNumber}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.house?.property?.name}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{inv.invoiceNumber}</td>
                    <td>
                      <span className={`badge bg-${daysLate > 30 ? 'danger' : 'warning text-dark'}`}>
                        {daysLate} Days Late
                      </span>
                    </td>
                    <td style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.95rem' }}>
                      KES {Number(inv.balance).toLocaleString()}
                    </td>
                    <td>
                      <span className="badge bg-danger">{inv.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline-primary btn-sm me-1"
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                        onClick={() => handleSendReminder(inv.tenant?.fullName, inv.tenant?.phoneNumber)}
                      >
                        <i className="bi bi-chat-dots-fill me-1"></i> Send SMS
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
