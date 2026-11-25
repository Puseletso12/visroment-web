/* ===================================
   VISROMENT PRODUCT DETAILS
=================================== */

let currentProduct = null;

/* ===================================
   LOAD PRODUCT FROM URL
=================================== */

function initialiseProductPage() {
  const container = document.getElementById("product-details");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const productId = params.get("id");

  currentProduct = getProductById(productId);

  if (!currentProduct || !currentProduct.active) {
    container.innerHTML = `
      <div class="text-center py-5">

        <h2>Product not found</h2>

        <p>
          This product may no longer be available.
        </p>

        <a href="shop.html" class="btn">
          Return to Shop
        </a>

      </div>
    `;

    return;
  }

  displayProductDetails(currentProduct);

  displayProductGallery(currentProduct);

  initialiseAddToCart();
}

/* ===================================
   DISPLAY PRODUCT INFORMATION
=================================== */

function displayProductDetails(product) {
  document.getElementById("product-name").textContent = product.name;

  document.getElementById("product-price").textContent = formatPrice(
    product.price,
  );

  document.getElementById("product-category").textContent =
    `Home / ${product.category}`;

  document.getElementById("product-description").textContent =
    product.description;

  document.title = `${product.name} | VISROMENT`;
}

/* ===================================
   PRODUCT IMAGE GALLERY
=================================== */

function displayProductGallery(product) {
  const mainImage = document.getElementById("mainImg");

  const gallery = document.getElementById("productGallery");

  mainImage.src = product.mainImage;
  mainImage.alt = product.name;

  gallery.replaceChildren();

  product.gallery.forEach((imageSrc, index) => {
    const thumbnail = document.createElement("img");

    thumbnail.src = imageSrc;

    thumbnail.alt = `${product.name} - View ${index + 1}`;

    thumbnail.className = "small-img";

    thumbnail.loading = "lazy";

    thumbnail.tabIndex = 0;

    thumbnail.setAttribute("role", "button");

    thumbnail.setAttribute("aria-pressed", String(index === 0));

    if (index === 0) {
      thumbnail.classList.add("active");
    }

    function selectImage() {
      mainImage.src = imageSrc;

      gallery.querySelectorAll(".small-img").forEach((img) => {
        img.classList.remove("active");

        img.setAttribute("aria-pressed", "false");
      });

      thumbnail.classList.add("active");

      thumbnail.setAttribute("aria-pressed", "true");
    }

    thumbnail.addEventListener("click", selectImage);

    thumbnail.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        selectImage();
      }
    });

    gallery.appendChild(thumbnail);
  });
}

/* ===================================
   ADD TO CART
=================================== */

function initialiseAddToCart() {
  const button = document.getElementById("add-to-cart");

  button.addEventListener("click", function () {
    const size = document.getElementById("product-size").value;

    const quantity = Number(document.getElementById("product-quantity").value);

    if (!size) {
      alert("Please select a size.");

      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      alert("Please enter a quantity between 1 and 99.");

      return;
    }

    const cartItem = {
      id: currentProduct.id,

      name: currentProduct.name,

      price: formatPrice(currentProduct.price),

      size: size,

      quantity: quantity,

      image: currentProduct.mainImage,
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find(
      (item) => item.id === cartItem.id && item.size === cartItem.size,
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > 99) {
        alert("Maximum quantity per item is 99.");

        return;
      }

      existingItem.quantity += quantity;
    } else {
      cartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    if (typeof updateCartCounter === "function") {
      updateCartCounter();
    }

    button.textContent = "Added!";
    button.style.backgroundColor = "#28a745";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.backgroundColor = "";
      button.disabled = false;
    }, 1500);
  });
}

/* ===================================
   INITIALISE PAGE
=================================== */

document.addEventListener("DOMContentLoaded", initialiseProductPage);
