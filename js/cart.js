/* ===================================
   VISROMENT SHOPPING CART
=================================== */

const SHIPPING_FEE = 100;
const MAX_CART_QUANTITY = 99;

let cartItems = [];

const VALID_SIZES = ["XL", "Large", "Medium", "Small", "XS", "XXS"];

/* ===================================
   LOAD AND VALIDATE CART
=================================== */

function loadCart() {
  let savedCart;

  try {
    savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    savedCart = [];
  }

  if (!Array.isArray(savedCart)) {
    savedCart = [];
  }

  const validItems = [];

  savedCart.forEach((item) => {
    if (!item || typeof item !== "object") return;

    // Retrieve product from the central catalogue

    let product = getProductById(item.id);

    // Support older cart records without IDs

    if (!item.id) {
      const matches = getActiveProducts().filter(
        (p) => p.mainImage === item.image,
      );

      if (matches.length === 1) {
        product = matches[0];
      }
    }

    const quantity = Number(item.quantity);

    // Reject invalid or unavailable products

    if (
      !product ||
      !product.active ||
      !VALID_SIZES.includes(item.size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_CART_QUANTITY
    ) {
      return;
    }

    const existingItem = validItems.find(
      (entry) => entry.id === product.id && entry.size === item.size,
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        MAX_CART_QUANTITY,
        existingItem.quantity + quantity,
      );
    } else {
      validItems.push({
        id: product.id,

        name: product.name,

        price: formatPrice(product.price),

        size: item.size,

        quantity: quantity,

        image: product.mainImage,
      });
    }
  });

  cartItems = validItems;

  saveCart();
}

/* ===================================
   SAVE CART
=================================== */

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  if (typeof updateCartCounter === "function") {
    updateCartCounter();
  }
}

/* ===================================
   CREATE CART ITEM
=================================== */

function createCartItem(item, index) {
  const product = getProductById(item.id);

  const row = document.createElement("div");

  row.className = "cart-item vis-cart-item";

  // Product image

  const image = document.createElement("img");

  image.src = product.mainImage;
  image.alt = product.name;
  image.className = "vis-cart-image";

  // Product information

  const details = document.createElement("div");

  details.className = "vis-cart-details";

  const name = document.createElement("h5");

  name.textContent = product.name;

  const size = document.createElement("p");

  size.textContent = `Size: ${item.size}`;

  const price = document.createElement("p");

  price.textContent = formatPrice(product.price);

  details.append(name, size, price);

  // Quantity controls

  const controls = document.createElement("div");

  controls.className = "vis-cart-quantity";

  const decrease = document.createElement("button");

  decrease.className = "quantity-btn";
  decrease.type = "button";
  decrease.textContent = "−";
  decrease.disabled = item.quantity <= 1;

  decrease.setAttribute("aria-label", `Decrease quantity of ${product.name}`);

  decrease.addEventListener("click", () => {
    updateQuantity(index, -1);
  });

  const quantity = document.createElement("span");

  quantity.textContent = item.quantity;

  const increase = document.createElement("button");

  increase.className = "quantity-btn";
  increase.type = "button";
  increase.textContent = "+";

  increase.disabled = item.quantity >= MAX_CART_QUANTITY;

  increase.setAttribute("aria-label", `Increase quantity of ${product.name}`);

  increase.addEventListener("click", () => {
    updateQuantity(index, 1);
  });

  controls.append(decrease, quantity, increase);

  // Individual item total

  const itemTotal = document.createElement("strong");

  itemTotal.className = "vis-cart-item-total";

  itemTotal.textContent = formatPrice(product.price * item.quantity);

  // Remove button

  const removeButton = document.createElement("button");

  removeButton.type = "button";

  removeButton.className = "vis-remove-btn";

  removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  removeButton.setAttribute("aria-label", `Remove ${product.name} from cart`);

  removeButton.addEventListener("click", () => {
    removeItem(index);
  });

  row.append(image, details, controls, itemTotal, removeButton);

  return row;
}

/* ===================================
   DISPLAY CART
=================================== */

function displayCart() {
  const container = document.getElementById("cart-items");

  if (!container) return;

  container.replaceChildren();

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="vis-empty-cart">

        <i class="fa-solid fa-cart-shopping"></i>

        <h3>Your cart is empty</h3>

        <p>Explore our collection to get started.</p>

        <a href="shop.html" class="btn">
          Continue Shopping
        </a>

      </div>
    `;
  } else {
    cartItems.forEach((item, index) => {
      container.appendChild(createCartItem(item, index));
    });
  }

  updateCartTotals();

  checkPolicyAcceptance();
}

/* ===================================
   UPDATE QUANTITY
=================================== */

function updateQuantity(index, change) {
  if (!cartItems[index]) return;

  const newQuantity = cartItems[index].quantity + change;

  if (newQuantity < 1 || newQuantity > MAX_CART_QUANTITY) {
    return;
  }

  cartItems[index].quantity = newQuantity;

  saveCart();

  displayCart();
}

/* ===================================
   REMOVE ITEM
=================================== */

function removeItem(index) {
  if (!cartItems[index]) return;

  cartItems.splice(index, 1);

  saveCart();

  displayCart();
}

/* ===================================
   CALCULATE TOTALS
=================================== */

function updateCartTotals() {
  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.id);

    return total + product.price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? SHIPPING_FEE : 0;

  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = formatPrice(subtotal);

  document.getElementById("shipping").textContent = formatPrice(shipping);

  document.getElementById("total").textContent = formatPrice(total);
}

/* ===================================
   POLICY ACCEPTANCE
=================================== */

function checkPolicyAcceptance() {
  const accepted = localStorage.getItem("policyAccepted") === "true";

  const checkbox = document.getElementById("policyCheckbox");

  const status = document.getElementById("policyStatus");

  const checkout = document.getElementById("checkoutBtn");

  checkbox.checked = accepted;

  checkout.disabled = !accepted || cartItems.length === 0;

  checkout.classList.toggle("disabled", checkout.disabled);

  if (cartItems.length === 0) {
    status.textContent = "Add products before proceeding to checkout.";

    status.className = "policy-reminder";
  } else if (accepted) {
    status.textContent = "Policy accepted. You can proceed to checkout.";

    status.className = "policy-accepted";
  } else {
    status.textContent = "Please read and accept our policy before checkout.";

    status.className = "policy-reminder";
  }
}

/* ===================================
   INITIALISE CART PAGE
=================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("cart-items")) return;

  loadCart();

  displayCart();

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const accepted = localStorage.getItem("policyAccepted") === "true";

    if (!accepted || cartItems.length === 0) {
      return;
    }

    window.location.href = "payment.html";
  });
});
