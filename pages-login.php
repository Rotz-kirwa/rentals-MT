<?php
require_once __DIR__ . '/includes/config.php';

// Demo login. Replace with database authentication when your users table is ready.
// Demo credentials: admin@example.com / admin123
if (!empty($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

$loginError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $loginError = 'Please enter your email and password.';
    } elseif (strcasecmp($email, 'admin@example.com') === 0 && hash_equals('admin123', $password)) {
        session_regenerate_id(true);
        $_SESSION['user'] = [
            'name' => 'Brian Chesa',
            'role' => 'Administrator',
            'email' => $email,
        ];
        header('Location: index.php');
        exit;
    } else {
        $loginError = 'Invalid email or password.';
    }
}

$pageTitle = 'Login';
require __DIR__ . '/includes/auth-header.php';
?>

<main>
  <div class="container">
    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div class="card mb-3">
              <div class="card-header d-flex justify-content-center py-4 pt-9 pb-3">
                <a href="index.php" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo.jpg" alt="My Nyumba" style="max-height: 40px; margin-right: 8px;">
                  <span class="d-lg-block">Login</span>
                </a>
              </div>
              <div class="card-body">
                <?php if ($loginError !== ''): ?>
                  <div class="alert alert-danger mt-3" role="alert"><?= htmlspecialchars($loginError) ?></div>
                <?php endif; ?>
                <div class="pb-2 pt-4">
                  <p class="text-center small">Enter your email and password to login</p>
                </div>
                <form class="row g-3 needs-validation" method="post" action="pages-login.php" novalidate>
                  <div class="col-12">
                    <label for="yourEmail" class="form-label">Email</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">@</span>
                      <input type="email" name="email" class="form-control" id="yourEmail" placeholder="admin@example.com" autocomplete="username" required>
                      <div class="invalid-feedback">Please enter your email.</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="yourPassword" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="yourPassword" autocomplete="current-password" required>
                    <div class="invalid-feedback">Please enter your password.</div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="remember" value="1" id="rememberMe">
                      <label class="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit">Login</button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0"><a href="pages-register.php">Create an account</a></p>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0"><a href="pages-forgot-password.php">Forgot password?</a></p>
                  </div>
                </form>
              </div>
            </div>
            <div class="credits">Designed by <a href="#">ifix Network ltd</a></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<?php require __DIR__ . '/includes/scripts.php'; ?>
</body>
</html>
