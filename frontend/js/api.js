export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:5000/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Ошибка авторизации');
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Ошибка API');
  }

  return res.json();
}
