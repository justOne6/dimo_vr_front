<template>
  <div class="subject-wrapper page-restrict-width">
    <v-card
        color="primary"
        dark
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
              class="text-h5"
              v-text="subject.title"
          ></v-card-title>

          <v-card-subtitle v-text="subject.description"></v-card-subtitle>
        </div>

        <v-avatar
            class="ma-3"
            size="125"
            tile
        >
          <v-img :src="subject.illustration"></v-img>
        </v-avatar>
      </div>
    </v-card>
    <div v-if="isTeacher || isAdmin">

    <v-divider class="mt-5"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="expansion-title">Ajouter un cours</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddCourse :subjectId="subjectId"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="expansion-title">Ajouter des documents</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddDocument :subjectId="subjectId"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="expansion-title">Ajouter un questionnaire</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Contenu
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider class="mt-5"></v-divider>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import AddDocument from "@/components/forms/AddDocument.vue";
import AddCourse from "@/components/forms/AddCourseForm.vue";

export default {
  name: "SubjectPage",
  components: {AddCourse, AddDocument},
  props:["subjectId"],
  data() {
    return {
      subject: {},
    };
  },
beforeMount() {
    this.fetchSubject();
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
    async fetchSubject() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URI}/api/subjects/${this.subjectId}`).then((response) => {
          this.subject = response.data.subject;
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
};
</script>

<style scoped>
.subject-wrapper{
  margin-top: 5rem;
}
.expansion-title{
  font-size: 1.5rem;
}
</style>