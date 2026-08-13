<?php
/**
 * ============================================================
 * PAGE: Reports
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Reports'; require __DIR__ . '/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Rental Reports</h1><p>Manage rental reports for the My Nyumba portfolio.</p></div><section class="section"><div class="mn-card"><div class="mn-card-head"><strong>Rental Reports</strong><button class="btn btn-primary btn-sm">Add New</button></div><div class="mn-card-body"><div class="table-responsive"><table class="mn-table"><tr><th>Name / Item</th><th>Property</th><th>Status</th><th>Amount</th><th>Action</th></tr><tr class="status-active"><td>Wanjiku Kamau</td><td>My Nyumba Apartments</td><td><span class="mn-badge mn-due">Active</span></td><td>KSh 18,000</td><td><a href="#">View</a></td></tr><tr class="status-paid"><td>Peter Mwangi</td><td>Ngong View</td><td><span class="mn-badge mn-paid">Completed</span></td><td>KSh 15,000</td><td><a href="#">View</a></td></tr></table></div></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?><link rel="stylesheet" href="assets/css/my-nyumba-system.css"></body></html>