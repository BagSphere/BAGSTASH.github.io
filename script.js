function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const price = document.getElementById("priceFilter").value;

  document.querySelectorAll(".product-card").forEach(card => {
    const matchCategory =
      category === "all" || card.dataset.category === category;

    const matchPrice =
      price === "all" || card.dataset.price === price;

    card.style.display = matchCategory && matchPrice ? "block" : "none";
  });
}
