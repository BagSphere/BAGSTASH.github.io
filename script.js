function filter(type){
  let cards = document.querySelectorAll('.product-card');
  cards.forEach(card=>{
    card.style.display =
      type === 'all' || card.classList.contains(type)
      ? 'block'
      : 'none';
  });
}
