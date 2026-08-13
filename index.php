<?php
/**
 * ============================================================
 * PAGE: Index
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Rental Dashboard'; require __DIR__ . '/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Rental Dashboard</h1><p>Overview of properties, tenants, rent collection and operations.</p></div><section class="section">
<div class="mn-stat-grid">
<div class="mn-stat"><div class="label">Total Houses</div><div class="value">124</div><div class="sub">Across 6 properties</div></div>
<div class="mn-stat"><div class="label">Occupied</div><div class="value">97</div><div class="sub">78.2% occupancy</div></div>
<div class="mn-stat"><div class="label">Vacant</div><div class="value">18</div><div class="sub">3 under maintenance</div></div>
<div class="mn-stat"><div class="label">Rent Due</div><div class="value">KSh 342,500</div><div class="sub">23 invoices outstanding</div></div>
<div class="mn-stat"><div class="label">Overdue</div><div class="value">KSh 126,800</div><div class="sub">15 tenants</div></div>
<div class="mn-stat"><div class="label">Collected This Month</div><div class="value">KSh 1.21M</div><div class="sub">82 paid invoices</div></div></div>
<div class="row g-4"><div class="col-lg-7"><div class="mn-card"><div class="mn-card-head"><strong>Due & Overdue Rent</strong><a href="invoices.php">Invoices</a></div><div class="mn-card-body"><div class="table-responsive"><table class="mn-table"><tr><th>Tenant</th><th>House</th><th>Amount</th><th>Status</th></tr><tr><td>Wanjiku Kamau</td><td>B12</td><td>KSh 18,300</td><td><span class="mn-badge mn-overdue">Overdue</span></td></tr><tr><td>Grace Wanjiku</td><td>C07</td><td>KSh 12,800</td><td><span class="mn-badge mn-due">Due</span></td></tr><tr><td>Kevin Otieno</td><td>A08</td><td>KSh 20,000</td><td><span class="mn-badge mn-overdue">Overdue</span></td></tr></table></div></div></div></div>
<div class="col-lg-5"><div class="mn-card"><div class="mn-card-head"><strong>Alerts</strong></div><div class="mn-card-body"><div class="mn-alert mn-alert-danger"><b>15 overdue</b><br>Tenants require follow-up.</div><div class="mn-alert mn-alert-warning"><b>7 leases expiring</b><br>Within 30 days.</div><div class="mn-alert mn-alert-info"><b>4 maintenance requests</b><br>Awaiting action.</div></div></div></div></div><div class="mn-card mt-4"><div class="mn-card-head"><strong>Quick Actions</strong></div><div class="mn-card-body"><a class="btn btn-primary me-2" href="tenant-create.php">Add Tenant</a><a class="btn btn-outline-primary me-2" href="house-create.php">Add House</a><a class="btn btn-outline-success me-2" href="invoice-create.php">Create Invoice</a><a class="btn btn-outline-info me-2" href="payment-create.php">Record Payment</a><a class="btn btn-outline-warning" href="maintenance-create.php">Add Maintenance</a></div></div><div class="mn-card mt-4"><div class="mn-card-head"><strong>Application & Move-in</strong></div><div class="mn-card-body"><a class="btn btn-primary me-2" href="applications.php">View Applications</a><a class="btn btn-outline-primary" href="application-create.php">Add Application</a></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?><link rel="stylesheet" href="assets/css/my-nyumba-system.css"></body></html>