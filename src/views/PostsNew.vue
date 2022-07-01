<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newPostParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      axios
        .post("/posts.json", this.newPostParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/posts");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="new-post">
    <form v-on:submit.prevent="submit()">
      <h2>New Post</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>How are the planets aligning for you?</label>
        <input type="text" v-model="newPostParams.post_content" />
      </div>
      <div>
        <label>Sign Type:</label>
        <input type="text" v-model="newPostParams.sign_type" />
      </div>
      <div>
        <label>Sign:</label>
        <input type="text" v-model="newPostParams.sign" />
      </div>
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<style></style>
