
const products = [
  {
    id: 1,
    name: "Komandra Classic",
    description: "برجر لحم، جبنة شيدر، خس وصوص خاص",
    price: 150,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Double Cheese",
    description: "برجر دبل، جبنة شيدر وصوص مميز",
    price: 195,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Crispy Chicken",
    description: "دجاج كرسبي، خس ومايونيز",
    price: 135,
    category: "chicken",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Golden Fries",
    description: "بطاطس ذهبية مقرمشة",
    price: 55,
    category: "sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Cold Drink",
    description: "مشروب بارد منعش",
    price: 35,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=85"
  }
];

let cart = [];
let activeCategory = "all";

const menuGrid = document.getElementById("menuGrid");
const menuFilters = document.getElementById("menuFilters");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");

function renderProducts() {
  if (!menuGrid) return;

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory);

  menuGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <strong>${product.price} جنيه</strong>
          <button class="add-to-cart" data-id="${product.id}">
            + أضف للسلة
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCartCount() {
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCartCount();
}

menuGrid?.addEventListener("click", event => {
  const button = event.target.closest(".add-to-cart");
  if (!button) return;

  addToCart(Number(button.dataset.id));

  const originalText = button.textContent;
  button.textContent = "✓ اتضافت";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 700);
});

menuFilters?.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  menuFilters.querySelectorAll(".menu-filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts();
});

cartButton?.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فاضية لسه! اختار وجبتك الأول 🍔");
    return;
  }

  const orderSummary = cart
    .map(item =>
      `${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه`
    )
    .join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  alert(
    `طلبك الحالي:\n\n${orderSummary}\n\nالإجمالي: ${total} جنيه`
  );
});

renderProducts();
renderCartCount();
console.log("Products:", products);
console.log("Menu grid:", document.getElementById("menuGrid"));
console.log("Menu filters:", document.getElementById("menuFilters"));
renderProducts();
document.getElementById("menuGrid").innerHTML =
  "<h2 style='color:#ffc04b'>المنيو شغالة!</h2>";