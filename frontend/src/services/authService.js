import client from "@/client";

export const authService = {
  async register(username, email, password) {
    const response = await client.post('/api/auth/register', { username, email, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  async login(email, password) {
    const response = await client.post('/api/auth/login', { email, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  async logout() {
    localStorage.removeItem('authToken');
  },

  async me() {
    const response = await client.get('/api/auth/me');
    return response.data;
  },
};
