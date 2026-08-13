<?php
/**
 * ============================================================
 * PAGE: Property Utilities
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Property Utility Rates'; require __DIR__.'/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Property Utility Rates</h1><p>Override utility prices for a specific property.</p></div><section class="section"><div class="mn-card"><div class="mn-card-head"><strong>Green View Apartments</strong><a class="btn btn-primary btn-sm" href="property-utility-edit.php">Assign / Edit Utility</a></div><div class="mn-card-body"><div class="table-responsive"><table class="mn-table"><thead><tr><th>Utility</th><th>Billing</th><th>Default Rate</th><th>Property Rate</th><th>Status</th><th>Action</th></tr></thead><tbody>
<tr><td><strong>Water</strong></td><td>Metered</td><td>KSh 100 / m³</td><td><strong>KSh 110 / m³</strong></td><td><span class="mn-badge mn-occupied">Active</span></td><td><a href="property-utility-edit.php">Edit</a></td></tr>
<tr><td><strong>Electricity</strong></td><td>Metered</td><td>KSh 30 / kWh</td><td><strong>KSh 30 / kWh</strong></td><td><span class="mn-badge mn-occupied">Active</span></td><td><a href="property-utility-edit.php">Edit</a></td></tr>
<tr><td><strong>Garbage</strong></td><td>Fixed</td><td>KSh 500 / month</td><td><strong>KSh 600 / month</strong></td><td><span class="mn-badge mn-occupied">Active</span></td><td><a href="property-utility-edit.php">Edit</a></td></tr>
</tbody></table></div></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
