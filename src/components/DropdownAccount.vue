<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            light
            v-bind="attrs"
            v-on="on"
        >
          <span class="material-icons" style="color: var(--darkPurple)">account_circle</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.url"
            tag="router-link"
            @mouseover="highlightItem(index)"
            @mouseleave="removeHighlight(index)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <!-- Ajout du composant Logout -->
        <v-list-item
            v-if="isAuthenticated"
            @click="logout"
            @mouseover="highlightItem(items.length)"
            @mouseleave="removeHighlight(items.length)"
            style="cursor: pointer; color: var(--mediumRed)"
        >
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { VMenu, VList, VListItem, VListItemTitle } from 'vuetify/lib';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DropdownAccount',
  components: {
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
  },
  data() {
    return {
      items: [
        {title: 'Account', url: '/manage-account'},
        {title: 'Custom', url: '/custom'},
      ],
      highlightedIndex: -1,
    };
  },
  computed: {
    ...mapState(['isAuthenticated']), // Récupérer l'état d'authentification du store Vuex
  },
  methods: {
    ...mapActions(['logout']), // Importer l'action logout depuis le store Vuex

    highlightItem(index) {
      this.highlightedIndex = index;
    },
    removeHighlight() {
      this.highlightedIndex = -1;
    },
  },
};
</script>

<style scoped>
.v-list-item:hover {
  background-color: var(--lightGrey);
}
</style>
