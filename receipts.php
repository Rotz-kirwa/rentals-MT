<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Receipts';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">
  <div class="pagetitle">
    <h1>Receipts</h1>
    <p>Track rent payments and issue payment receipts.</p>
  </div>

  <section class="section">
    <div class="billing-summary">
      <div class="billing-card"><div class="label">Receipts This Month</div><div class="value">71</div></div>
      <div class="billing-card"><div class="label">Collected</div><div class="value">KSh 1,206,000</div></div>
      <div class="billing-card"><div class="label">M-Pesa</div><div class="value">KSh 948,000</div></div>
      <div class="billing-card"><div class="label">Bank / Cash</div><div class="value">KSh 258,000</div></div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0">Payment Receipts</h5>
          <a href="receipt-create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Record Payment</a>
        </div>
        <div class="table-responsive">
          <table class="billing-table">
            <thead><tr><th>Receipt</th><th>Tenant</th><th>House</th><th>Date</th><th>Method</th><th>Reference</th><th>Amount</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>RCT-2026-0071</td><td>Peter Mwangi</td><td>A04</td><td>04 Aug 2026</td><td>M-Pesa</td><td>QK71AB2L9</td><td>KSh 15,500</td><td><a href="receipt-view.php?id=71">View</a></td></tr>
              <tr><td>RCT-2026-0070</td><td>Kevin Otieno</td><td>B03</td><td>03 Aug 2026</td><td>Bank</td><td>FT-883920</td><td>KSh 18,000</td><td><a href="receipt-view.php?id=70">View</a></td></tr>
              <tr><td>RCT-2026-0069</td><td>Amina Hassan</td><td>D02</td><td>02 Aug 2026</td><td>M-Pesa</td><td>QK69XZ8P1</td><td>KSh 14,000</td><td><a href="receipt-view.php?id=69">View</a></td></tr>
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
