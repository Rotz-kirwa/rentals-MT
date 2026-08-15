import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TenantsLeasesView() {
  const { token, user } = useAuth();
  const [tenants, setTenants] = useState<any[]>([]);
  const [leases, setLeases] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [showLeaseModal, setShowLeaseModal] = useState(false);

  // Tenant form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [natId, setNatId] = useState('');

  // Lease form
  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [selectedHouseId, setSelectedHouseId] = useState('');
  const [rent, setRent] = useState(15000);
  const [deposit, setDeposit] = useState(15000);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]);

  const isManager = user?.role === 'SUPER_ADMIN' || user?.role === 'PROPERTY_MANAGER';

  const fetchData = () => {
    Promise.all([
      fetch('/api/v1/tenants', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/leases', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/houses?status=VACANT', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([tData, lData, hData]) => {
      setTenants(tData.tenants || []);
      setLeases(lData.leases || []);
      setHouses(hData.houses || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleRegisterTenant = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fullName, email, phoneNumber: phone, nationalId: natId }),
    });
    if (res.ok) {
      setShowTenantModal(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setNatId('');
      fetchData();
    }
  };

  const handleExecuteLease = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/leases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        tenantId: selectedTenantId,
        houseId: selectedHouseId,
        monthlyRent: Number(rent),
        securityDeposit: Number(deposit),
        startDate,
        endDate,
      }),
    });
    if (res.ok) {
      setShowLeaseModal(false);
      fetchData();
    }
  };

  const handleTerminateLease = async (id: string) => {
    if (!confirm('Are you sure you want to terminate this lease? Unit status will be set to VACANT.')) return;
    const res = await fetch(`/api/v1/leases/${id}/terminate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchData();
    }
  };

  if (loading) return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading tenant records...</div>;

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>👥 Tenant & Lease Register</h2>
        {isManager && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setShowTenantModal(true)} style={{ padding: '0.6rem 1rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              + Register New Tenant
            </button>
            <button onClick={() => setShowLeaseModal(true)} style={{ padding: '0.6rem 1rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              + Execute New Lease
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Tenants Table */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Registered Tenants Directory</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Phone</th>
                <th style={{ padding: '0.5rem' }}>National ID</th>
                <th style={{ padding: '0.5rem' }}>Assigned House</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontWeight: '600' }}>{t.fullName}</td>
                  <td style={{ padding: '0.5rem' }}>{t.phoneNumber}</td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{t.nationalId}</td>
                  <td style={{ padding: '0.5rem', color: '#0284c7', fontWeight: '500' }}>
                    {t.leases?.[0]?.house?.houseNumber ? `Unit ${t.leases[0].house.houseNumber}` : 'Unassigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leases Table */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Active Lease Agreements</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Unit</th>
                <th style={{ padding: '0.5rem' }}>Tenant</th>
                <th style={{ padding: '0.5rem' }}>Rent</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
                <th style={{ padding: '0.5rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((l) => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Unit {l.house?.houseNumber}</td>
                  <td style={{ padding: '0.5rem' }}>{l.tenant?.fullName}</td>
                  <td style={{ padding: '0.5rem', color: '#16a34a', fontWeight: 'bold' }}>KSh {Number(l.monthlyRent).toLocaleString()}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: l.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2', color: l.status === 'ACTIVE' ? '#166534' : '#991b1b' }}>
                      {l.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    {isManager && l.status === 'ACTIVE' && (
                      <button onClick={() => handleTerminateLease(l.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                        Terminate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Modal */}
      {showTenantModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Register Tenant</h3>
            <form onSubmit={handleRegisterTenant}>
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <input type="text" placeholder="Phone Number (e.g. 0712345678)" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <input type="text" placeholder="National ID / Passport" value={natId} onChange={(e) => setNatId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <input type="email" placeholder="Email Address (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowTenantModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0284c7', color: '#fff', border: 'none' }}>Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lease Modal */}
      {showLeaseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '450px' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Execute Lease Contract</h3>
            <form onSubmit={handleExecuteLease}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Select Tenant:</label>
              <select value={selectedTenantId} onChange={(e) => setSelectedTenantId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="">-- Choose Tenant --</option>
                {tenants.map((t) => <option key={t.id} value={t.id}>{t.fullName} (ID: {t.nationalId})</option>)}
              </select>

              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Select Vacant Unit:</label>
              <select value={selectedHouseId} onChange={(e) => setSelectedHouseId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="">-- Choose Vacant Unit --</option>
                {houses.map((h) => <option key={h.id} value={h.id}>Unit {h.houseNumber} - {h.property?.name} (KSh {Number(h.defaultRent)})</option>)}
              </select>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem' }}>Monthly Rent:</label>
                  <input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem' }}>Deposit:</label>
                  <input type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem' }}>Start Date:</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem' }}>End Date:</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowLeaseModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#16a34a', color: '#fff', border: 'none' }}>Execute Lease</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
