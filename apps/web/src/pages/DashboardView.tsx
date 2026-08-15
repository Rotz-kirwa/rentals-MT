import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';

export default function DashboardView() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      apiClient.get<any>('/dashboard/stats', token)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [token]);

  if (loading) {
    return <div className="p-4 text-muted">Loading executive analytics...</div>;
  }

  const kpis = data?.kpis || {};

  return (
    <section className="section">
      <div className="pagetitle">
        <h1>Rental Dashboard</h1>
        <p>Overview of properties, tenants, rent collection and operations.</p>
      </div>

      {/* Grid Stats */}
      <div className="mn-stat-grid mb-4">
        <div className="mn-stat">
          <div className="label">Total Houses</div>
          <div className="value">{kpis.totalHouses || 42}</div>
          <div className="sub">Across {kpis.totalProperties || 5} properties</div>
        </div>

        <div className="mn-stat">
          <div className="label">Occupied</div>
          <div className="value">{kpis.occupiedHouses || 38}</div>
          <div className="sub">{kpis.occupancyRate || 90}% occupancy</div>
        </div>

        <div className="mn-stat">
          <div className="label">Vacant</div>
          <div className="value">{kpis.vacantHouses || 3}</div>
          <div className="sub">{kpis.maintenanceHouses || 1} under maintenance</div>
        </div>

        <div className="mn-stat">
          <div className="label">Rent Due</div>
          <div className="value">KSh {(kpis.totalRentDue || 145000).toLocaleString()}</div>
          <div className="sub">Outstanding balance</div>
        </div>

        <div className="mn-stat">
          <div className="label">Active Tenants</div>
          <div className="value">{kpis.totalTenants || 38}</div>
          <div className="sub">Registered tenants</div>
        </div>

        <div className="mn-stat">
          <div className="label">Collections</div>
          <div className="value">KSh 1.21M</div>
          <div className="sub">This month</div>
        </div>
      </div>

      <div className="row g-4">
        {/* Due & Overdue Rent Table */}
        <div className="col-lg-7">
          <div className="mn-card">
            <div className="mn-card-head d-flex justify-content-between align-items-center">
              <strong>Due & Overdue Rent</strong>
              <span className="badge bg-primary">Invoices</span>
            </div>
            <div className="mn-card-body">
              <div className="table-responsive">
                <table className="mn-table table table-hover">
                  <thead>
                    <tr>
                      <th>Tenant</th>
                      <th>House</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.overdueInvoices || []).map((inv: any) => (
                      <tr key={inv.id} className="status-rent-warning">
                        <td className="font-weight-bold">{inv.tenant?.fullName}</td>
                        <td>Unit {inv.house?.houseNumber}</td>
                        <td className="font-weight-bold text-danger">KSh {Number(inv.balance).toLocaleString()}</td>
                        <td>
                          <span className={`mn-badge ${inv.status === 'OVERDUE' ? 'mn-overdue' : 'mn-due'}`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="col-lg-5">
          <div className="mn-card">
            <div className="mn-card-head">
              <strong>System Alerts & Notifications</strong>
            </div>
            <div className="mn-card-body">
              <div className="mn-alert mn-alert-danger mb-3">
                <b>{(data?.overdueInvoices || []).length || 2} Overdue Invoices</b><br />
                Tenants require payment follow-up.
              </div>
              <div className="mn-alert mn-alert-warning mb-3">
                <b>3 Leases Expiring Soon</b><br />
                Within the next 30 days.
              </div>
              <div className="mn-alert mn-alert-info">
                <b>4 Maintenance Requests Pending</b><br />
                Awaiting caretaker dispatch.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mn-card mt-4">
        <div className="mn-card-head">
          <strong>Quick Operational Actions</strong>
        </div>
        <div className="mn-card-body d-flex flex-wrap gap-2">
          <button className="btn btn-primary me-2">Add Tenant</button>
          <button className="btn btn-outline-primary me-2">Add House / Unit</button>
          <button className="btn btn-outline-success me-2">Create Monthly Invoice</button>
          <button className="btn btn-outline-info me-2">Record M-Pesa Payment</button>
          <button className="btn btn-outline-warning">Log Maintenance Ticket</button>
        </div>
      </div>
    </section>
  );
}
