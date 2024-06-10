<template>
  <div class="courses-wrapper">
    <h1>Courses</h1>
    <v-expansion-panels
      v-for="course in courses"
      :key="course.id"
      class="course"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="courses-titles">
            Du {{ formatDate(course.start_date) }}<br />
            Au {{ formatDate(course.end_date) }}
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="isAdmin || isTeacher">
          <v-btn
            color="primary"
            @click="startCourse(course.id)"
            v-if="!course.is_active"
            >Lancer le cours</v-btn
          >
          <div v-else>
            <v-btn color="primary" @click="endCourse(course.id)"
              >Terminer le cours</v-btn
            >
            <v-btn color="primary" @click="fetchParticipants(course.id)"
              >Voir les participants</v-btn
            >
          </div>
          <v-btn
            @click="deleteCourse(course.id)"
            color="error"
            class="deleteButton"
            >Supprimer</v-btn
          >
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="isStudent && course.is_active">
          <v-btn
            v-if="!isJoined(course.id) && !isPassed(course.end_date)"
            color="primary"
            @click="joinCourse(course.id)"
            >Rejoindre le cours</v-btn
          >
          <v-btn
            @click="leaveCourse(course.id)"
            color="error"
            class="deleteButton"
            >Quitter le cours</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        :text="text"
        title="Liste des participants"
      >
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default {
  name: "ListCourses",
  data() {
    return {
      joinedCourses: [],
      courses: [],
      dialog: false,
      text: "",
    };
  },
  props: {
    subjectId: { required: true },
  },
  beforeMount() {
    this.fetchCourses();
  },
  computed: {
    ...mapState(["reloadCourses"]),
    ...mapGetters(["isRolePresent"]),
    isStudent() {
      return this.isRolePresent("student");
    },
    isTeacher() {
      return this.isRolePresent("teacher");
    },
    isAdmin() {
      return this.isRolePresent("admin");
    },
  },
  methods: {
    isJoined(courseId) {
      return this.joinedCourses.includes(courseId);
    },
    async fetchCourses() {
      if (this.isStudent) {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URI}/api/courses/subject/${this.subjectId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.courses = response.data.courses.filter(
            (course) => course.subject_id === parseInt(this.subjectId)
          );
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des programmes :",
            error
          );
        }
      } else if (this.isTeacher || this.isAdmin) {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URI}/api/courses`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.courses = response.data.courses.filter(
            (course) => course.subject_id === parseInt(this.subjectId)
          );
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des programmes :",
            error
          );
        }
      }
    },
    async deleteCourse(courseId) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_API_URI}/api/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadCourses", !this.reloadCourses);
      } catch (error) {
        console.error("Erreur lors de la suppression du cours :", error);
      }
    },
    async startCourse(courseId) {
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URI}/api/courses/${courseId}/start`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadCourses", !this.reloadCourses);
      } catch (error) {
        if (error.response.status === 400) alert(error.response.data.message);
        else console.error("Erreur lors du démarrage du cours :", error);
      }
    },
    async endCourse(courseId) {
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URI}/api/courses/${courseId}/end`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadCourses");
      } catch (error) {
        console.error("Erreur lors de la fin du cours :", error);
      }
    },
    isPassed(end_date) {
      const currentDate = new Date();
      const endDate = new Date(end_date);
      return currentDate > endDate;
    },
    formatDate(date) {
      return format(new Date(date), "EEEE d MMMM yyyy à HH:mm", { locale: fr });
    },
    async joinCourse(courseId) {
      try {
        await axios.post(
          `${process.env.VUE_APP_API_URI}/api/join-course`,
          { course_id: courseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.joinedCourses.push(courseId);
        alert("Vous avez bien rejoint le cours !");
        this.$store.commit("updateReloadCourses", !this.reloadCourses);
      } catch (error) {
        console.error("Erreur lors de la participation au cours :", error);
      }
    },
    async leaveCourse(courseId) {
      try {
        await axios.post(
          `${process.env.VUE_APP_API_URI}/api/leave-course`,
          { course_id: courseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadCourses", !this.reloadCourses);
      } catch (error) {
        console.error("Erreur lors de la sortie du cours :", error);
      }
    },
    async fetchParticipants(courseId) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URI}/api/courses/${courseId}/participants`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.dialog = true;
        this.text = response.data.countActiveParticipants;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des participants :",
          error
        );
      }
    },
  },
  watch: {
    reloadCourses() {
      this.fetchCourses();
    },
  },
};
</script>

<style scoped>
.courses-titles {
  font-size: 1.5rem;
}
</style>