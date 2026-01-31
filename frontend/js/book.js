import { apiRequest } from './api.js';

const bookDiv = document.getElementById('book');

// id из URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

if (!bookId) {
  bookDiv.innerHTML = '<p>Book not found.</p>';
} else {
  loadBook(bookId);
}

async function loadBook(id) {
  try {
    const book = await apiRequest(`/books/${id}`);

    bookDiv.innerHTML = `
      <div class="card shadow-sm">
        <div class="row g-0">

          <!-- КАРТИНКА -->
          <div class="col-md-4">
            <img
              src="${book.coverImage || '/images/no-cover.jpg'}"
              class="img-fluid rounded-start h-100 object-fit-cover"
              alt="${book.title}"
            />
          </div>

          <!-- ТЕКСТ -->
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">${book.title}</h3>

              <p class="card-text">
                <strong>Author:</strong> ${book.author}
              </p>

              <p class="card-text">
                <strong>Price:</strong> ${book.price} $
              </p>

              <p class="card-text">
                ${book.description || 'No description available.'}
              </p>

              <button id="addToCart" class="btn btn-success">
                Add to cart
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document
      .getElementById('addToCart')
      .addEventListener('click', () => addToCart(book));

  } catch (error) {
    bookDiv.innerHTML = `<p>Failed to load book.</p>`;
  }
}

function addToCart(book) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingItem = cart.find(item => item._id === book._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${book.title}" added to cart`);
}
