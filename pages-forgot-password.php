<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = 'Pages / Reset Password - My Nyumba';
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
                      <img src="assets/img/logo.jpg" alt="" style=" max-height: 40px; margin-right: 8px;">
                      <span class="d-lg-block">Reset password</span>
                    </a>
                  </div><!-- End Logo -->

                <div class="card-body">

                  <div class="pb-2 pt-4">
                    <p class="text-center small">Enter your email to reset your password</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">Email</label>
                      <input type="email" name="email" class="form-control" id="yourEmail" placeholder="email@example.com" required>
                      <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Submit</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0"><a href="pages-login.php">Log in</a></p>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0"><a href="pages-register.php">Create an account</a></p>
                    </div>
                  </form>

                </div>
              </div>

              <div class="credits">
                Designed by <a href="#">ifix Network ltd</a>
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</script>


<?php require __DIR__ . '/includes/scripts.php'; ?>
</body>
</html>
