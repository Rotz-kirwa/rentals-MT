import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { UnitDetailDrawer } from '../components/common/UnitDetailDrawer';

export default function VisualOccupancyView() {
  const [houses, setHouses] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/properties/houses'),
      api.get('/properties'),
    ])
      .then(([housesRes, propsRes]) => {
        setHouses(housesRes.data.data || []);
        setProperties(propsRes.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching visual occupancy units:', err);
        setLoading(false);
      });
  }, []);

  const filteredHouses = houses.filter((h) => {
    if (selectedPropertyId && h.propertyId !== selectedPropertyId) return false;
    if (selectedStatus && h.status !== selectedStatus) return false;
    return true;
  });

  const handleHouseClick = (house: any) => {
    setSelectedHouse(house);
    setIsDrawerOpen(true);
  };

  const occupiedCount = houses.filter((h) => h.status === 'OCCUPIED').length;
  const vacantCount = houses.filter((h) => h.status === 'VACANT').length;
  const maintenanceCount = houses.filter((h) => h.status === 'MAINTENANCE').length;
  const occupancyRate = houses.length > 0 ? Math.round((occupiedCount / houses.length) * 100) : 0;

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Loading Visual Unit Occupancy Grid...</span>
      </div>
    );
  }

  // Group houses by property
  const housesByProperty: { [key: string]: { propertyName: string; houses: any[] } } = {};
  filteredHouses.forEach((house) => {
    const propName = house.property?.name || 'Unassigned Property';
    if (!housesByProperty[propName]) {
      housesByProperty[propName] = { propertyName: propName, houses: [] };
    }
    housesByProperty[propName].houses.push(house);
  });

  return (
    <section className="section">
      <UnitDetailDrawer
        house={selectedHouse}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontWeight: 800, color: '#0f172a', margin: 0, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Visual Unit Occupancy Grid
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Interactive floor plan map & occupancy status across all portfolio units. Click any unit box for full profile.
          </p>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
            <i className="bi bi-pie-chart-fill"></i>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Occupancy Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{occupancyRate}%</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
            <i className="bi bi-house-check-fill"></i>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Occupied Units</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>{occupiedCount}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
            <i className="bi bi-house-dash-fill"></i>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Vacant Units</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>{vacantCount}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
            <i className="bi bi-tools"></i>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>In Maintenance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706' }}>{maintenanceCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', margin: 0 }}>Property Filter:</label>
          <select
            className="form-select form-select-sm"
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            style={{ width: '220px' }}
          >
            <option value="">All Properties ({properties.length})</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', margin: 0 }}>Unit Status:</label>
          <select
            className="form-select form-select-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ width: '160px' }}
          >
            <option value="">All Statuses</option>
            <option value="OCCUPIED">Occupied Only</option>
            <option value="VACANT">Vacant Only</option>
            <option value="MAINTENANCE">Maintenance Only</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            <span>Occupied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ef4444', display: 'inline-block' }}></span>
            <span>Vacant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f59e0b', display: 'inline-block' }}></span>
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      {/* Visual Unit Grid Display by Property */}
      {Object.values(housesByProperty).map((group) => (
        <div key={group.propertyName} style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <h5 style={{ fontWeight: 700, color: '#0f172a', margin: 0 }}>{group.propertyName}</h5>
            <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>{group.houses.length} Units</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.85rem' }}>
            {group.houses.map((house) => {
              const isOccupied = house.status === 'OCCUPIED';
              const isVacant = house.status === 'VACANT';
              const tenantName = house.leases && house.leases.length > 0 ? house.leases[0].tenant?.fullName : null;

              return (
                <div
                  key={house.id}
                  onClick={() => handleHouseClick(house)}
                  style={{
                    backgroundColor: isOccupied ? '#f0fdf4' : isVacant ? '#fef2f2' : '#fffbeb',
                    border: `2px solid ${isOccupied ? '#86efac' : isVacant ? '#fca5a5' : '#fde68a'}`,
                    borderRadius: '8px',
                    padding: '0.85rem 0.65rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="visual-unit-box"
                >
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: isOccupied ? '#15803d' : isVacant ? '#b91c1c' : '#b45309' }}>
                    {house.houseNumber}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    {house.houseType}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tenantName || (isVacant ? 'AVAILABLE' : 'MAINTENANCE')}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 600, marginTop: '0.2rem' }}>
                    KES {Number(house.defaultRent).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
