import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function InvoicesPaymentsView() {
  const { token, user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Payment form
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<'MPESA' | 'CASH' | 'BANK_TRANSFER'>('MPESA');
  const [refNum, setRefNum] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [stkMessage, setStkMessage] = useState('');

  const isManager = user?.role === 'SUPER_ADMIN' || user?.role === 'PROPERTY_MANAGER' || user?.role === 'FINANCE_OFFICER';

  const fetchData = () => {
    Promise.all([
      fetch('/api/v1/invoices', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/v1/payments', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([iData, pData]) => {
      setInvoices(iData.invoices || []);
      setPayments(pData.payments || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleGenerateMonthlyInvoices = async () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    if (!confirm(`Run automated monthly billing engine for ${month}/${year}?`)) return;

    const res = await fetch('/api/v1/invoices/generate-monthly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ month, year }),
    });

    const data = await res.json();
    alert(data.message || 'Billing engine executed.');
    fetchData();
  };

  const handleOpenPayModal = (inv: any) => {
    setSelectedInvoice(inv);
    setPayAmount(Number(inv.balance));
    setPhoneNum(inv.tenant?.phoneNumber || '0712345678');
    setStkMessage('');
    setShowPayModal(true);
  };

  const handleRecordPayment = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    const res = await fetch('/api/v1/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        invoiceId: selectedInvoice.id,
        amountPaid: Number(payAmount),
        method: payMethod,
        transactionReference: refNum,
      }),
    });

    if (res.ok) {
      setShowPayModal(false);
      fetchData();
    }
  };

  const handleMpesaStkPush = async () => {
    if (!selectedInvoice) return;
    setStkMessage('Dispatching M-Pesa STK prompt...');

    const res = await fetch('/api/v1/payments/mpesa/stk-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        invoiceId: selectedInvoice.id,
        phoneNumber: phoneNum,
        amount: Number(payAmount),
      }),
    });

    const data = await res.json();
    setStkMessage(data.message);
  };

  if (loading) return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading financial records...</div>;

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>📄 Rent Invoices & Payment Ledger</h2>
        {isManager && (
          <button
            onClick={handleGenerateMonthlyInvoices}
            style={{ padding: '0.6rem 1.2rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ⚡ Run Monthly Billing Engine
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Invoices List */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Invoice Directory</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Invoice #</th>
                <th style={{ padding: '0.5rem' }}>Unit / Tenant</th>
                <th style={{ padding: '0.5rem' }}>Total</th>
                <th style={{ padding: '0.5rem' }}>Balance</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
                <th style={{ padding: '0.5rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{inv.invoiceNumber}</td>
                  <td style={{ padding: '0.5rem' }}>
                    Unit {inv.house?.houseNumber} ({inv.tenant?.fullName})
                  </td>
                  <td style={{ padding: '0.5rem' }}>KSh {Number(inv.totalAmount).toLocaleString()}</td>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold', color: Number(inv.balance) > 0 ? '#dc2626' : '#16a34a' }}>
                    KSh {Number(inv.balance).toLocaleString()}
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: inv.status === 'PAID' ? '#dcfce7' : inv.status === 'PARTIAL' ? '#fef9c3' : '#fee2e2', color: inv.status === 'PAID' ? '#166534' : inv.status === 'PARTIAL' ? '#854d0e' : '#991b1b' }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    {Number(inv.balance) > 0 && (
                      <button onClick={() => handleOpenPayModal(inv)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                        Pay Rent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payments Ledger & Receipts */}
        <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a' }}>Payment Receipts Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.5rem' }}>Receipt #</th>
                <th style={{ padding: '0.5rem' }}>Tenant</th>
                <th style={{ padding: '0.5rem' }}>Paid Amount</th>
                <th style={{ padding: '0.5rem' }}>Method</th>
                <th style={{ padding: '0.5rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#0284c7' }}>
                    {p.receipt?.receiptNumber || p.paymentNumber}
                  </td>
                  <td style={{ padding: '0.5rem' }}>{p.tenant?.fullName}</td>
                  <td style={{ padding: '0.5rem', color: '#16a34a', fontWeight: 'bold' }}>KSh {Number(p.amountPaid).toLocaleString()}</td>
                  <td style={{ padding: '0.5rem' }}>{p.method}</td>
                  <td style={{ padding: '0.5rem' }}>{new Date(p.paymentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Rent Modal */}
      {showPayModal && selectedInvoice && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Pay Invoice {selectedInvoice.invoiceNumber}</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Tenant: {selectedInvoice.tenant?.fullName} (Unit {selectedInvoice.house?.houseNumber})
            </p>

            <form onSubmit={handleRecordPayment}>
              <label style={{ display: 'block', fontSize: '0.875rem' }}>Amount to Pay (KSh):</label>
              <input type="number" value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />

              <label style={{ display: 'block', fontSize: '0.875rem' }}>Payment Method:</label>
              <select value={payMethod} onChange={(e: any) => setPayMethod(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
                <option value="MPESA">M-Pesa STK Push / Reference</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>

              {payMethod === 'MPESA' ? (
                <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '6px', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold' }}>M-Pesa Phone Number:</label>
                  <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }} />
                  <button type="button" onClick={handleMpesaStkPush} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                    📲 Trigger M-Pesa STK Push Prompt
                  </button>
                  {stkMessage && <p style={{ fontSize: '0.75rem', color: '#166534', margin: '0.5rem 0 0 0' }}>{stkMessage}</p>}
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem' }}>Transaction Reference / Cheque #:</label>
                  <input type="text" value={refNum} onChange={(e) => setRefNum(e.target.value)} placeholder="e.g. TXN-998822" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowPayModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0284c7', color: '#fff', border: 'none' }}>Record Manual Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
