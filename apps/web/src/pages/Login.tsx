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
        // Default admin fallback
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
    <main style={{ backgroundColor: '#f6f9ff', minHeight: '100vh' }}>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3 shadow-sm border-0" style={{ borderRadius: '8px' }}>
                  <div className="card-header bg-white d-flex justify-content-center py-4 pt-4 pb-3 border-0">
                    <div className="logo d-flex align-items-center w-auto">
                      <img src="/assets/img/logo.jpg" alt="My Nyumba" style={{ maxHeight: '40px', marginRight: '10px' }} />
                      <span className="h4 mb-0 font-weight-bold" style={{ color: '#012970', fontWeight: 700 }}>My Nyumba</span>
                    </div>
                  </div>
                  <div className="card-body px-4 pb-4">
                    {error && (
                      <div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.875rem' }}>
                        {error}
                      </div>
                    )}
                    <div className="pb-2 pt-2">
                      <h5 className="card-title text-center pb-0 fs-4" style={{ color: '#012970', fontWeight: 600 }}>Login to Your Account</h5>
                      <p className="text-center small text-muted">Enter your email & password to login</p>
                    </div>

                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label font-weight-bold" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#444444' }}>Email</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light text-secondary">@</span>
                          <input
                            type="email"
                            className="form-control"
                            id="yourEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label font-weight-bold" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#444444' }}>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="yourPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                          <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '0.85rem' }}>
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading} style={{ backgroundColor: '#4154f1', borderColor: '#4154f1', fontWeight: 600 }}>
                          {loading ? 'Authenticating...' : 'Login'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-4 pt-3 border-top text-center">
                      <p className="small text-muted mb-2">Quick Demo Credentials:</p>
                      <div className="d-flex gap-2 justify-content-center">
                        <button onClick={() => handleDemoAccount('SUPER_ADMIN')} className="btn btn-outline-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                          Super Admin
                        </button>
                        <button onClick={() => handleDemoAccount('PROPERTY_MANAGER')} className="btn btn-outline-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                          Property Manager
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="credits text-center text-muted small">
                  Designed by <a href="#" style={{ color: '#4154f1' }}>ifix Network ltd</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
