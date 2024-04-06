<template>
  <div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'MyMarks',
  components: {},
  data() {
    return {
      marks: [],
    };
  },
  methods: {
    async fetchMarks() {
      // Fetch marks from the API
      await axios.get(`${process.env.VUE_APP_API_URI}/api/marks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        console.log(response.data.marks);
        this.marks = response.data.marks;
      }).catch((error) => {
        console.error("Error while fetching marks: ", error);
      })
    },
  },
};
</script>

<style scoped>

</style>