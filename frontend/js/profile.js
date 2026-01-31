import { apiRequest } from './js/api.js';

const profileDiv = document.getElementById('profile');

async function loadProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    profileDiv.innerHTML = '<p>Пожалуйста, войдите в аккаунт.</p>';
    return;
  }

  try {
    const user = await apiRequest('/users/me', 'GET', null, token);
    profileDiv.innerHTML = `
      <p><b>Имя:</b> ${user.name}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Роль:</b> ${user.role}</p>
    `;
  } catch (e) {
    profileDiv.textContent = 'Ошибка загрузки профиля';
  }
}

loadProfile();