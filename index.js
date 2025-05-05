// MOBILE RESPONSIVE NAVBAR

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

let menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

function toggleMenu() {
  if (menuList.style.maxHeight == "0px") {
    menuList.style.maxHeight = "300px";
  } else {
    menuList.style.maxHeight = "0px";
  }
}

const menu = document.querySelector(".menu-icon");
const navbar = document.querySelector("#menuList");

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const products = {
  backside: {
    name: "The Goal Graphic Tee",
    price: "R450.00",
    description: "Description for Product 1",
    image: "images/backside.jpg",
  },
  product2: {
    name: "The Goal Graphic Tee",
    price: "R450.00",
    description: "Description for Product 2",
    image: "images/product2.jpg",
  },
  product8: {
    name: "The Goal Graphic Tee",
    price: "R450.00",
    description: "Description for Product 3",
    image: "images/product8.jpg",
  },
  whitetee2: {
    name: "The Goal Graphic Tee",
    price: "R450.00",
    description: "Description for Product 4",
    image: "images/whitetee2.jpg",
  },
  whitetee: {
    name: "The Goal Graphic Tee White",
    price: "R450.00",
    description: "Description for Product 5",
    image: "images/whitetee.jpg",
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Select all "Buy Now" buttons
  const buyNowButtons = document.querySelectorAll(".buy-btn");

  buyNowButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior (if it's inside a link)

      // Get the product ID from a data attribute or parent element
      const productElement = this.closest(".product");
      const imgSrc = productElement.querySelector("img").src;
      const productId = imgSrc.substring(
        imgSrc.lastIndexOf("/") + 1,
        imgSrc.lastIndexOf(".")
      );

      // Check if the product exists in the products object
      if (products[productId]) {
        // Save the selected product to localStorage
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(products[productId])
        );

        // Redirect to the product page
        window.location.href = "product.html";
      } else {
        console.error("Product not found:", productId);
      }
    });
  });

  // If on the product page, load product details
  if (window.location.pathname.includes("product.html")) {
    loadProductDetails();
  }
});

// Function to load product details on the product page
function loadProductDetails() {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (selectedProduct) {
    // Populate the product page with the selected product details
    document.querySelector(".product-name").textContent = selectedProduct.name;
    document.querySelector(".product-price").textContent = selectedProduct.price;
    document.querySelector(".product-description").textContent =
      selectedProduct.description;
    document.querySelector(".product-image").src = selectedProduct.image;
  } else {
    console.error("No product found in localStorage.");
  }
}
