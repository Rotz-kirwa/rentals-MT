<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Messages';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Messages</h1><p>Communicate with tenants, owners and property staff.</p></div>
<section class="section">
<div class="d-flex justify-content-between mb-3">
  <span class="mn-badge mn-due">2 Unread</span>
  <div>
    <a class="btn btn-primary btn-sm" href="message-create.php"><i class="bi bi-pencil"></i> New Message</a>
    <button class="btn btn-outline-secondary btn-sm" onclick="markAllMessagesRead()">Mark All as Read</button>
  </div>
</div>
<div class="mn-card">
<div class="mn-card-head"><strong>Inbox</strong><div class="input-group" style="max-width:280px"><input class="form-control form-control-sm" placeholder="Search messages..."><button class="btn btn-outline-secondary btn-sm"><i class="bi bi-search"></i></button></div></div>
<div class="mn-card-body" id="messageList">
<div class="mn-message-row" data-id="1">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Wanjiku Kamau</strong><p class="mb-1">Hello, I have made the rent payment. Kindly confirm.</p><small class="text-muted">Today, 9:42 AM</small></div>
<span class="mn-badge mn-due me-2">Unread</span>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="message-view.php?id=1">Open Message</a></li><li><a class="dropdown-item" href="message-create.php?reply=1">Reply</a></li><li><button class="dropdown-item" onclick="markMessageRead(1)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeMessage(1)">Delete</button></li>
</ul></div></div>
<div class="mn-message-row" data-id="2">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Peter Mwangi</strong><p class="mb-1">The leaking pipe in A04 has been fixed.</p><small class="text-muted">Yesterday, 4:18 PM</small></div>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="message-view.php?id=2">Open Message</a></li><li><a class="dropdown-item" href="message-create.php?reply=2">Reply</a></li><li><button class="dropdown-item" onclick="markMessageRead(2)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeMessage(2)">Delete</button></li>
</ul></div></div>
<div class="mn-message-row" data-id="3">
<span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span>
<div class="flex-grow-1"><strong>Mary Njeri</strong><p class="mb-1">Can I view the vacant units available this month?</p><small class="text-muted">Yesterday, 1:06 PM</small></div>
<span class="mn-badge mn-due me-2">Unread</span>
<div class="dropdown"><button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button><ul class="dropdown-menu dropdown-menu-end">
<li><a class="dropdown-item" href="message-view.php?id=3">Open Message</a></li><li><a class="dropdown-item" href="message-create.php?reply=3">Reply</a></li><li><button class="dropdown-item" onclick="markMessageRead(3)">Mark as Read</button></li><li><button class="dropdown-item text-danger" onclick="removeMessage(3)">Delete</button></li>
</ul></div></div>
</div></div></section>
<script>
function removeMessage(id){const e=document.querySelector('.mn-message-row[data-id="'+id+'"]');if(e)e.remove();}
function markMessageRead(id){const e=document.querySelector('.mn-message-row[data-id="'+id+'"]');if(e){e.style.opacity='.55';const b=e.querySelector('.mn-badge');if(b)b.remove();}}
function markAllMessagesRead(){document.querySelectorAll('.mn-message-row').forEach(e=>{e.style.opacity='.55';const b=e.querySelector('.mn-badge');if(b)b.remove();});}
</script>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
