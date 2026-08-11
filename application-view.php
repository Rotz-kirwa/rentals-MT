<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Application Details';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Application Details</h1><p>Application APP-2026-001.</p></div>
<section class="section"><div class="row g-4">
<div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Mary Njeri</strong><span class="mn-badge mn-paid">Approved</span></div><div class="mn-card-body">
<div class="row g-3"><div class="col-md-4"><div class="mn-kpi">Expected Move-in<strong>15 Aug 2026</strong></div></div><div class="col-md-4"><div class="mn-kpi">Property / House<strong>Ngong View · A09</strong></div></div><div class="col-md-4"><div class="mn-kpi">Application Date<strong>07 Aug 2026</strong></div></div></div><hr>
<p><strong>Phone:</strong> 0712 456 789</p><p><strong>Email:</strong> mary.njeri@example.com</p><p><strong>ID:</strong> 31245678</p><p><strong>Employment:</strong> Njeri Enterprises</p><p><strong>Screening:</strong> Passed</p><p><strong>Notes:</strong> Applicant has requested an early move-in if House A09 is ready.</p>
<div class="mt-3"><a class="btn btn-primary" href="application-edit.php?id=1">Edit</a> <a class="btn btn-success" href="tenant-create.php?application=1">Add as Tenant</a> <a class="btn btn-secondary" href="applications.php">Back</a></div>
</div></div></div>
<div class="col-lg-4"><div class="mn-card"><div class="mn-card-head"><strong>Application Timeline</strong></div><div class="mn-card-body"><p><strong>07 Aug</strong> Application submitted</p><p><strong>08 Aug</strong> Documents verified</p><p><strong>09 Aug</strong> Screening passed</p><p><strong>10 Aug</strong> Application approved</p><p><strong>15 Aug</strong> Expected move-in</p></div></div></div>
</div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
