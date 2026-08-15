import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PropertiesView() {
  const { token, user } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showPropModal, setShowPropModal] = useState(false);
  const [showHouseModal, setShowHouseModal] = useState(false);

  // Form states
  const [propName, setPropName] = useState('');
  const [propType, setPropType] = useState('Apartment');
  const [propLocation, setPropLocation] = useState('');

  const [houseNum, setHouseNum] = useState('');
  const [houseType, setHouseType] = useState('1BR');
  const [houseRent, setHouseRent] = useState(15000);
  const [houseDeposit, setHouseDeposit] = useState(15000);

  const isManager = user?.role === 'SUPER_ADMIN' || user?.role === 'PROPERTY_MANAGER';

  const fetchProperties = () => {
    fetch('/api/v1/properties', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties || []);
        if (data.properties?.length > 0 && !selectedProperty) {
          setSelectedProperty(data.properties[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchHouses = (propId: string) => {
    fetch(`/api/v1/houses?propertyId=${propId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHouses(data.houses || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchProperties();
  }, [token]);

  useEffect(() => {
    if (selectedProperty) {
      fetchHouses(selectedProperty.id);
    }
  }, [selectedProperty, token]);

  const handleCreateProperty = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/v1/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: propName, propertyType: propType, location: propLocation }),
    });
    if (res.ok) {
      setShowPropModal(false);
      setPropName('');
      setPropLocation('');
      fetchProperties();
    }
  };

  const handleCreateHouse = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;
    const res = await fetch('/api/v1/houses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        propertyId: selectedProperty.id,
        houseNumber: houseNum,
        houseType,
        defaultRent: Number(houseRent),
        defaultDeposit: Number(houseDeposit),
      }),
    });
    if (res.ok) {
      setShowHouseModal(false);
      setHouseNum('');
      fetchHouses(selectedProperty.id);
    }
  };

  if (loading) return <div className="p-4 text-muted">Loading properties portfolio...</div>;

  return (
    <section className="section">
      <div className="pagetitle d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Property Management</h1>
          <p className="m-0 text-muted">Manage properties, buildings, units and rent rates.</p>
        </div>
        {isManager && (
          <button className="btn btn-primary" onClick={() => setShowPropModal(true)}>
            <i className="bi bi-plus-lg me-1"></i> Add Property
          </button>
        )}
      </div>

      <div className="row g-4">
        {/* Properties Selector List */}
        <div className="col-lg-4 col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="card-title m-0 fs-6 font-weight-bold" style={{ color: '#012970' }}>Properties List</h5>
            </div>
            <div className="card-body p-2">
              {properties.length === 0 ? (
                <div className="p-3 text-muted text-center small">No properties found.</div>
              ) : (
                <div className="list-group list-group-flush">
                  {properties.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProperty(p)}
                      className={`list-group-item list-group-item-action border-0 rounded my-1 p-3 ${
                        selectedProperty?.id === p.id ? 'active bg-primary text-white' : ''
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold">{p.name}</h6>
                        <span className={`badge ${selectedProperty?.id === p.id ? 'bg-light text-primary' : 'bg-secondary'}`}>
                          {p._count?.houses || 0} Units
                        </span>
                      </div>
                      <small className={selectedProperty?.id === p.id ? 'text-white-50' : 'text-muted'}>
                        📍 {p.location} • {p.propertyType}
                      </small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Houses Grid View */}
        <div className="col-lg-8 col-md-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title m-0 fs-5 font-weight-bold" style={{ color: '#012970' }}>
                  {selectedProperty ? selectedProperty.name : 'Select a Property'}
                </h5>
                {selectedProperty && (
                  <small className="text-muted">Location: {selectedProperty.location} ({selectedProperty.propertyType})</small>
                )}
              </div>
              {selectedProperty && isManager && (
                <button className="btn btn-success btn-sm" onClick={() => setShowHouseModal(true)}>
                  <i className="bi bi-plus-lg me-1"></i> Add Unit
                </button>
              )}
            </div>

            <div className="card-body p-4">
              {houses.length === 0 ? (
                <div className="p-5 text-center text-muted">No units or houses added to this property yet.</div>
              ) : (
                <div className="row g-3">
                  {houses.map((h) => (
                    <div key={h.id} className="col-lg-4 col-md-6 col-sm-12">
                      <div className="card h-100 border p-3 shadow-none bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="font-weight-bold text-dark h6 m-0">Unit {h.houseNumber}</span>
                          <span className={`badge ${
                            h.status === 'OCCUPIED' ? 'bg-success' : h.status === 'VACANT' ? 'bg-warning text-dark' : 'bg-danger'
                          }`}>
                            {h.status}
                          </span>
                        </div>
                        <div className="small text-muted mb-1">Type: {h.houseType}</div>
                        <div className="font-weight-bold text-primary mb-2">
                          KSh {Number(h.defaultRent).toLocaleString()} <span className="small text-muted font-weight-normal">/mo</span>
                        </div>
                        {h.leases?.[0]?.tenant && (
                          <div className="small text-success border-top pt-2 mt-1">
                            👤 {h.leases[0].tenant.fullName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Modal */}
      {showPropModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Add New Property</h5>
                <button className="btn-close" onClick={() => setShowPropModal(false)}></button>
              </div>
              <form onSubmit={handleCreateProperty}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Property Name</label>
                    <input type="text" className="form-control" value={propName} onChange={(e) => setPropName(e.target.value)} required placeholder="e.g. Sunrise Heights" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Property Type</label>
                    <select className="form-select" value={propType} onChange={(e) => setPropType(e.target.value)}>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Single Family">Single Family</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" value={propLocation} onChange={(e) => setPropLocation(e.target.value)} required placeholder="e.g. Kilimani, Nairobi" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPropModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Property</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* House Modal */}
      {showHouseModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Add Unit to {selectedProperty?.name}</h5>
                <button className="btn-close" onClick={() => setShowHouseModal(false)}></button>
              </div>
              <form onSubmit={handleCreateHouse}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Unit Number</label>
                    <input type="text" className="form-control" value={houseNum} onChange={(e) => setHouseNum(e.target.value)} required placeholder="e.g. A-01" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">House Type</label>
                    <input type="text" className="form-control" value={houseType} onChange={(e) => setHouseType(e.target.value)} required placeholder="e.g. 1BR, Bedsitter, 2BR" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Default Rent (KSh)</label>
                    <input type="number" className="form-control" value={houseRent} onChange={(e) => setHouseRent(Number(e.target.value))} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Security Deposit (KSh)</label>
                    <input type="number" className="form-control" value={houseDeposit} onChange={(e) => setHouseDeposit(Number(e.target.value))} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowHouseModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save Unit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
