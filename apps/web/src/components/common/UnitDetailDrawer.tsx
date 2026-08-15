import React from 'react';

interface UnitDetailDrawerProps {
  house: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UnitDetailDrawer: React.FC<UnitDetailDrawerProps> = ({ house, isOpen, onClose }) => {
  if (!isOpen || !house) return null;

  const activeLease = house.leases && house.leases.length > 0 ? house.leases[0] : null;
  const activeTenant = activeLease ? activeLease.tenant : null;
  const recentReading = house.utilityReadings && house.utilityReadings.length > 0 ? house.utilityReadings[0] : null;
  const openTickets = house.maintenanceTickets || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(2px)',
        zIndex: 9990,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 25px rgba(0,0,0,0.15)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              {house.property?.name ?? 'Property Unit'}
            </div>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.25rem' }}>House Unit {house.houseNumber}</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          {/* Status Badge & Base Metrics */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Unit Type</div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>{house.houseType}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Monthly Rent</div>
              <div style={{ fontWeight: 700, color: '#0284c7' }}>KES {Number(house.defaultRent).toLocaleString()}</div>
            </div>
            <div>
              <span
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: house.status === 'OCCUPIED' ? '#dcfce7' : house.status === 'VACANT' ? '#fee2e2' : '#fef3c7',
                  color: house.status === 'OCCUPIED' ? '#166534' : house.status === 'VACANT' ? '#991b1b' : '#92400e',
                }}
              >
                {house.status}
              </span>
            </div>
          </div>

          {/* Resident Details */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h6 style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Current Resident Profile
            </h6>
            {activeTenant ? (
              <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {activeTenant.fullName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeTenant.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Phone: {activeTenant.phoneNumber}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Lease End:</span>{' '}
                    <strong>{new Date(activeLease.endDate).toLocaleDateString()}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Rent Due Day:</span>{' '}
                    <strong>{activeLease.rentDueDay ?? 5}th of month</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                No active tenant assigned to this unit.
              </div>
            )}
          </div>

          {/* Utility Reading Snapshot */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h6 style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Recent Meter Readings
            </h6>
            {recentReading ? (
              <div style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>Water Meter ({recentReading.readingDate ? new Date(recentReading.readingDate).toLocaleDateString() : 'Latest'})</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Prev: {recentReading.previousReading} m³ | Curr: {recentReading.currentReading} m³
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0284c7' }}>
                    {recentReading.unitsUsed} m³
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Used</div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                No recent meter readings logged.
              </div>
            )}
          </div>

          {/* Open Maintenance Tickets */}
          <div>
            <h6 style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Maintenance & Work Orders ({openTickets.length})
            </h6>
            {openTickets.length > 0 ? (
              openTickets.map((t: any) => (
                <div key={t.id} style={{ padding: '0.75rem 1rem', border: '1px solid #fee2e2', backgroundColor: '#fff5f5', borderRadius: '8px', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#991b1b' }}>{t.title}</span>
                    <span className="badge bg-danger" style={{ fontSize: '0.65rem' }}>{t.priority}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>{t.description}</div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                No active work orders for this unit.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline-primary btn-sm flex-fill" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary btn-sm flex-fill" onClick={onClose}>
            Quick Edit Unit
          </button>
        </div>
      </div>
    </div>
  );
};
