<?php
/**
 * ============================================================
 * PAGE: Invoices
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

$pageTitle = 'Invoices';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Invoices</h1>
    <p>Manage rent and property-service invoices.</p>
  </div>

  <section class="section dashboard">
    <div class="billing-summary">
      <div class="billing-card"><div class="label">Invoices This Month</div><div class="value">86</div></div>
      <div class="billing-card"><div class="label">Issued</div><div class="value">KSh 1,548,500</div></div>
      <div class="billing-card"><div class="label">Paid</div><div class="value">KSh 1,206,000</div></div>
      <div class="billing-card"><div class="label">Outstanding</div><div class="value">KSh 342,500</div></div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0">Recent Invoices</h5>
          <a href="invoice-create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Create Invoice</a>
        </div>
        <div class="table-responsive">
          <table class="billing-table">
            <thead><tr><th>Invoice</th><th>Tenant</th><th>House</th><th>Period</th><th>Amount</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              <tr class="status-overdue"><td>INV-2026-0086</td><td>Wanjiku Kamau</td><td>B12</td><td>August 2026</td><td>KSh 18,300</td><td>05 Aug 2026</td><td><span class="status-badge status-overdue">Overdue</span></td><td><a href="invoice-view.php?id=86">View</a></td></tr>
              <tr class="status-occupied"><td>INV-2026-0085</td><td>Peter Mwangi</td><td>A04</td><td>August 2026</td><td>KSh 15,500</td><td>05 Aug 2026</td><td><span class="status-badge status-paid">Paid</span></td><td><a href="invoice-view.php?id=85">View</a></td></tr>
              <tr class="status-vacant"><td>INV-2026-0084</td><td>Grace Wanjiku</td><td>C07</td><td>August 2026</td><td>KSh 12,800</td><td>05 Aug 2026</td><td><span class="status-badge status-due">Due</span></td><td><a href="invoice-view.php?id=84">View</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-billing.css">
</body></html>
