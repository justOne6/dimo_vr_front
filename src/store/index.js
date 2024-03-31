import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roles: JSON.parse(localStorage.getItem('roles')) || [],
    isAuthenticated: !!localStorage.getItem('token'),
    reloadSubjects: false,
  },
  getters: {
    isRolePresent: (state) => (roleName) => {
      if (state.roles && state.roles.length > 0) {
        return state.roles.some(role => role.name === roleName);
      }
      return false; // Retourne false si la liste des rôles est vide ou non définie
    },

  },
  mutations: {
    // Définissez une mutation pour mettre à jour la variable roles
    updateRoles(state, roles) {
      state.roles = roles;
      localStorage.setItem('roles', JSON.stringify(roles));
    },
    // Définissez une mutation pour mettre à jour la variable isAuthenticated
    updateIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    // Définissez une mutation pour mettre à jour la variable reloadSubjects
    updateReloadSubjects(state) {
      state.reloadSubjects = !state.reloadSubjects;
    }
  },
  actions: {
    // Actions pour mettre à jour les rôles
    updateRoles({ commit }, roles) {
      commit('updateRoles', roles);
    },
    // Actions pour mettre à jour isAuthenticated
    updateIsAuthenticated({ commit }, isAuthenticated) {
      commit('updateIsAuthenticated', isAuthenticated);
    },
    logout({ commit }) {
      // Supprimer les données de l'utilisateur de localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      commit('updateRoles', []);
      commit('updateIsAuthenticated', false);
      // Rediriger l'utilisateur vers la page d'accueil
      if(router.currentRoute.path !== '/')
      {
        router.push('/');
      }
    },
    // Actions pour mettre à jour reloadSubjects
    updateReloadSubjects({ commit }) {
      commit('updateReloadSubjects');
    }
  }
});
