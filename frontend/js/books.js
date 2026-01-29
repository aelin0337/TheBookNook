import { apiRequest } from './api.js';

async function loadBooks() {
  const container = document.getElementById('books');
  container.innerHTML = '<p>Загрузка книг...</p>';

  const books = await apiRequest('/books');

  if (!books || books.length === 0) {
    container.innerHTML = '<p>Книги не найдены</p>';
    return;
  }

  container.innerHTML = ''; // очищаем контейнер перед добавлением

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'col';

    card.innerHTML = `
      <div class="card h-100 p-2">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Автор: ${book.author}</p>
        <p class="card-text">Цена: ${book.price} ₸</p>
        <a href="book.html?id=${book._id}" class="btn btn-primary btn-sm">Подробнее</a>
        <button class="btn btn-success btn-sm mt-2">В корзину</button>
      </div>
    `;

    const btn = card.querySelector('button');
    btn.addEventListener('click', () => addToCart(book._id));

    container.appendChild(card);
  });
}

function addToCart(bookId) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(bookId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Добавлено в корзину');
}

// Загружаем книги при старте
loadBooks();
