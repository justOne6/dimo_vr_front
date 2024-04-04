<template>
  <div>
    <Navbar />
    <div class="container">
      <p class="inputs">Create new quizz</p>
      <form @submit.prevent="createQuiz">
        <div class="input_container">
          <p class="input_title">Title</p>
          <input class="input" v-model="newQuiz.title" placeholder="Enter title" required />
        </div>
        <div class="input_container">
          <p class="input_title">Question</p>
          <input class="input" v-model="newQuiz.questions" placeholder="Enter question" required />
        </div>
        <v-btn class="button" type="submit">CREATE QUIZZ</v-btn>
      </form>
      <div v-if="quizzes.length" style="margin-top: 20px">
        <h2>Quizzes</h2>
        <ul>
          <li v-for="(quiz, index) in quizzes" :key="index">
            <router-link :to="{ name: 'Quiz', params: { id: quiz.id } }">{{
        quiz.title
      }}</router-link>
          </li>
        </ul>
      </div>
      <div v-else style="margin-top: 20px">
        <p>No quizzes available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {
      quizzes: [],
      newQuiz: {
        title: "",
        questions: [],
      },
    };
  },
  created() {
    this.fetchQuizzes();
  },
  methods: {
    async fetchQuizzes() {
      try {
        const response = await fetch("api/quizzes");
        if (response.ok) {
          this.quizzes = await response.json();
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    },
    async createQuiz() {
      try {
        const response = await fetch("api/quizzes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newQuiz),
        });
        if (response.ok) {
          console.log("Quiz created successfully");
          // Clear form fields after successful creation
          this.newQuiz.title = "";
          this.newQuiz.questions = [];
          // Refresh quizzes list
          this.fetchQuizzes();
        } else {
          console.error("Failed to create quiz");
        }
      } catch (error) {
        console.error("Error creating quiz:", error);
      }
    },
  },
};
</script>

<style scoped>
.content {
  max-width: 600px;
  margin: auto;
}

.quizz_input {
  border: solid 1px black;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

li {
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
