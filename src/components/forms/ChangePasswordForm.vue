<template>
  <v-form @submit.prevent="submitPassword">
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="currentPassword"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      hint="Au moins 8 charactères"
                      counter
                      @click:append="show1 = !show1"
                      label="Mot de passe actuel"
                      outlined required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="newPassword"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      hint="At least 8 characters"
                      counter
                      @click:append="show2 = !show2"
                      label="Nouveau mot de passe"
                      outlined required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="confirmPassword"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show3 ? 'text' : 'password'"
                      hint="At least 8 characters"
                      counter
                      @click:append="show3 = !show3"
                      label="Confirmer le mot de passe" outlined required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn type="submit" color="primary">Enregistrer</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      currentPassword : "",
      newPassword: "",
      confirmPassword: "",
      show1: false,
      show2: false,
      show3: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
    async submitPassword(){
      const data = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      }
      // Vérifier que les mots de passe correspondent
      if(this.newPassword !== this.confirmPassword){
        alert("Les mots de passe ne correspondent pas")
        return
      }
      await axios.put( `${process.env.VUE_APP_API_URI}/api/updateUserPassword`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(() => {
        alert("Mot de passe modifié avec succès");
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      }).catch((error) => {
        console.error("Error while updating password: ", error);
        alert("Erreur lors de la modification du mot de passe")
      })
    }
  }
}
</script>

<style scoped>

</style>