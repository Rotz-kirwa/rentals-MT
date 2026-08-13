<?php
/**
 * ============================================================
 * PAGE: Tenants
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

$pageTitle = 'Tenants';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle">
  <h1>Tenants</h1>
  <p>Manage tenant profiles, rental assignments, leases, balances and payment status.</p>
</div>

<section class="section">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <span class="mn-badge mn-occupied">97 Active</span>
      <span class="mn-badge mn-due">8 Pending</span>
      <span class="mn-badge mn-overdue">15 With Arrears</span>
    </div>
    <a href="tenant-create.php" class="btn btn-primary">
      <i class="bi bi-person-plus"></i> Add Tenant
    </a>
  </div>

  <div class="mn-card">
    <div class="mn-card-head">
      <strong>Tenant Register</strong>
      <div class="d-flex gap-2">
        <input class="form-control form-control-sm" style="max-width:220px" placeholder="Search tenant...">
        <button class="btn btn-outline-secondary btn-sm">Filter</button>
      </div>
    </div>

    <div class="mn-card-body">
      <div class="table-responsive">
        <table class="mn-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Phone / Email</th>
              <th>Property</th>
              <th>House</th>
              <th>Rent</th>
              <th>Balance</th>
              <th>Lease</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="status-overdue">
              <td><strong>Wanjiku Kamau</strong><br><small>ID: 28745123</small></td>
              <td>0712 345 678<br><small>wanjiku@example.com</small></td>
              <td>My Nyumba Apartments</td>
              <td>B12</td>
              <td>KSh 18,000</td>
              <td><strong>KSh 18,300</strong></td>
              <td>Aug 2026 – Jul 2027</td>
              <td><span class="mn-badge mn-overdue">Overdue</span></td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="tenant-view.php?id=1"><i class="bi bi-eye"></i> View</a></li>
                    <li><a class="dropdown-item" href="tenant-edit.php?id=1"><i class="bi bi-pencil"></i> Edit</a></li>
                    <li><a class="dropdown-item" href="tenant-invoices.php?id=1"><i class="bi bi-receipt"></i> Invoices</a></li>
                    <li><a class="dropdown-item" href="tenant-payments.php?id=1"><i class="bi bi-cash"></i> Payments</a></li>
                  </ul>
                </div>
              </td>
            </tr>

            <tr class="status-paid">
              <td><strong>Peter Mwangi</strong><br><small>ID: 31265478</small></td>
              <td>0713 456 789<br><small>peter@example.com</small></td>
              <td>Ngong View</td>
              <td>A04</td>
              <td>KSh 15,000</td>
              <td><strong>KSh 0</strong></td>
              <td>Jan 2026 – Dec 2026</td>
              <td><span class="mn-badge mn-paid">Paid</span></td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="tenant-view.php?id=2"><i class="bi bi-eye"></i> View</a></li>
                    <li><a class="dropdown-item" href="tenant-edit.php?id=2"><i class="bi bi-pencil"></i> Edit</a></li>
                    <li><a class="dropdown-item" href="tenant-invoices.php?id=2"><i class="bi bi-receipt"></i> Invoices</a></li>
                    <li><a class="dropdown-item" href="tenant-payments.php?id=2"><i class="bi bi-cash"></i> Payments</a></li>
                  </ul>
                </div>
              </td>
            </tr>

            <tr class="status-renewal">
              <td><strong>Amina Hassan</strong><br><small>ID: 24581369</small></td>
              <td>0722 333 444<br><small>amina@example.com</small></td>
              <td>Rongai Heights</td>
              <td>D02</td>
              <td>KSh 14,000</td>
              <td><strong>KSh 14,000</strong></td>
              <td>Sep 2025 – Aug 2026</td>
              <td><span class="mn-badge mn-due">Renewal</span></td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="tenant-view.php?id=3"><i class="bi bi-eye"></i> View</a></li>
                    <li><a class="dropdown-item" href="tenant-edit.php?id=3"><i class="bi bi-pencil"></i> Edit</a></li>
                    <li><a class="dropdown-item" href="tenant-invoices.php?id=3"><i class="bi bi-receipt"></i> Invoices</a></li>
                    <li><a class="dropdown-item" href="tenant-payments.php?id=3"><i class="bi bi-cash"></i> Payments</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
