import { apiRequest } from './api.js';

function formatPrice(price) {
  return price.toFixed(2) + ' $';
}
async function loadBooks(genreId = '') {
  const container = document.getElementById('booksContainer');
  container.innerHTML = '<p>Загрузка книг...</p>';

  try {
    let endpoint = '/books';
    if (genreId) {
      endpoint += `?genre=${genreId}`;
    }

    const books = await apiRequest(endpoint);

    if (!books || books.length === 0) {
      container.innerHTML = '<p>Книг нет</p>';
      return;
    }

    container.innerHTML = '';
    container.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

    books.forEach(book => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card h-100 p-3 shadow-sm">
          <img src="${book.coverImage}" class="card-img-top" alt="${book.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text text-muted">${book.author}</p>
            <p class="card-text fw-bold">${formatPrice(book.price)}</p>
            <div class="mt-auto">
            <a href="book.html?id=${book._id}"class="btn btn-sm w-100 mb-2 custom-btn">View details</a></div>
            <button class="btn btn-sm btn-add-to-cart w-100">Add to cart</button>
          </div>
        </div>
      `;

      const btn = col.querySelector('.btn-add-to-cart');
      btn.addEventListener('click', () => addToCart(book));

      container.appendChild(col);
    });

  } catch (err) {
    container.innerHTML = '<p class="text-danger">Ошибка загрузки книг</p>';
    console.error(err);
  }
}

async function loadGenres() {
  const select = document.getElementById('genreSelect');
  select.innerHTML = '<option value="">Все жанры</option>';

  try {
    const genres = await apiRequest('/genres');

    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre._id;
      option.textContent = genre.name;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      loadBooks(select.value);
    });

  } catch (err) {
    console.error('Ошибка загрузки жанров', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadGenres();
  loadBooks();
});

function addToCart(book) {
  console.log(`Добавлено в корзину: ${book.title}`);
}
