<?php
require_once __DIR__ . '/config.php';
$pageTitle = $pageTitle ?? APP_NAME;
$user = currentUser();
$userName = htmlspecialchars($user['name'] ?? 'Brian Chesa', ENT_QUOTES, 'UTF-8');
$userRole = htmlspecialchars($user['role'] ?? 'Administrator', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title><?= htmlspecialchars($pageTitle) ?> - <?= APP_NAME ?></title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <link href="assets/img/favicon.jpg" rel="icon">
  <link href="assets/img/apple-touch-icon.jpg" rel="apple-touch-icon">
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
  <link href="assets/css/my-nyumba-admin.css" rel="stylesheet">
</head>
<body>
<header id="header" class="header fixed-top d-flex align-items-center">
  <div class="d-flex align-items-center justify-content-between">
    <a href="index.php" class="logo d-flex align-items-center" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Home">
      <img src="assets/img/logo.jpg" alt="">
      <span class="d-none d-lg-block">My Nyumba</span>
    </a>
    <i class="bi bi-list toggle-sidebar-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Toggle-sidebar"></i>
  </div>
  <div class="search-bar">
    <form class="search-form d-flex align-items-center" method="POST" action="#">
      <input type="text" name="query" placeholder="Search" title="Enter search keyword">
      <button type="submit" title="Search"><i class="bi bi-search"></i></button>
    </form>
  </div>
  <nav class="header-nav ms-auto">
    <ul class="d-flex align-items-center">
      <li class="nav-item d-block d-lg-none"><a class="nav-link nav-icon search-bar-toggle" href="#"><i class="bi bi-search"></i></a></li>
      <li class="nav-item"><a class="nav-link nav-icon" href="notifications.php" title="Notifications">
<i class="bi bi-bell"></i><span class="badge bg-danger badge-number">4</span>
</a></li><li class="nav-item"><a class="nav-link nav-icon" href="messages.php" title="Messages">
<i class="bi bi-chat-dots"></i><span class="badge bg-primary badge-number">2</span>
</a></li><li class="nav-item dropdown">
        <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-bell"></i></a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
          <li class="dropdown-header">You have 4 new notifications <a href="messages-notifications.php"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a></li>
          <li><hr class="dropdown-divider"></li>
          <li class="notification-item"><i class="bi bi-cash-coin text-success"></i><div><h4>Rent payment received</h4><p>Grace Wanjiku paid KSh 18,500 for House B12.</p><p>30 min. ago</p></div></li>
          <li><hr class="dropdown-divider"></li>
          <li class="notification-item"><i class="bi bi-tools text-danger"></i><div><h4>Maintenance request</h4><p>Kevin Mwangi reported a leaking kitchen tap.</p><p>1 hr. ago</p></div></li>
          <li><hr class="dropdown-divider"></li>
          <li class="notification-item"><i class="bi bi-house-check text-success"></i><div><h4>House viewing confirmed</h4><p>Amina Hassan confirmed a viewing for House C07.</p><p>2 hrs. ago</p></div></li>
          <li><hr class="dropdown-divider"></li>
          <li class="notification-item"><i class="bi bi-person-plus text-primary"></i><div><h4>New tenant enquiry</h4><p>Samuel Otieno asked about a vacant two-bedroom house.</p><p>4 hrs. ago</p></div></li>
          <li><hr class="dropdown-divider"></li>
          <li class="dropdown-footer"><a href="messages-notifications.php">Show all notifications</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-chat-left-text"></i></a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
          <li class="dropdown-header">You have 3 new messages <a href="messages-notifications.php"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a></li>
          <li><hr class="dropdown-divider"></li>
          <li class="message-item"><a href="messages-emails.php"><span class="message-avatar avatar-wanjiku"><i class="bi bi-person-fill"></i></span><div><h4>Wanjiku Kamau</h4><p>Hello, is House B12 still available for viewing?</p><p>4 hrs. ago</p></div></a></li>
          <li><hr class="dropdown-divider"></li>
          <li class="message-item"><a href="messages-emails.php"><span class="message-avatar avatar-mwangi"><i class="bi bi-person-fill"></i></span><div><h4>Peter Mwangi</h4><p>I have sent the payment confirmation for this month.</p><p>6 hrs. ago</p></div></a></li>
          <li><hr class="dropdown-divider"></li>
          <li class="message-item"><a href="messages-emails.php"><span class="message-avatar avatar-otieno"><i class="bi bi-person-fill"></i></span><div><h4>Samuel Otieno</h4><p>Can I book a viewing for the two-bedroom unit?</p><p>8 hrs. ago</p></div></a></li>
          <li><hr class="dropdown-divider"></li>
          <li class="dropdown-footer"><a href="messages-emails.php">Show all messages</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown pe-3">
        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown"><span class="mn-avatar-icon" aria-hidden="true"><i class="bi bi-person-fill"></i></span><span class="d-none d-md-block dropdown-toggle ps-2"><?= $userName ?></span></a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li class="dropdown-header"><h6><?= $userName ?></h6><span><?= $userRole ?></span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item d-flex align-items-center" href="user-profile.php"><i class="bi bi-person"></i><span>My Profile</span></a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item d-flex align-items-center" href="settings-dashboard.php"><i class="bi bi-gear"></i><span>Account Settings</span></a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item d-flex align-items-center" href="pages-contact.php"><i class="bi bi-question-circle"></i><span>Need Help?</span></a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item d-flex align-items-center" href="logout.php"><i class="bi bi-box-arrow-right"></i><span>Sign Out</span></a></li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<?php require __DIR__ . '/sidebar.php'; ?>
