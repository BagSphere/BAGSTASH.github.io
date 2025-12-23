// Skeleton loader
window.onload = () => {
  setTimeout(() => {
    document.getElementById("skeleton").style.display = "none";
    document.getElementById("productGrid").classList.remove("hidden");
  }, 1500);
};

// Product filter
function filterProducts(type) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
}

// PWA Install
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installPopup").style.display = "block";
});

document.getElementById("installBtn")?.addEventListener("click", () => {
  deferredPrompt.prompt();
});

function closeInstall() {
  document.getElementById("installPopup").style.display = "none";
}
