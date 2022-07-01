<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
    };
  },
  created: function () {
    this.indexPosts();
  },
  methods: {
    indexPosts: function () {
      axios.get("/posts.json").then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div v-for="post in posts" v-bind:key="post.id">
      <h4>{{ post.user.name }} @{{ post.user.username }}</h4>
      <h3>{{ post.post_content }}</h3>
      <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
    </div>
  </div>
</template>

<style></style>
