import { apiRequest } from './api.js';

const form = document.getElementById('registerForm');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  alertBox.classList.add('d-none');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await apiRequest('/users/register', 'POST', {
      name,
      email,
      passwordHash: password
    });

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
  } catch (err) {
    alertBox.textContent = err.message || 'Registration failed';
    alertBox.classList.remove('d-none');
  }
});
