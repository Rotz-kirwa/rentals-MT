<?php
/**
 * ============================================================
 * PAGE: Notifications
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

$pageTitle = 'Notifications';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Notifications</h1><p>Stay on top of rent, leases, maintenance and system events.</p></div>
<section class="section">
<div class="d-flex justify-content-between mb-3">
  <span class="mn-badge mn-due">4 Unread</span>
  <div>
    <button class="btn btn-outline-secondary btn-sm" onclick="markAllNotificationsRead()">Mark All as Read</button>
    <button class="btn btn-outline-danger btn-sm" onclick="clearNotifications()">Clear All</button>
  </div>
</div>
<div class="mn-card">
<div class="mn-card-head"><strong>Recent Notifications</strong><select class="form-select form-select-sm" style="width:150px"><option>All</option><option>Unread</option><option>Payments</option><option>Maintenance</option><option>Leases</option></select></div>
<div class="mn-card-body" id="notificationList">
<div class="mn-notification-row" data-id="1">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Wanjiku Kamau</strong><p class="mb-1">Rent for House B12 is overdue by KSh 18,300.</p><small class="text-muted">10 minutes ago</small></div>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="tenant-view.php?id=1">View Tenant</a></li><li><a class="dropdown-item" href="tenant-invoices.php?id=1">View Invoice</a></li><li><button class="dropdown-item" onclick="markNotificationRead(1)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeNotification(1)">Delete</button></li>
</ul></div></div>
<div class="mn-notification-row" data-id="2">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Peter Mwangi</strong><p class="mb-1">Maintenance request submitted for House A04.</p><small class="text-muted">1 hour ago</small></div>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="maintenance-edit.php?id=2">View Request</a></li><li><button class="dropdown-item" onclick="markNotificationRead(2)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeNotification(2)">Delete</button></li>
</ul></div></div>
<div class="mn-notification-row" data-id="3">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Amina Hassan</strong><p class="mb-1">Lease for House D02 expires in 30 days.</p><small class="text-muted">Yesterday</small></div>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="leases.php">View Lease</a></li><li><a class="dropdown-item" href="tenant-view.php?id=3">View Tenant</a></li><li><button class="dropdown-item" onclick="markNotificationRead(3)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeNotification(3)">Delete</button></li>
</ul></div></div>
<div class="mn-notification-row" data-id="4">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>James Otieno</strong><p class="mb-1">Payment receipt RCT-2026-0812 was generated.</p><small class="text-muted">Yesterday</small></div>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="receipt-view.php?id=1">View Receipt</a></li><li><button class="dropdown-item" onclick="markNotificationRead(4)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeNotification(4)">Delete</button></li>
</ul></div></div>
</div></div></section>
<script>
function removeNotification(id){const e=document.querySelector('.mn-notification-row[data-id="'+id+'"]');if(e)e.remove();}
function markNotificationRead(id){const e=document.querySelector('.mn-notification-row[data-id="'+id+'"]');if(e){e.style.opacity='.55';e.querySelector('strong').style.fontWeight='400';}}
function markAllNotificationsRead(){document.querySelectorAll('.mn-notification-row').forEach(e=>{e.style.opacity='.55';});}
function clearNotifications(){document.getElementById('notificationList').innerHTML='<div class="text-center text-muted p-4">No notifications.</div>';}
</script>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
