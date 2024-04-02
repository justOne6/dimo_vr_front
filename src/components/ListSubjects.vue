<template>
  <div class="subjects-wrapper">
    <h1>Matières</h1>
    <div v-for="subject in subjects" :key="subject.id">
      <div class="carte-prez">
        <div class="image-wrapper">
          <img :src="subject.illustration" alt="Illustration de la matière" />
        </div>
        <div class="text-wrapper">
          <h2>{{subject.title}}</h2>
          <p>{{subject.description}}</p>
          <router-link :to="{name: 'SubjectPage', params: {subjectId: subject.id}}" v-if="showSubjectLink">Voir détails</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  name: "ListSubjects",
  components: {},
  props: {
    programId: {
      required: true,
    },
  },
  data() {
    return {
      subjects: [],
      programs: [],
      isStudentRegistered: false,
    };
  },
  beforeMount() {
    this.fetchSubjects();
    this.checkIfStudentProgram();
  },
  computed: {
    ...mapState(["reloadSubjects"]),
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
    showSubjectLink() {
      return (this.isStudentRegistered || this.isTeacher || this.isAdmin);
    },
  },
  methods: {
    async fetchSubjects() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URI}/api/programs/${this.programId}/subjects`).then((response) => {
          this.subjects = response.data.subjects;
        }).catch(
            (error) => {
              console.error(error);
            }
        );
      } catch (error) {
        console.error(error);
      }
    },
    async checkIfStudentProgram() {
      if(this.isStudent){
        try {
          await axios.get(`${process.env.VUE_APP_API_URI}/api/student-programs`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then((response) => {
            this.isStudentRegistered = response.data.programs.some((program) => program.id === parseInt(this.programId)); // false
          }).catch(
              (error) => {
                console.error(error);
              }
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  watch: {
    reloadSubjects() {
      this.fetchSubjects();
    }
  }
};
</script>

<style scoped>
.subjects-wrapper {
  margin-top: 40px;
}

.carte-prez {
  display: flex;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.carte-prez .image-wrapper {
  width: 200px;
  height: 200px;
  margin-right: 20px;
}

.carte-prez .image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carte-prez .text-wrapper {
  flex: 1;
}
</style>