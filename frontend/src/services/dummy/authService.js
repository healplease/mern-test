export const dummyUsers = [
  {
    id: 1,
    username: 'dummy',
    email: 'dummy@email.com',
    password: 'dummy',
    avatar: 'https://thispersondoesnotexist.com/',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export let currentUser = null;

export const dummyAuthService = {
  async register(username, email, password) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (dummyUsers.find((user) => user.email === email)) {
      throw new Error('User with this email already exists');
    }
    const user = {
      id: dummyUsers.length + 1,
      username,
      email,
      password,
      avatar: 'https://thispersondoesnotexist.com/',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dummyUsers.push(user);
    currentUser = user.id;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async login(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = dummyUsers.find((user) => user.email === email && user.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    currentUser = user.id;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentUser = null;
    return { message: 'OK' };
  },

  async getCurrentUser() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!currentUser) {
      return null;
    }

    const user = dummyUsers.find((user) => user.id === currentUser);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};