

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

 const toggler = document.querySelector(".navbar-toggler");
  const menu = document.getElementById("navbarSupportedContent");

  if (toggler && menu) {
    toggler.removeAttribute("data-bs-toggle"); // take full control

    toggler.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = menu.classList.contains("show");
      menu.classList.toggle("show", !isOpen);
      toggler.setAttribute("aria-expanded", String(!isOpen));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (navbar && !navbar.contains(e.target)) {
        menu.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      }
    });
  }


function updateCartCounter() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartLink = document.querySelector('a[href="cart.html"] i');

  if (cartLink) {
    const existingCounter = cartLink.parentNode.querySelector(".cart-counter");
    if (existingCounter) {
      existingCounter.remove();
    }

    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (totalItems > 0) {
      const counterSpan = document.createElement("span");
      counterSpan.className = "cart-counter badge badge-danger";
      counterSpan.style.cssText = `
                position: absolute; 
                top: -8px; 
                right: -8px; 
                background-color: #03346f; 
                color: white; 
                border-radius: 50%; 
                padding: 2px 6px; 
                font-size: 0.7rem; 
                line-height: 1;
                min-width: 20px;
                text-align: center;
            `;
      counterSpan.textContent = totalItems;
      cartLink.parentNode.style.position = "relative";
      cartLink.parentNode.appendChild(counterSpan);
    }
  }
}

function addToCart(product, size, quantity) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const cartItem = {
    name: product.name,
    price: product.price,
    size: size,
    quantity: quantity,
    image: product.mainImage,
  };

  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === cartItem.name && item.size === cartItem.size
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push(cartItem);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCounter();
}

    // Close when clicking anywhere outside the nav
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
      }
    });


    // ── FIX 3: Scroll-reveal (words rise from below) ──────────
    const revealEls = document.querySelectorAll('.reveal');

    // const ob