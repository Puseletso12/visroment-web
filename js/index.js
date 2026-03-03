const products = {
  p2: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p2.jpg",
    category: "T-shirts",
  },
  p3: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p3.jpg",
    category: "T-shirts",
  },
  p4: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p4.jpg",
    category: "T-shirts",
  },
  p5: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p5.jpg",
    category: "T-shirts",
  },
  p7: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p7.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p10: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p10.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p11: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p11.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p25: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p25.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p79: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p79.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p82: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p82.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
  p87: {
    name: '"The Goal" Tee',
    price: "R450.00",
    description:
      "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.",
    mainImage: "./image/product/p87.jpg",
    gallery: [],
    category: "T-shirts",
    rating: 4,
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("mainNavbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Your other code (products, cart, etc.) stays here...
  updateCartCounter();
});

document.addEventListener("DOMContentLoaded", function () {
  const productElements = document.querySelectorAll(".product");
  productElements.forEach((product) => {
    product.addEventListener("click", function (e) {
      const imgSrc = this.querySelector("img").src;
      const productId = imgSrc.split("/").pop().split(".")[0];

      if (products[productId]) {
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(products[productId])
        );
        window.location.href = "product.html";
      }
    });
  });

  if (window.location.pathname.includes("product.html")) {
    loadProductDetails();
  }

  updateCartCounter();
});

function loadProductDetails() {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) return;

  const mainImg = document.getElementById("mainImg");
  if (mainImg) mainImg.src = selectedProduct.mainImage;

  document.querySelector("h3.py-4").textContent = selectedProduct.name;
  document.querySelector("h2").textContent = selectedProduct.price;
  // document.querySelector("span").textContent = selectedProduct.description;
  document.querySelector(
    "h6"
  ).textContent = `Home / ${selectedProduct.category}`;

  const smallImgs = document.querySelectorAll(".small-img");
  selectedProduct.gallery.forEach((img, index) => {
    if (smallImgs[index]) {
      smallImgs[index].src = img;
    }
  });

  const stars = document.querySelectorAll(".star i");
  stars.forEach((star, index) => {
    if (index < selectedProduct.rating) {
      star.className = "fa-solid fa-star";
    } else {
      star.className = "fa-regular fa-star";
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const MainImg = document.getElementById("mainImg");
  const smallImgs = document.getElementsByClassName("small-img");

  // Function to update product info based on image source
  function updateProductInfo(imgSrc) {
    // Extract product ID from image path
    const productId = imgSrc.split("/").pop().split(".")[0];

    // Check if product exists in our product database
    if (products[productId]) {
      const product = products[productId];

      // Update main image
      MainImg.src = imgSrc;

      // Update product details
      document.querySelector("h3.py-4").textContent = product.name;
      document.querySelector("h2").textContent = product.price;
      document.querySelector("span").textContent = product.description;
      document.querySelector("h6").textContent = `Home / ${product.category}`;

      // Update product rating stars
      const stars = document.querySelectorAll(".star i");
      stars.forEach((star, index) => {
        if (index < product.rating) {
          star.className = "fa-solid fa-star";
        } else {
          star.className = "fa-regular fa-star";
        }
      });

      // Store selected product in localStorage
      localStorage.setItem("selectedProduct", JSON.stringify(product));
    }
  }
  // Add click handlers to all small images
  for (let i = 0; i < smallImgs.length; i++) {
    smallImgs[i].onclick = function () {
      updateProductInfo(this.src);
    };
  }
});
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




  // <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
  //   // ── FIX 1: Nav scroll effect ──────────────────────────────
    const nav = document.getElementById('mainNav');

    function updateNav() {
      if (window.scrollY > 40) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run once on load


    // ── FIX 2: Mobile menu toggle + close on outside click ────
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
      });
    });

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