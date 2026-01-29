// api.js
export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  const headers = { 'Content-Type': 'application/json' };

  const authToken = token || localStorage.getItem('token');
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Ошибка API');
    }

    return data;
  } catch (err) {
    console.error('API request failed:', err);
    throw err; // бросаем ошибку дальше, чтобы фронтенд её обработал
  }
}
