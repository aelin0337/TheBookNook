import { apiRequest } from './api.js';

async function loadProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first');
    return;
  }

  try {
    const user = await apiRequest('/users/me', 'GET', null, token);

    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-role').textContent = user.role;
  } catch (e) {
    console.error(e);
    alert('Ошибка загрузки профиля');
  }
}

loadProfile();