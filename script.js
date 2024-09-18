const fighterSearch = document.getElementById('fighter-search');
const searchButton = document.getElementById('search-button');
const fighterCards = document.querySelectorAll('.fighter-card');
const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const confirmPurchaseBtn = document.getElementById('confirm-purchase');

let cart = [];

searchButton.addEventListener('click', searchFighters);
fighterSearch.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchFighters();
  }
});

function searchFighters() {
  const searchTerm = fighterSearch.value.toLowerCase();
  fighterCards.forEach(card => {
    const fighterName = card.querySelector('.fighter-name').textContent.toLowerCase();
    if (fighterName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const fighterName = e.target.getAttribute('data-fighter');
    addToCart(fighterName);
  });
});

function addToCart(fighterName) {
  cart.push(fighterName);
  updateCartDisplay();
}

function updateCartDisplay() {
  cartLink.textContent = `Cart (${cart.length})`;
  renderCartItems();
}

function renderCartItems() {
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item}</span>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

cartLink.onclick = function(e) {
  e.preventDefault();
  cartModal.style.display = "block";
  renderCartItems();
}

closeBtn.onclick = function() {
  cartModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
}

confirmPurchaseBtn.onclick = function() {
  if (cart.length > 0) {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartDisplay();
    cartModal.style.display = "none";
  } else {
    alert('Your cart is empty. Add some items before confirming purchase.');
  }
}

// Smooth scroll to market section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});