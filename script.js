/* =========================
   CART STATE
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   DOM ELEMENTS
========================= */
const cartBox = document.getElementById("cart");
const cartItemsBox = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const cartCountEl = document.getElementById("cartCount");

/* =========================
   UTILITIES
========================= */
function generateInvoiceNo() {
  return "INV-" + Date.now();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "90px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#0f172a";
  toast.style.color = "#fff";
  toast.style.padding = "10px 18px";
  toast.style.borderRadius = "999px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/* =========================
   CART TOGGLE
========================= */
function toggleCart() {
  cartBox.classList.toggle("active");
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  showToast("✅ Added to cart");
}

/* =========================
   CHANGE QTY
========================= */
function changeQty(index, type) {
  if (type === "plus") cart[index].qty++;
  if (type === "minus" && cart[index].qty > 1) cart[index].qty--;
  saveCart();
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* =========================
   SAVE CART
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

/* =========================
   UPDATE UI
========================= */
function updateCartUI() {
  let total = 0;
  let html = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.qty}
        </div>
        <div>
          <button onclick="changeQty(${index},'minus')">➖</button>
          <button onclick="changeQty(${index},'plus')">➕</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      </div>
    `;
  });

  cartItemsBox.innerHTML = html || "<p>Your cart is empty</p>";
  totalPriceEl.innerText = total;
  cartCountEl.innerText = cart.length;
}

/* =========================
   WHATSAPP INVOICE
========================= */
function checkout() {
  if (!cart.length) {
    showToast("❗ Cart is empty");
    return;
  }

  const invoiceNo = generateInvoiceNo();
  const date = new Date().toLocaleString();

  let msg =
    `🧾 *BAGSTASH – ORDER INVOICE*%0A` +
    `Invoice No: ${invoiceNo}%0A` +
    `Date: ${date}%0A%0A` +
    `🛍️ *Items:*%0A`;

  cart.forEach(item => {
    msg += `• ${item.name} × ${item.qty} – ₹${item.price * item.qty}%0A`;
  });

  msg +=
    `%0A💰 *Total Amount:* ₹${totalPriceEl.innerText}%0A%0A` +
    `👤 *Customer Details:*%0A` +
    `Name:%0APhone:%0AAddress:%0A%0A` +
    `📦 Order Type: Retail / Bulk`;

  window.open("https://wa.me/918777438644?text=" + msg, "_blank");

  cart = [];
  saveCart();
  toggleCart();
}

/* =========================
   BULK ORDER
========================= */
function bulkOrder() {
  window.open("https://wa.me/918777438644", "_blank");
}

/* =========================
   INIT
========================= */
updateCartUI();
