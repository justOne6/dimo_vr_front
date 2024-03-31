<template>
  <div class="program-wrapper page-restrict-width">
    <v-card
        color="primary"
        dark
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
              class="text-h5"
              v-text="program.name"
          ></v-card-title>

          <v-card-subtitle v-text="program.description"></v-card-subtitle>
        </div>

        <v-avatar
            class="ma-3"
            size="125"
            tile
        >
          <v-img :src="program.illustration"></v-img>
        </v-avatar>
      </div>
    </v-card>

    <v-divider class="mt-5"></v-divider>
    <!-- Add a new subject -->
    <v-expansion-panels v-if="isTeacher">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="add-subject-title">Ajouter une matière</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddSubjectForm :programId="this.programId" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- Subjects list -->
    <div>
      <ListSubjects :program-id="this.programId"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import AddSubjectForm from "@/components/forms/AddSubjectForm.vue";
import ListSubjects from "@/components/ListSubjects.vue";

export default {
  name: "ProgramPage",
  props: [
      "programId",
  ],
  components: {
    ListSubjects,
    AddSubjectForm
  },
  data() {
    return {
      program: {},
      isAddingSubject: false,
    }
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
  beforeMount() {
    this.fetchProgram();
  },
  methods: {
    async fetchProgram() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URI}/api/programs/${this.programId}`).then((response) => {
          this.program = response.data.program;
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
}
</script>

<style scoped>
.program-wrapper{
  margin-top: 5rem;
}

.add-subject-title{
  font-size: 1.5rem;
  margin: 0;
}

</style>