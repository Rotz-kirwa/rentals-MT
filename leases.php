<?php
/**
 * ============================================================
 * PAGE: Leases
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Leases'; require __DIR__ . '/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Lease Register</h1></div><section class="section"><div class="mn-card"><div class="mn-card-body"><div class="table-responsive"><table class="mn-table"><tbody><tr><td>LS-2026-0012</td><td>Wanjiku Kamau</td><td>B12</td><td>01 Aug 2026 – 31 Jul 2027</td><td>Active</td></tr><tr><td>LS-2025-0031</td><td>Amina Hassan</td><td>D02</td><td>01 Sep 2025 – 31 Aug 2026</td><td>Expiring</td></tr></tbody></table></div></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?><link rel="stylesheet" href="assets/css/my-nyumba-system.css"></body></html>