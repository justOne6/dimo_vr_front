<template>
  <div>
    <v-form @submit.prevent="addCourse">
      <!-- Message d'erreur -->
      <v-row v-if="error">
        <v-col>
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="course.startDate" label="Date de début" type="date" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="course.startTime" label="Heure de début" type="time" required></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="course.endDate" label="Date de fin" type="date" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="course.endTime" label="Heure de fin" type="time" required></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-switch v-model="course.isActive" label="Lancer le cours dès maintenant"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" type="submit">Ajouter le cours</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCourse",
  props: ["subjectId"],
  data() {
    return {
      error: "",
      course: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        isActive: false,
      },
    };
  },
  methods: {
    async addCourse() {
      const formData = new FormData();
      // Concatenate date and time for start and end dates
      formData.append("start_date", `${this.course.startDate} ${this.course.startTime}`);
      formData.append("end_date", `${this.course.endDate} ${this.course.endTime}`);
      formData.append("is_active", this.course.isActive);
      formData.append("subject_id", this.subjectId);

      try {
        await axios.post(`${process.env.VUE_APP_API_URI}/api/courses`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Reset the form after successful creation
        this.course.startDate = "";
        this.course.startTime = "";
        this.course.endDate = "";
        this.course.endTime = "";
        this.course.isActive = false;
      } catch (error) {
        // si le code d'erreur est 400, on affiche les erreurs de validation
        if (error.response.status === 400) {
          this.error = error.response.data.message;
        } else {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
