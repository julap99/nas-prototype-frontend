import { j as defineStore } from '../server.mjs';

const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: null,
    roles: null,
    isAuth: false
  }),
  persist: true,
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setIsAuthenticated(isAuth) {
      this.isAuth = isAuth;
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=user-af469779.mjs.map
