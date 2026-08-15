import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UtilitiesView() {
  const { token, user } = useAuth();
  const [utilities, setUtilities] = useState<any[]>([]);
  const [readings, setReadings] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form
  const [selectedHouseId, setSelectedHouseId] = useState('');
  const [selectedUtilityId, setSelectedUtilityId] = useState('');
  const [currentReading, setCurrentReading] = useState(0);
  const [readingDate, setReadingDate] = useState(new Date().toISOString().split('T')[0]);

  const canRecord = user?.role === 'SUPER_ADMIN' || user?.role === 'PROPERTY_MANAGER' || user?.role === 'CARETAKER';

  const fetchData = () => {
    Promise.all([
      fetch('/api/v1/utilities', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/utility-readings', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/houses', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([uData, rData, hData]) => {
      setUtilities(uData.utilities || []);
      setReadings(rData.readings || []);
      setHouses(hData.houses || []);
      if (uData.utilities?.length > 0) setSelectedUtilityId(uData.utilities[0].id);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleRecordReading = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/v1/utility-readings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        houseId: selectedHouseId,
        utilityId: selectedUtilityId,
        currentReading: Number(currentReading),
        readingDate,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.detail || 'Failed to record meter reading.');
    } else {
      setCurrentReading(0);
      fetchData();
    }
  };

  if (loading) return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading meter logs...</div>;

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🚰 Utility Meter Readings</h2>

      <div style={{ display: 'grid', gridTemplateColumns: canRecord ? '360px 1fr' : '1fr', gap: '1.5rem' }}>
        {/* Record Reading Form */}
        {canRecord && (
          <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Log Meter Reading</h3>
            {error && <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleRecordReading}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Select House/Unit:</label>
              <select value={selectedHouseId} onChange={(e) => setSelectedHouseId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="">-- Choose Unit --</option>
                {houses.map((h) => <option key={h.id} value={h.id}>Unit {h.houseNumber} ({h.property?.name})</option>)}
              </select>

              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Utility Type:</label>
              <select value={selectedUtilityId} onChange={(e) => setSelectedUtilityId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                {utilities.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.billingType} - KSh {Number(u.defaultRatePerUnit)}/{u.unitName})</option>)}
              </select>

              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Current Meter Reading:</label>
              <input type="number" step="0.001" value={currentReading} onChange={(e) => setCurrentReading(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />

              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Reading Date:</label>
              <input type="date" value={readingDate} onChange={(e) => setReadingDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />

              <button type="submit" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Save Meter Reading
              </button>
            </form>
          </div>
        )}

        {/* Readings Log Table */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Consumption History Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Unit</th>
                <th style={{ padding: '0.5rem' }}>Utility</th>
                <th style={{ padding: '0.5rem' }}>Prev $\rightarrow$ Curr</th>
                <th style={{ padding: '0.5rem' }}>Used</th>
                <th style={{ padding: '0.5rem' }}>Charge</th>
                <th style={{ padding: '0.5rem' }}>Billed?</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Unit {r.house?.houseNumber}</td>
                  <td style={{ padding: '0.5rem' }}>{r.utility?.name}</td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
                    {Number(r.previousReading)} $\rightarrow$ {Number(r.currentReading)}
                  </td>
                  <td style={{ padding: '0.5rem', fontWeight: '600' }}>
                    {Number(r.unitsUsed)} {r.utility?.unitName}
                  </td>
                  <td style={{ padding: '0.5rem', color: '#0284c7', fontWeight: 'bold' }}>KSh {Number(r.totalCharge).toLocaleString()}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: r.isBilled ? '#dcfce7' : '#fef9c3', color: r.isBilled ? '#166534' : '#854d0e' }}>
                      {r.isBilled ? 'BILLED' : 'UNBILLED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
