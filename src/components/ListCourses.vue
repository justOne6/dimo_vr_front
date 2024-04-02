<template>
  <div class="courses-wrapper">
    <h1>Courses</h1>
    <div v-for="course in courses" :key="course.id" class="course">
      <p> De {{course.start_date}} à {{course.end_date}}</p>
      <div>
        <v-btn color="primary" @click="startCourse(course.id)" v-if="!course.is_active">Lancer le cours</v-btn>
        <v-btn color="primary" @click="endCourse(course.id)" v-else>Terminer le cours</v-btn>
        <v-btn @click="deleteCourse(course.id)" color="error" class="deleteButton" v-if="isAdmin || isTeacher">Supprimer</v-btn>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState} from "vuex";

export default {
  name: 'ListCourses',
  data() {
    return {
      courses: [],
    };
  },
  props: {
    subjectId: {required: true}
  },
  beforeMount() {
    this.fetchCourses();
  },
  computed: {
    ...mapState(['reloadCourses']),
    ...mapGetters(['isRolePresent']),
    isStudent() {
      return this.isRolePresent('student');
    },
    isTeacher() {
      return this.isRolePresent('teacher');
    },
    isAdmin() {
      return this.isRolePresent('admin');
    },
  },
  methods: {
    async fetchCourses() {
      if(this.isStudent) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URI}/api/courses/subject/${this.subjectId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // Need to filter the courses to only show the ones that are related to the subject
          this.courses = response.data.courses.filter(course => course.subject_id === parseInt(this.subjectId));
        } catch (error) {
          console.error('Erreur lors de la récupération des programmes :', error);
        }
      }
      else if(this.isTeacher || this.isAdmin) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URI}/api/courses`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // Need to filter the courses to only show the ones that are related to the subject
          this.courses = response.data.courses.filter(course => course.subject_id === parseInt(this.subjectId));
        } catch (error) {
          console.error('Erreur lors de la récupération des programmes :', error);
        }
      }
    },
    async deleteCourse(courseId) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_URI}/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          this.$store.commit('updateReloadCourses', !this.reloadCourses);
        }).catch((error) => {
          console.error('Erreur lors de la suppression du cours :', error);
        });

      } catch (error) {
        console.error('Erreur lors de la suppression du cours :', error);
      }
    },
    async startCourse(courseId) {
      try {
        await axios.put(`${process.env.VUE_APP_API_URI}/api/courses/${courseId}/start`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          this.$store.commit('updateReloadCourses', !this.reloadCourses);
        });
      } catch (error) {
        console.error('Erreur lors du démarrage du cours :', error);
      }
    },
    async endCourse(courseId) {
      try {
        await axios.put(`${process.env.VUE_APP_API_URI}/api/courses/${courseId}/end`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          this.$store.commit('updateReloadCourses');
        });
        } catch (error) {
          console.error('Erreur lors de la fin du cours :', error);
      }
    }
  },
  watch: {
    // Call the fetchCourses method when the reloadCourses state changes
    reloadCourses() {
      this.fetchCourses();
    }
  },
};
</script>

<style scoped>

.course{
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
}

</style>