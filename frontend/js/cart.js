const cartContainer = document.getElementById('cart-container');
const checkoutBtn = document.getElementById('checkout');

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (!cart.length) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    checkoutBtn.style.display = 'none';
    return;
  }

  checkoutBtn.style.display = 'inline-block';

  let html = `
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>`;

  let totalSum = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;

    html += `
      <tr>
        <td>${item.title}</td>
        <td>${item.author}</td>
        <td>$${item.price}</td>
        <td>
          <input
            type="number"
            min="1"
            value="${item.quantity}"
            class="form-control form-control-sm quantity-input"
            data-id="${item._id}"
          >
        </td>
        <td>$${itemTotal}</td>
        <td>
          <button
            class="btn btn-sm btn-remove"
            data-id="${item._id}">
            Remove
          </button>
        </td>
      </tr>`;
  });

  html += `
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4" class="text-end">Grand total:</th>
          <th colspan="2">$${totalSum}</th>
        </tr>
      </tfoot>
    </table>`;

  cartContainer.innerHTML = html;

  // Quantity change
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const qty = parseInt(e.target.value, 10);
      updateQuantity(id, qty);
    });
  });

  // Remove
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

function updateQuantity(id, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.map(item =>
    item._id === id ? { ...item, quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(item => item._id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

checkoutBtn.addEventListener('click', () => {
  if (!confirm('Do you want to place this order?')) return;

  localStorage.removeItem('cart');
  alert('Your order has been placed successfully!');
  loadCart();
});

loadCart();
