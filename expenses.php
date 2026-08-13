<?php
/**
 * ============================================================
 * PAGE: Expenses
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

$pageTitle = 'Expenses';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle">
  <h1>Expenses</h1>
  <p>Track property expenses, maintenance costs, utilities and other operational spending.</p>
</div>
<section class="section">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <span class="mn-badge mn-due">KSh 84,500 This Month</span>
      <span class="mn-badge mn-maint">12 Expenses</span>
    </div>
    <a href="expense-create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Add Expense</a>
  </div>

  <div class="mn-card">
    <div class="mn-card-head">
      <strong>Expense Register</strong>
      <div class="d-flex gap-2">
        <select class="form-select form-select-sm" style="width:170px">
          <option>All Properties</option>
          <option>My Nyumba Apartments</option>
          <option>Ngong View</option>
        </select>
        <select class="form-select form-select-sm" style="width:130px">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
    </div>
    <div class="mn-card-body">
      <div class="table-responsive">
        <table class="mn-table">
          <thead><tr class="status-paid"><th>Date</th><th>Expense</th><th>Property</th><th>Category</th><th>Paid To</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr class="status-maintenance"><td>11 Aug 2026</td><td>Plumbing repair</td><td>Rongai Heights</td><td>Maintenance</td><td>Otieno Plumbing Services</td><td>KSh 4,500</td><td><span class="mn-badge mn-paid">Paid</span></td><td><a href="expense-view.php?id=1">View</a> · <a href="expense-edit.php?id=1">Edit</a></td></tr>
            <tr class="status-paid"><td>08 Aug 2026</td><td>Garbage collection</td><td>My Nyumba Apartments</td><td>Utilities</td><td>Clean Kenya Services</td><td>KSh 12,000</td><td><span class="mn-badge mn-paid">Paid</span></td><td><a href="expense-view.php?id=2">View</a> · <a href="expense-edit.php?id=2">Edit</a></td></tr>
            <tr class="status-pending"><td>05 Aug 2026</td><td>Common-area electricity</td><td>Ngong View</td><td>Utilities</td><td>Kenya Power</td><td>KSh 8,700</td><td><span class="mn-badge mn-due">Pending</span></td><td><a href="expense-view.php?id=3">View</a> · <a href="expense-edit.php?id=3">Edit</a></td></tr>
            <tr class="status-paid"><td>02 Aug 2026</td><td>Painting — House A09</td><td>Ngong View</td><td>Renovation</td><td>Kamau Painters</td><td>KSh 18,500</td><td><span class="mn-badge mn-paid">Paid</span></td><td><a href="expense-view.php?id=4">View</a> · <a href="expense-edit.php?id=4">Edit</a></td></tr>
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
