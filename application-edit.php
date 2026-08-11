<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Edit Application';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Edit Application</h1><p>Update applicant details, screening and move-in date.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Applicant Full Name</label><input class="form-control" value="Mary Njeri"></div>
<div class="col-md-3"><label class="form-label">Phone</label><input class="form-control" value="0712 456 789"></div>
<div class="col-md-3"><label class="form-label">Email</label><input class="form-control" value="mary.njeri@example.com"></div>
<div class="col-md-4"><label class="form-label">Property</label><select class="form-select"><option>Ngong View</option><option>My Nyumba Apartments</option><option>Rongai Heights</option></select></div>
<div class="col-md-4"><label class="form-label">Preferred House</label><select class="form-select"><option>A09</option><option>B12</option><option>D02</option></select></div>
<div class="col-md-4"><label class="form-label">Application Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-4"><label class="form-label">Expected Move-in Date</label><input class="form-control" type="date" value="2026-08-15"></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option>Pending</option><option>Approved</option><option>Rejected</option><option>Withdrawn</option></select></div>
<div class="col-md-4"><label class="form-label">Screening Result</label><select class="form-select"><option>Pending</option><option>Passed</option><option>Failed</option></select></div>
<div class="col-md-6"><label class="form-label">ID / Passport Number</label><input class="form-control" value="31245678"></div>
<div class="col-md-6"><label class="form-label">Employment / Business</label><input class="form-control" value="Njeri Enterprises"></div>
<div class="col-12"><label class="form-label">Notes</label><textarea class="form-control" rows="4">Applicant has requested an early move-in if House A09 is ready.</textarea></div>
<div class="col-12"><label class="form-label">Documents</label><input class="form-control" type="file" multiple></div>
<div class="col-12"><button class="btn btn-primary"><i class="bi bi-check-lg"></i> Save Changes</button> <a href="applications.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
