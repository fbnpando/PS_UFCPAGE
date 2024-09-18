const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const confirmPurchaseBtn = document.getElementById('confirm-purchase');

let cart = [];

document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const eventName = e.target.getAttribute('data-event');
    addToCart(eventName);
  });
});

function addToCart(eventName) {
  cart.push(eventName);
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
      <span>${item} Ticket</span>
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
    alert('Thank you for your purchase! Your tickets will be sent to your email.');
    cart = [];
    updateCartDisplay();
    cartModal.style.display = "none";
  } else {
    alert('Your cart is empty. Please add tickets before confirming your purchase.');
  }
}