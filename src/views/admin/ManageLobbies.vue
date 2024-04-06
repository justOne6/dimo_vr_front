<template>
  <div class="Lobbies-wrapper">
    <h1>Lobbies</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Modifier les lobbies</v-card-title>
          <v-card-text>
            <v-form class="form-lobby" v-for="(lobby, index) in lobbies" :key="index" @submit.prevent="updateLobbies(index)">
              <v-row >
                <v-col cols="12">
                  <v-text-field v-model="lobby.name" :label="'Nom du Lobby ' + (index + 1)"></v-text-field>
                </v-col>
              </v-row>
              <v-btn type="submit" color="primary">Enregistrer</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ManageLobbies',
  data() {
    return {
      lobbies: [],
    };
  },
  beforeMount() {
    this.fetchLobbies();
  },
  methods: {
    async fetchLobbies() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URI}/api/admin/lobbies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.lobbies = response.data.lobbies;
      } catch (error) {
        console.error('Erreur lors de la récupération des lobbies :', error);
      }
    },
    async updateLobbies(index) {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_URI}/api/admin/lobbies/${this.lobbies[index].id}`, {
          name: this.lobbies[index].name,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du lobby :', error);
      }
    },
  },
};
</script>

<style scoped>
.form-lobby{
  margin: 20px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 5px;
}

</style>