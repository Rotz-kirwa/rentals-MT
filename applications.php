<?php
/**
 * ============================================================
 * PAGE: Applications
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

$pageTitle = 'Applications';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Tenant Applications</h1><p>Manage applications, screening and expected move-in dates.</p></div>
<section class="section">
<div class="d-flex justify-content-between align-items-center mb-3">
  <div><span class="mn-badge mn-due">5 Pending</span> <span class="mn-badge mn-paid">8 Approved</span> <span class="mn-badge mn-maint">2 Move-ins This Week</span></div>
  <a href="application-create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Add Application</a>
</div>
<div class="mn-card"><div class="mn-card-head"><strong>Application Register</strong>
<div class="d-flex gap-2"><select class="form-select form-select-sm" style="width:150px"><option>All Statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></select>
<input class="form-control form-control-sm" style="width:190px" type="date" value="2026-08-11"></div></div>
<div class="mn-card-body"><div class="table-responsive"><table class="mn-table">
<thead><tr><th>Applicant</th><th>Phone</th><th>Property</th><th>House</th><th>Applied</th><th>Move-in Date</th><th>Status</th><th>Actions</th></tr></thead>
<tbody>
<tr><td><strong>Mary Njeri</strong></td><td>0712 456 789</td><td>Ngong View</td><td>A09</td><td>07 Aug 2026</td><td><strong>15 Aug 2026</strong></td><td><span class="mn-badge mn-paid">Approved</span></td><td><div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="application-view.php?id=1">View</a></li><li><a class="dropdown-item" href="application-edit.php?id=1">Edit</a></li><li><a class="dropdown-item" href="tenant-create.php?application=1">Add as Tenant</a></li><li><a class="dropdown-item" href="house-view-vacant.php?id=A09">View House</a></li></ul></div></td></tr>
<tr><td><strong>David Ochieng</strong></td><td>0723 118 440</td><td>My Nyumba Apartments</td><td>C03</td><td>09 Aug 2026</td><td><strong>18 Aug 2026</strong></td><td><span class="mn-badge mn-due">Pending</span></td><td><div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="application-view.php?id=2">View</a></li><li><a class="dropdown-item" href="application-edit.php?id=2">Edit</a></li><li><a class="dropdown-item" href="application-create.php?duplicate=2">Duplicate</a></li></ul></div></td></tr>
<tr><td><strong>Faith Wambui</strong></td><td>0790 334 221</td><td>Rongai Heights</td><td>D02</td><td>10 Aug 2026</td><td>01 Sep 2026</td><td><span class="mn-badge mn-due">Pending</span></td><td><div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="application-view.php?id=3">View</a></li><li><a class="dropdown-item" href="application-edit.php?id=3">Edit</a></li></ul></div></td></tr>
</tbody></table></div></div></div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
