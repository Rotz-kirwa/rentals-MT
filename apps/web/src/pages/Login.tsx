import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
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
      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #818cf8 100%)',
      fontFamily: "'Nunito', 'Inter', system-ui, -apple-system, sans-serif",
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      <style>{`
        .mn-light-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #1e293b;
          font-size: 14px;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .mn-light-input:focus {
          outline: none !important;
          background: #ffffff !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
        }
        .mn-pill-btn {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          border-radius: 50px;
          color: #ffffff;
          font-weight: 700;
          letter-spacing: 0.3px;
          border: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }
        .mn-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -4px rgba(79, 70, 229, 0.5);
          opacity: 0.96;
        }
        .mn-demo-pill {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          border-radius: 30px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mn-demo-pill:hover {
          background: #6366f1;
          color: #ffffff;
          border-color: #6366f1;
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .mn-split-visual {
            display: none !important;
          }
          .mn-card-container {
            max-width: 480px !important;
          }
        }
      `}</style>

      {/* Main Floating Split Card */}
      <div className="mn-card-container" style={{
        width: '100%',
        maxWidth: '1040px',
        minHeight: '620px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)',
        display: 'flex',
        overflow: 'hidden'
      }}>
        
        {/* LEFT COLUMN: Futuristic Residential Visual Feature */}
        <div className="mn-split-visual" style={{
          flex: '1.1',
          position: 'relative',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0f172a'
        }}>
          <img
            src="/assets/img/futuristic_residential_complex.png"
            alt="Futuristic Luxury Residential Complex"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.92
            }}
          />

          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.75) 100%)'
          }} />

          {/* Top Brand Tag */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.35)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.3px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              My Nyumba
            </span>
          </div>

          {/* Bottom Floating Stats & Motto */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '18px',
              padding: '22px 24px',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#a7f3d0' }}>
                  Smart Residential Operating System
                </span>
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '800', lineHeight: '1.3' }}>
                Next-Generation Property Operations
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: '1.5' }}>
                Automated billing, real-time occupancy analytics, and resident management for luxury communities.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Light-Theme Form */}
        <div style={{
          flex: '1',
          padding: '48px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          <div>
            {/* Top Auth Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#4f46e5' }}>My Nyumba Platform</span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Need help? <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Contact Support</a>
              </div>
            </div>

            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Login to your account to manage properties
              </p>
            </div>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '13px',
                color: '#dc2626',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Username / Email
                </label>
                <input
                  type="email"
                  className="mn-light-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="mn-light-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: '46px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#64748b' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#6366f1', width: '16px', height: '16px', borderRadius: '4px' }} />
                  Remember me
                </label>
                <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mn-pill-btn"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '8px'
                }}
              >
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </form>

            {/* Quick Demo Credentials */}
            <div style={{ marginTop: '28px', paddingTop: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '700' }}>
                Quick Demo Access
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleDemoAccount('SUPER_ADMIN')}
                  className="mn-demo-pill"
                >
                  Super Admin
                </button>
                <button
                  onClick={() => handleDemoAccount('PROPERTY_MANAGER')}
                  className="mn-demo-pill"
                >
                  Property Manager
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
            Powered by <span style={{ color: '#64748b', fontWeight: '600' }}>Ifix Network Ltd</span>
          </div>
        </div>

      </div>
    </div>
  );
}
