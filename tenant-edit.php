<?php
/**
 * ============================================================
 * PAGE: Tenant Edit
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php';
// ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Edit Tenant';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle">
  <h1>Edit Tenant</h1>
  <p>Update tenant information, rental assignment, charges and lease details.</p>
</div>

<section class="section">
  <form method="post" class="row g-4">

    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="mn-form-section">Personal Information</div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Full Name</label>
              <input class="form-control" name="full_name" value="Wanjiku Kamau" required>
            </div>
            <div class="col-md-3">
              <label class="form-label">National ID</label>
              <input class="form-control" name="national_id" value="28745123">
            </div>
            <div class="col-md-3">
              <label class="form-label">Phone</label>
              <input class="form-control" name="phone" value="0712 345 678">
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" name="email" value="wanjiku@example.com">
            </div>
            <div class="col-md-6">
              <label class="form-label">Emergency Contact</label>
              <input class="form-control" name="emergency_contact" value="Mary Kamau - 0722 111 222">
            </div>
          </div>

          <div class="mn-form-section mt-4">Rental Assignment</div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Property</label>
              <select class="form-select">
                <option selected>My Nyumba Apartments</option>
                <option>Ngong View</option>
                <option>Rongai Heights</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">House / Unit</label>
              <select class="form-select">
                <option selected>B12</option>
                <option>A04</option>
                <option>D02</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Tenant Status</label>
              <select class="form-select">
                <option selected>Active</option>
                <option>Pending</option>
                <option>Moved Out</option>
                <option>Blacklisted</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Move-in Date</label>
              <input class="form-control" type="date" value="2026-08-01">
            </div>
            <div class="col-md-4">
              <label class="form-label">Rent Due Day</label>
              <select class="form-select">
                <option selected>1st</option>
                <option>5th</option>
                <option>10th</option>
                <option>15th</option>
              </select>
            </div>
          </div>

          <div class="mn-form-section mt-4">Charges & Deposit</div>
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label">Monthly Rent (KSh)</label>
              <input class="form-control" type="number" value="18000">
            </div>
            <div class="col-md-3">
              <label class="form-label">Deposit (KSh)</label>
              <input class="form-control" type="number" value="18000">
            </div>
            <div class="col-md-3">
              <label class="form-label">Water</label>
              <input class="form-control" value="Metered">
            </div>
            <div class="col-md-3">
              <label class="form-label">Garbage Fee (KSh)</label>
              <input class="form-control" type="number" value="300">
            </div>
          </div>

          <div class="mn-form-section mt-4">Lease</div>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Lease Start</label>
              <input class="form-control" type="date" value="2026-08-01">
            </div>
            <div class="col-md-4">
              <label class="form-label">Lease End</label>
              <input class="form-control" type="date" value="2027-07-31">
            </div>
            <div class="col-md-4">
              <label class="form-label">Lease Status</label>
              <select class="form-select">
                <option selected>Active</option>
                <option>Expiring</option>
                <option>Terminated</option>
              </select>
            </div>
          </div>

          <div class="mn-form-section mt-4">Documents</div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Replace / Add Documents</label>
              <input class="form-control" type="file" multiple>
            </div>
            <div class="col-md-6">
              <label class="form-label">Notes</label>
              <textarea class="form-control" rows="3">Tenant has an active lease and monthly metered water.</textarea>
            </div>
          </div>

          <div class="mt-4">
            <button class="btn btn-primary"><i class="bi bi-check-lg"></i> Save Changes</button>
            <a href="tenants.php" class="btn btn-secondary">Cancel</a>
            <a href="tenant-view.php?id=1" class="btn btn-outline-info">View Tenant</a>
          </div>
        </div>
      </div>
    </div>

  </form>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
