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

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const products = {
  m1: {
    name: "The Goal Graphic Tee",
    price: "R450.00",
    description:
      "Lightweight and breathable sports cap for all outdoor activities. Adjustable strap for a perfect fit.",
    mainImage: "./image/m1.png",
    gallery: ["/./assets/white-tee 4.jpg"],
    rating: 3,
    category: "T-shirts",
  },
};
