<template>
  <div class="quiz">
    <Navbar />

    <div class="content">
      <div v-if="quizzes.length">
        <h2>Quizzes</h2>
        <ul>
          <li v-for="(quiz, index) in quizzes" :key="index">
            <router-link :to="{ name: 'Quiz', params: { id: quiz.id } }">{{
              quiz.title
            }}</router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No quizzes available.</p>
      </div>
      <div class="create-quiz">
        <h2>Create New Quiz</h2>
        <form @submit.prevent="createQuiz">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newQuiz.title" required />
          <label for="questions">Questions:</label>
          <textarea
            id="questions"
            v-model="newQuiz.questions"
            required
          ></textarea>
          <button type="submit">Create Quiz</button>
        </form>
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
.quiz {
  text-align: center;
  margin: 20px;
}

.content {
  max-width: 600px;
  margin: auto;
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

.create-quiz {
  margin-top: 40px;
}
</style>
