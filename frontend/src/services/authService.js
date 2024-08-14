export const authService = {
  async register(username, email, password) {
    const response = await client.post('/auth/register', { username, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  },

  async logout() {
    const response = await client.post('/auth/logout');
    return response.data;
  },
};
