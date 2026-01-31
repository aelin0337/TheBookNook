import { apiRequest } from './api.js';

// Check token
const token = localStorage.getItem('token');
if (!token) {
  alert('Please log in first');
  window.location.href = 'index.html';
}

// Get current user and check admin role
async function checkAdmin() {
  try {
    const user = await apiRequest('/users/me', 'GET', null, token);

    if (user.role !== 'admin') {
      alert('Access allowed for admins only');
      document.body.innerHTML = `
        <div class="container my-4">
          <h1 class="text-center">Admin access only</h1>
        </div>`;
      return false;
    }

    return true;
  } catch (e) {
    alert('User verification error');
    console.error(e);
    window.location.href = 'index.html';
    return false;
  }
}

// ------------------- Users -------------------
async function loadUsers() {
  const usersDiv = document.getElementById('users');
  try {
    const users = await apiRequest('/users', 'GET', null, token);

    if (!users || users.length === 0) {
      usersDiv.innerHTML = '<p>No users found</p>';
      return;
    }

    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>`;

    users.forEach(u => {
      html += `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>
            <button class="btn btn-danger btn-sm"
              onclick="deleteUser('${u._id}')">
              Delete
            </button>
          </td>
        </tr>`;
    });

    html += '</tbody></table>';
    usersDiv.innerHTML = html;
  } catch (e) {
    usersDiv.textContent = e.message || 'Failed to load users';
    console.error(e);
  }
}

window.deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await apiRequest(`/users/${id}`, 'DELETE', null, token);
    alert('User deleted successfully');
    loadUsers();
  } catch (e) {
    alert(e.message || 'Error deleting user');
    console.error(e);
  }
};

// ------------------- Orders -------------------
async function loadOrders() {
  const ordersDiv = document.getElementById('orders');
  try {
    const orders = await apiRequest('/orders', 'GET', null, token);

    if (!orders || orders.length === 0) {
      ordersDiv.innerHTML = '<p>No orders found</p>';
      return;
    }

    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>`;

    orders.forEach(o => {
      const userName = o.userId?.name || o.userId || 'Unknown';
      html += `
        <tr>
          <td>${o._id}</td>
          <td>${userName}</td>
          <td>${o.totalAmount}</td>
          <td>${o.status}</td>
          <td>
            <button class="btn btn-primary btn-sm"
              onclick="changeOrderStatus('${o._id}')">
              Change status
            </button>
            <button class="btn btn-danger btn-sm"
              onclick="deleteOrder('${o._id}')">
              Delete
            </button>
          </td>
        </tr>`;
    });

    html += '</tbody></table>';
    ordersDiv.innerHTML = html;
  } catch (e) {
    ordersDiv.textContent = e.message || 'Failed to load orders';
    console.error(e);
  }
};

window.changeOrderStatus = async (id) => {
  const status = prompt(
    'Enter new order status (pending, completed, canceled)'
  );
  if (!status) return;

  try {
    await apiRequest(`/orders/${id}`, 'PUT', { status }, token);
    alert('Order status updated');
    loadOrders();
  } catch (e) {
    alert(e.message || 'Error updating order status');
    console.error(e);
  }
};

window.deleteOrder = async (id) => {
  if (!confirm('Are you sure you want to delete this order?')) return;
  try {
    await apiRequest(`/orders/${id}`, 'DELETE', null, token);
    alert('Order deleted');
    loadOrders();
  } catch (e) {
    alert(e.message || 'Error deleting order');
    console.error(e);
  }
};

// ------------------- Books -------------------
async function loadBooks() {
  const booksDiv = document.getElementById('books');
  try {
    const books = await apiRequest('/books', 'GET', null, token);

    if (!books || books.length === 0) {
      booksDiv.innerHTML = '<p>No books available</p>';
      return;
    }

    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>`;

    books.forEach(b => {
      html += `
        <tr>
          <td>${b.title}</td>
          <td>${b.author}</td>
          <td>${b.price}</td>
          <td>
            <button class="btn btn-danger btn-sm"
              onclick="deleteBook('${b._id}')">
              Delete
            </button>
          </td>
        </tr>`;
    });

    html += '</tbody></table>';
    booksDiv.innerHTML = html;
  } catch (e) {
    booksDiv.textContent = e.message || 'Failed to load books';
    console.error(e);
  }
}

window.deleteBook = async (id) => {
  if (!confirm('Are you sure you want to delete this book?')) return;
  try {
    await apiRequest(`/books/${id}`, 'DELETE', null, token);
    alert('Book deleted');
    loadBooks();
  } catch (e) {
    alert(e.message || 'Error deleting book');
    console.error(e);
  }
};

// ------------------- Init -------------------
(async () => {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return;

  loadUsers();
  loadOrders();
  loadBooks();
  loadBooksByPrice();
})();
async function loadBooksByPrice() {
  const booksDiv = document.getElementById('booksByPrice');
  try {
    const books = await apiRequest('/books/aggregate/price-desc', 'GET', null, token);

    if (!books || books.length === 0) {
      booksDiv.innerHTML = '<p>No books found</p>';
      return;
    }

    let html = `
      <h3 class="mb-3">Books by Price (High → Low)</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>`;

    books.forEach(b => {
      html += `
        <tr>
          <td>${b.title}</td>
          <td>${b.author}</td>
          <td>$${b.price.toFixed(2)}</td>
          <td>${b.stock}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    booksDiv.innerHTML = html;
  } catch (e) {
    booksDiv.textContent = e.message || 'Failed to load books by price';
    console.error(e);
  }
}
