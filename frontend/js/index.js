import { apiRequest } from './api.js';

const adminLink = document.getElementById('adminLink');

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (token && role === 'admin') {
  adminLink.classList.remove('d-none');
}

function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

async function loadBooks() {
  const container = document.getElementById('books');
  container.innerHTML = '<p class="text-center">Loading books...</p>';

  const books = await apiRequest('/books');

  if (!books || books.length === 0) {
    container.innerHTML = '<p class="text-center">No books found</p>';
    return;
  }

  container.innerHTML = '';
  container.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'col';

    card.innerHTML = `
      <div class="card h-100 p-3 shadow-sm">
        <h5 class="card-title">${book.title}</h5>

        <p class="card-text text-muted">
          Author: ${book.author}
        </p>

        <p class="card-text fw-bold">
          Price: ${formatPrice(book.price)}
        </p>

        <div class="mt-auto">
  <a
    href="book.html?id=${book._id}"
    class="btn btn-sm w-100 mb-2 custom-btn"
  >
    View details
  </a>
</div>

          <button class="btn btn-sm btn-add-to-cart w-100">
            Add to cart
          </button>
        </div>
      </div>
    `;

    const btn = card.querySelector('.btn-add-to-cart');
    btn.addEventListener('click', () => addToCart(book));

    container.appendChild(card);
  });
}

function addToCart(book) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (!book._id) {
    alert('Error: book ID is missing');
    console.error('Book without _id:', book);
    return;
  }

  const existingItem = cart.find(item => item._id === book._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      _id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${book.title}" has been added to your cart`);
}
loadBooks();
