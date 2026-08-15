import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.message || 'Invalid email or password.');
      }

      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccount = async (role: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `${role.toLowerCase()}@example.com`,
          password: 'password123',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
      } else {
        setEmail('admin@example.com');
        setPassword('admin123');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#f8fafc',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <style>{`
        .mn-input:focus {
          outline: none !important;
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25) !important;
        }
        .mn-btn-primary {
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          transition: all 0.2s ease;
        }
        .mn-btn-primary:hover {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.5);
        }
        .mn-demo-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94a3b8;
          transition: all 0.15s ease;
        }
        .mn-demo-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        padding: '36px 32px',
        boxSizing: 'border-box'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(37, 99, 235, 0.2))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: '16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
            My Nyumba
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Property Operations & Financial Operating Platform
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '13px',
            color: '#fca5a5',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Work Email
            </label>
            <input
              type="email"
              className="mn-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'all 0.2s'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              className="mn-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'all 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#94a3b8' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: '#0284c7', borderRadius: '4px' }} />
              Remember session
            </label>
            <a href="#" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            className="mn-btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '6px'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
          </button>
        </form>

        {/* Demo Fast Access */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
            Instant Demo Access
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => handleDemoAccount('SUPER_ADMIN')}
              className="mn-demo-btn"
              style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
            >
              Super Admin
            </button>
            <button
              onClick={() => handleDemoAccount('PROPERTY_MANAGER')}
              className="mn-demo-btn"
              style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
            >
              Property Manager
            </button>
          </div>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
          Protected by Enterprise Security &bull; Powered by <span style={{ color: '#64748b' }}>Ifix Network Ltd</span>
        </div>
      </div>
    </div>
  );
}
