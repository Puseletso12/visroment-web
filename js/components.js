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