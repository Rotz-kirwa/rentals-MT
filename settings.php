<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Settings';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Settings</h1><p>Configure your rental management system, property defaults and user preferences.</p></div>
<section class="section">
<div class="row g-4">
<div class="col-lg-3"><div class="list-group">
<a class="list-group-item list-group-item-action active" href="#general">General</a>
<a class="list-group-item list-group-item-action" href="#billing">Billing & Charges</a>
<a class="list-group-item list-group-item-action" href="#notifications">Notifications</a>
<a class="list-group-item list-group-item-action" href="#security">Security</a>
<a class="list-group-item list-group-item-action" href="admins.php">Admins & Privileges</a>
</div></div>
<div class="col-lg-9">
<div class="mn-card mb-4" id="general"><div class="mn-card-head"><strong>General Settings</strong></div><div class="mn-card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Company Name</label><input class="form-control" value="ifix Network ltd"></div>
<div class="col-md-6"><label class="form-label">Currency</label><select class="form-select"><option selected>KSh — Kenyan Shilling</option></select></div>
<div class="col-md-6"><label class="form-label">Timezone</label><select class="form-select"><option selected>Africa/Nairobi (EAT)</option></select></div>
<div class="col-md-6"><label class="form-label">Date Format</label><select class="form-select"><option selected>DD MMM YYYY</option><option>DD/MM/YYYY</option></select></div>
<div class="col-12"><label class="form-label">Business Address</label><textarea class="form-control" rows="2">Kenya</textarea></div>
<div class="col-12"><button class="btn btn-primary">Save General Settings</button></div>
</form></div></div>
<div class="mn-card mb-4" id="billing"><div class="mn-card-head"><strong>Billing & Charges</strong></div><div class="mn-card-body"><form class="row g-3">
<div class="col-md-4"><label class="form-label">Default Deposit</label><input class="form-control" value="1 Month Rent"></div>
<div class="col-md-4"><label class="form-label">Default Garbage (KSh)</label><input class="form-control" value="300"></div>
<div class="col-md-4"><label class="form-label">Late Payment Grace (Days)</label><input class="form-control" value="5"></div>
<div class="col-md-6"><label class="form-label">Invoice Prefix</label><input class="form-control" value="INV-"></div>
<div class="col-md-6"><label class="form-label">Receipt Prefix</label><input class="form-control" value="RCT-"></div>
<div class="col-12"><button class="btn btn-primary">Save Billing Settings</button></div>
</form></div></div>
<div class="mn-card mb-4" id="notifications"><div class="mn-card-head"><strong>Notification Preferences</strong></div><div class="mn-card-body">
<div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Rent due and overdue alerts</label></div>
<div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">New maintenance requests</label></div>
<div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Application and move-in reminders</label></div>
<div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox"><label class="form-check-label">SMS notifications</label></div>
<button class="btn btn-primary">Save Notification Settings</button>
</div></div>
<div class="mn-card" id="security"><div class="mn-card-head"><strong>Security</strong></div><div class="mn-card-body"><p>Manage passwords, sessions and login security.</p><a class="btn btn-outline-primary" href="profile.php">Account Security</a> <a class="btn btn-outline-secondary" href="audit-logs.php">View Audit Logs</a></div></div>
</div></div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
