import { apiRequest } from './api.js';

const ordersDiv = document.getElementById('orders');

async function loadOrders() {
  const token = localStorage.getItem('token');

  if (!token) {
    ordersDiv.innerHTML = `
      <p class="text-center">
        Please log in to view your orders.
      </p>
    `;
    return;
  }

  try {
    const orders = await apiRequest('/orders/my', 'GET', null, token);

    if (!orders || orders.length === 0) {
      ordersDiv.innerHTML = `
        <p class="text-center no-orders-text">
          You don’t have any orders yet.
        </p>
      `;
      return;
    }

    ordersDiv.innerHTML = orders.map(order => {
      const itemsHtml = order.items.map(item => `
        <li>
          ${item.title} (${item.author}) —
          ${item.quantity} × $${item.priceAtPurchase} =
<b>$${item.priceAtPurchase * item.quantity}</b>
        </li>
      `).join('');

      return `
        <div class="order-card mb-4">
          <p><b>Order ID:</b> ${order._id}</p>
          <p><b>Total:</b> $${order.totalAmount}</p>
          <p><b>Status:</b> ${order.status}</p>
          <p><b>Date:</b> ${new Date(order.createdAt).toLocaleString()}</p>

          <div>
            <b>Items:</b>
            <ul>${itemsHtml}</ul>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error(err);
    ordersDiv.textContent = 'Failed to load orders.';
  }
}

loadOrders();
