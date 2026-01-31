import { apiRequest } from './api.js';

const form = document.getElementById('loginForm');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.classList.add('d-none');

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await apiRequest('/users/login', 'POST', {
      email,
      password
    });

    if (!res.token) {
      throw new Error('Authentication failed');
    }

    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);

    window.location.href = 'index.html';
  } catch (err) {
    alertBox.textContent = err.message || 'Login error';
    alertBox.classList.remove('d-none');
  }
});