// Shopping cart array to hold items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch products from API using Promise constructor
function fetchProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => resolve(data.products))
      .catch((error) => reject(error));
  });
}

// Function to add item to cart
function addItemToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateTotalPrice();
}

// Function to remove item from cart
function removeItemFromCart(itemId) {
  cart = cart.filter((cartItem) => cartItem.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateTotalPrice();
}

// Function to calculate total price
function calculateTotalPrice() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update the total price display
function updateTotalPrice() {
  document.getElementById("total-price").textContent =
    calculateTotalPrice().toFixed(2);
}

// Function to update cart display
function updateCartDisplay() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - $${item.price} x ${item.quantity}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItemFromCart(item.id);

    li.appendChild(removeButton);
    cartList.appendChild(li);
  });
}

// Display products fetched from API
function displayProducts(products) {
  const productsDiv = document.getElementById("products");

  products.forEach((product) => {
    const div = document.createElement("div");
    div.textContent = `${product.title} - $${product.price}`;

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addItemToCart(product);

    div.appendChild(addButton);
    productsDiv.appendChild(div);
  });
}

// Fetch and display products on page load
fetchProducts()
  .then((products) => displayProducts(products))
  .catch((error) => console.error("Error fetching products:", error));

// Initialize cart display and total price on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
  updateTotalPrice();
});
