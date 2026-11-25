function loadNavbar() {
    const container = document.getElementById("site-navbar");

    if (!container) return;

    container.innerHTML = `
        <nav id= "vis-navbar" class= "vis-navbar">
        <div class="vis-nav-container">

        <a href="index.html" class="vis-brand">
          <img src="./image/adds/WHITE LOGO.png"
               alt="VISROMENT">
        </a>

        <ul class="vis-nav-links" id="vis-nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="About_us.html">About</a></li>
          <li><a href="Contact_us.html">Contact Us</a></li>
        </ul>

        <div class="vis-nav-actions">
          <a href="cart.html" aria-label="Shopping cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="cart-count"></span>
          </a>

          <a href="signup.html" aria-label="My account">
            <i class="fa-solid fa-user"></i>
          </a>

          <button type="button"
                  id="vis-menu-toggle"
                  aria-label="Toggle navigation"
                  aria-controls="vis-nav-links"
                  aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>

      </div>
    </nav>
  `;

  initialiseNavbar();
}

function initialiseNavbar() {
  const navbar = document.getElementById("vis-navbar");
  const menu = document.getElementById("vis-nav-links");
  const toggle = document.getElementById("vis-menu-toggle");

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const isHomepage = currentPage === "index.html";

  function updateNavbar() {
    navbar.classList.toggle(
      "vis-solid",
      !isHomepage || window.scrollY > 50
    );
  }

   updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  function setMenu(open) {
    menu.classList.toggle("vis-open", open);
    navbar.classList.toggle("vis-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));

    toggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  }

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("vis-open"));
  });

  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  menu.querySelectorAll("a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("vis-active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", function () {
      setMenu(false);
    });
  });
}

loadNavbar();

/* =========================
   SHARED FOOTER
========================= */

function loadFooter() {
  const container = document.getElementById("site-footer");

  if (!container) return;

  container.innerHTML = `
    <footer class="vis-footer">

      <div class="vis-footer-container">

        <div class="vis-footer-brand">
          <a href="index.html">
            <img src="./image/adds/WHITE LOGO.png"
                 alt="VISROMENT">
          </a>
        </div>

        <div class="vis-footer-column">
          <h5>Explore</h5>

          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="About_us.html">About Us</a></li>
            <li><a href="Contact_us.html">Contact Us</a></li>
          </ul>
        </div>

        <div class="vis-footer-column">
          <h5>Customer Care</h5>

          <ul>
            <li><a href="policy.html">Ordering & Payment</a></li>
            <li><a href="policy.html">Delivery & Returns</a></li>
            <li><a href="Contact_us.html">Get in Touch</a></li>
          </ul>
        </div>

        <div class="vis-footer-column">
          <h5>Follow Us</h5>

          <div class="vis-footer-socials">

            <a href="https://www.instagram.com/visroment"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.tiktok.com/@visroment7"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="TikTok">
              <i class="fa-brands fa-tiktok"></i>
            </a>

            <a href="https://wa.me/27607494949"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>

            <a href="mailto:visroment48@gmail.com"
               aria-label="Email">
              <i class="fa-solid fa-envelope"></i>
            </a>

          </div>
        </div>

      </div>

      <div class="vis-footer-bottom">

        <p>
          &copy; ${new Date().getFullYear()} VISROMENT.
          All rights reserved.
        </p>

        <p>
          Developed by
          <a href="https://www.linkedin.com/in/puseletso-chuene-0840b8278/"
             target="_blank"
             rel="noopener noreferrer">
            Puseletso Chuene
          </a>
        </p>

      </div>

    </footer>
  `;
}

loadFooter();