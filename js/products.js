/* ===================================
   VISROMENT PRODUCT CATALOGUE
=================================== */

const STANDARD_PRICE = 530;
const SPECIAL_PRICE = 350;

const defaultDescription =
  "This item is part of Visroment’s exclusive collection, crafted with premium materials for durability, comfort, and standout style. Each piece is designed to embody the spirit of ambition, resilience, and self-expression. Please review your selection carefully before proceeding to checkout.";

/* Product factory */

function createProduct({
  id,
  name,
  price = STANDARD_PRICE,
  image,
  gallery = [],
  featured = false,
  active = true,
}) {
  return {
    id,
    name,
    price,
    description: defaultDescription,
    category: "T-shirts",
    mainImage: `./image/product/${image}`,
    gallery: [...new Set([image, ...gallery])].map(
      (filename) => `./image/product/${filename}`,
    ),
    featured,
    active,
  };
}

/* ===================================
   PRODUCT RECORDS
=================================== */

const products = {
  p2: createProduct({
    id: "p2",
    name: '"The Goal" Tee',
    image: "p2.jpg",
    active: false,
  }),

  p3: createProduct({
    id: "p3",
    name: 'Black "The Goal" Tee',
    image: "p3.jpg",
    featured: true,
  }),

  p4: createProduct({
    id: "p4",
    name: '"The Goal" Tee',
    image: "p4.jpg",
    active: false,
  }),

  p5: createProduct({
    id: "p5",
    name: '"The Goal" Tee',
    image: "p5.jpg",
    active: false,
  }),

  p7: createProduct({
    id: "p7",
    name: '"The Goal" Tee',
    image: "p7.jpg",
    active: false,
  }),

  p8: createProduct({
    id: "p8",
    name: '"The Double Brown" Boxy Tee',
    image: "p8.jpg",
    gallery: ["p8(back).jpg"],
    featured: true,
  }),

  p10: createProduct({
    id: "p10",
    name: '"The Goal" Tee',
    image: "p10.jpg",
    active: false,
  }),

  p11: createProduct({
    id: "p11",
    name: '"The Goal" Tee',
    image: "p11.jpg",
    gallery: ["p82.jpg", "p9.jpg"],
  }),

  p12: createProduct({
    id: "p12",
    name: '"Someone Who Loves Me" Tee',
    image: "p12.jpg",
  }),

  p13: createProduct({
    id: "p13",
    name: "Tallman Tee",
    image: "p13.jpg",
  }),

  p14: createProduct({
    id: "p14",
    name: '"Sign Language" Tee',
    price: SPECIAL_PRICE,
    image: "p14.jpg",
    gallery: ["p14(2).jpg", "p14(3).jpg"],
  }),

  p15: createProduct({
    id: "p15",
    name: 'Black "Sign Language" Tee',
    price: SPECIAL_PRICE,
    image: "p15.jpg",
    gallery: ["p15(2).jpg"],
  }),

  p19: createProduct({
    id: "p19",
    name: '"Property of Visroment" Tee',
    image: "p19.jpg",
    gallery: ["p19(1).jpg", "p19(2).jpg", "p19(3).jpg"],
    featured: true,
  }),

  p25: createProduct({
    id: "p25",
    name: '"The Goal" Tee',
    image: "p25.jpg",
    active: false,
  }),

  p79: createProduct({
    id: "p79",
    name: '"The Goal" Tee',
    image: "p79.jpg",
    active: false,
  }),

  p82: createProduct({
    id: "p82",
    name: '"The Goal" Tee',
    image: "p82.jpg",
    active: false,
  }),

  p87: createProduct({
    id: "p87",
    name: 'White "The Goal" Tee',
    image: "p87.jpg",
    featured: true,
  }),

  "5D4A0463": createProduct({
    id: "5D4A0463",
    name: 'Black "Sign Language" Tee',
    image: "5D4A0463.jpg",
  }),

  "minimalistic-tee": createProduct({
    id: "minimalistic-tee",
    name: "Minimalistic Tee",
    price: SPECIAL_PRICE,
    image: "minimalistic.jpg",
    gallery: ["minimalistic(back).jpg"],
  }),

  "website-tee": createProduct({
    id: "website-tee",
    name: "Website Tee",
    price: SPECIAL_PRICE,
    image: "website.jpg",
    gallery: ["website(2).jpg"],
  }),
};

/* ===================================
   CATALOGUE HELPER FUNCTIONS
=================================== */

function getProductById(id) {
  return Object.hasOwn(products, id) ? products[id] : null;
}

function getActiveProducts() {
  return Object.values(products).filter((product) => product.active);
}

function getFeaturedProducts() {
  return getActiveProducts().filter((product) => product.featured);
}

function formatPrice(price) {
  return `R${Number(price).toFixed(2)}`;
}
