import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MaintenanceExpensesView() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Ticket Form
  const [selectedHouseId, setSelectedHouseId] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  // Expense Form
  const [selectedPropId, setSelectedPropId] = useState('');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState(0);
  const [expCategory, setExpCategory] = useState('Repairs');

  const fetchData = () => {
    Promise.all([
      fetch('/api/v1/maintenance', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/expenses', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/houses', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/properties', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([tData, eData, hData, pData]) => {
      setTickets(tData.tickets || []);
      setExpenses(eData.expenses || []);
      setHouses(hData.houses || []);
      setProperties(pData.properties || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleCreateTicket = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ houseId: selectedHouseId, title: ticketTitle, description: ticketDesc, priority }),
    });

    if (res.ok) {
      setShowTicketModal(false);
      setTicketTitle('');
      setTicketDesc('');
      fetchData();
    }
  };

  const handleCreateExpense = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        propertyId: selectedPropId,
        title: expTitle,
        amount: Number(expAmount),
        category: expCategory,
        expenseDate: new Date().toISOString().split('T')[0],
      }),
    });

    if (res.ok) {
      setShowExpenseModal(false);
      setExpTitle('');
      setExpAmount(0);
      fetchData();
    }
  };

  const handleUpdateTicketStatus = async (id: string, status: string) => {
    await fetch(`/api/v1/maintenance/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  if (loading) return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading maintenance logs...</div>;

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>🔧 Maintenance & Operating Expenses</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setShowTicketModal(true)} style={{ padding: '0.6rem 1rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Create Repair Ticket
          </button>
          <button onClick={() => setShowExpenseModal(true)} style={{ padding: '0.6rem 1rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Log Operating Expense
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Tickets Board */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Maintenance Tickets</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tickets.map((t) => (
              <div key={t.id} style={{ padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{t.title} (Unit {t.house?.houseNumber})</span>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', backgroundColor: t.status === 'COMPLETED' ? '#dcfce7' : '#fee2e2', color: t.status === 'COMPLETED' ? '#166534' : '#991b1b', fontWeight: 'bold' }}>
                    {t.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#475569', margin: '0 0 0.5rem 0' }}>{t.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <span style={{ color: '#0284c7', fontWeight: 'bold' }}>Priority: {t.priority}</span>
                  <select value={t.status} onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)} style={{ padding: '0.2rem', fontSize: '0.75rem' }}>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Log */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Operating Expenses Ledger</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Property</th>
                <th style={{ padding: '0.5rem' }}>Expense</th>
                <th style={{ padding: '0.5rem' }}>Category</th>
                <th style={{ padding: '0.5rem' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{e.property?.name}</td>
                  <td style={{ padding: '0.5rem' }}>{e.title}</td>
                  <td style={{ padding: '0.5rem' }}>{e.category}</td>
                  <td style={{ padding: '0.5rem', color: '#dc2626', fontWeight: 'bold' }}>KSh {Number(e.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Report Maintenance Issue</h3>
            <form onSubmit={handleCreateTicket}>
              <select value={selectedHouseId} onChange={(e) => setSelectedHouseId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="">-- Choose Unit --</option>
                {houses.map((h) => <option key={h.id} value={h.id}>Unit {h.houseNumber} ({h.property?.name})</option>)}
              </select>
              <input type="text" placeholder="Issue Title (e.g. Leaking Pipe)" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="EMERGENCY">EMERGENCY</option>
              </select>
              <textarea placeholder="Description" value={ticketDesc} onChange={(e) => setTicketDesc(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowTicketModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0284c7', color: '#fff', border: 'none' }}>Submit Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Log Property Expense</h3>
            <form onSubmit={handleCreateExpense}>
              <select value={selectedPropId} onChange={(e) => setSelectedPropId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="">-- Choose Property --</option>
                {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <input type="text" placeholder="Expense Title (e.g. Plumbing Repair)" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="Repairs">Repairs & Maintenance</option>
                <option value="Utilities">Utilities & Bills</option>
                <option value="Management">Management Fees</option>
                <option value="Taxes">Taxes & Insurance</option>
              </select>
              <input type="number" placeholder="Amount (KSh)" value={expAmount} onChange={(e) => setExpAmount(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowExpenseModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: '#fff', border: 'none' }}>Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
