// Simple client-side Auth utility
export const Auth = {
  loginWithWallet(address) {
    const user = { type: 'wallet', address };
    localStorage.setItem('apmUser', JSON.stringify(user));
    return user;
  },

  registerWithEmail({ name, email, password }) {
    const user = { type: 'email', name, email };
    localStorage.setItem('apmUser', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('apmUser');
  },

  getUser() {
    const raw = localStorage.getItem('apmUser');
    return raw ? JSON.parse(raw) : null;
  },
};
