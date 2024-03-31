<template>
  <div>
    <h1>Matières</h1>
    <div v-for="subject in subjects" :key="subject.id">
      <div class="carte-prez">
        <div class="image-wrapper">
          <img :src="subject.illustration" alt="Illustration de la matière" />
        </div>
        <div class="text-wrapper">
          <h2>{{subject.title}}</h2>
          <p>{{subject.description}}</p>
          <router-link :to="{name: 'SubjectDetail', params: {subjectId: subject.id}}" v-if="isTeacher || isAdmin">Voir détails</router-link>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
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
    };
  },
  beforeMount() {
    this.fetchSubjects();
  },
  computed: {
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
    async fetchSubjects() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URI}/api/programs/${this.programId}/subjects`).then((response) => {
          console.log("Fetched subjects:", response.data.subjects);
          this.subjects = response.data.subjects;
        }).catch(
          (error) => {
            console.error(error);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>

.carte-prez{
  display: flex;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.carte-prez .image-wrapper{
  width: 200px;
  height: 200px;
  margin-right: 20px;
}

.carte-prez .image-wrapper img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carte-prez .text-wrapper{
  flex: 1;
}
</style>