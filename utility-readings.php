<?php
/**
 * ============================================================
 * PAGE: Utility Readings
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Utility Meter Readings'; require __DIR__.'/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Utility Meter Readings</h1><p>Record water and electricity usage for individual units.</p></div><section class="section"><div class="mn-stat-grid"><div class="mn-stat"><div class="label">Water</div><div class="value">8 m³</div><div class="sub">Latest sample usage</div></div><div class="mn-stat"><div class="label">Electricity</div><div class="value">65 kWh</div><div class="sub">Latest sample usage</div></div><div class="mn-stat"><div class="label">Unbilled</div><div class="value">KSh 2,830</div><div class="sub">Ready for invoicing</div></div></div><div class="mn-card"><div class="mn-card-head"><strong>Meter Reading Register</strong><a class="btn btn-primary btn-sm" href="utility-reading-create.php">+ Record Reading</a></div><div class="mn-card-body"><div class="table-responsive"><table class="mn-table"><thead><tr><th>Date</th><th>Property</th><th>House</th><th>Utility</th><th>Previous</th><th>Current</th><th>Usage</th><th>Rate</th><th>Charge</th><th>Action</th></tr></thead><tbody>
<tr><td>13 Aug 2026</td><td>Green View Apartments</td><td>A-01</td><td>Water</td><td>125</td><td>133</td><td>8 m³</td><td>KSh 110</td><td>KSh 880</td><td><a href="utility-reading-edit.php">Edit</a></td></tr>
<tr><td>13 Aug 2026</td><td>Green View Apartments</td><td>A-01</td><td>Electricity</td><td>540</td><td>605</td><td>65 kWh</td><td>KSh 30</td><td>KSh 1,950</td><td><a href="utility-reading-edit.php">Edit</a></td></tr>
</tbody></table></div></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
