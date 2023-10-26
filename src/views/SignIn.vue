<template>
  <form @submit.prevent="signIn">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <div>
      <button type="submit">Sign In</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      console.log('Sign in with email:', this.email, 'and password:', this.password);
    },
  },
};
</script>
