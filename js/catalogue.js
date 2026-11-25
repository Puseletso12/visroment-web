/* ===================================
   VISROMENT CATALOGUE RENDERING
=================================== */

function createProductCard(product) {
  const card = document.createElement("div");

  card.className = "product text-center col-lg-3 col-md-4 col-12";

  card.dataset.productId = product.id;

  // Product image

  const image = document.createElement("img");

  image.className = "img-fluid mb-3";
  image.src = product.mainImage;
  image.alt = product.name;
  image.loading = "lazy";

  // Product name

  const name = document.createElement("h5");

  name.className = "p-name";
  name.textContent = product.name;

  // Product price

  const price = document.createElement("h4");

  price.className = "p-price";
  price.textContent = formatPrice(product.price);

  // Buy Now button

  const button = document.createElement("button");

  button.className = "buy-btn";
  button.type = "button";
  button.textContent = "Buy Now";

  // Assemble the product card

  card.append(image, name, price, button);

  // Product navigation

  card.addEventListener("click", function () {

    window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
  });

  return card;
}

/* ===================================
   RENDER PRODUCT COLLECTION
=================================== */

function renderProducts(containerId, productList) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.replaceChildren();

  if (productList.length === 0) {
    const message = document.createElement("p");

    message.textContent = "No products available.";

    container.appendChild(message);

    return;
  }

  productList.forEach(function (product) {
    const card = createProductCard(product);

    container.appendChild(card);
  });
}

/* ===================================
   INITIALISE CATALOGUE
=================================== */

document.addEventListener("DOMContentLoaded", function () {
  renderProducts("shop-products", getActiveProducts());

  renderProducts("featured-products", getFeaturedProducts());
});
