<script>
import axios from "axios";
export default {
  data: function () {
    return {
      post: {},
      likes: [],
      comments: [],
    };
  },
  created: function () {
    axios.get("/posts/1.json").then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.likes = response.data.likes;
      this.comments = response.data.comments;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home"></div>
  <h4>
    <img v-bind:src="post.user.profile_pic" v-bind:alt="post.user.name" />
    {{ post.user.name }} @{{ post.user.username }}
  </h4>
  <h3>{{ post.post_content }}</h3>
  <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
  <p>{{ post.likes.length }} Likes</p>
  <div v-for="comment in comments" v-bind:key="comment.id">
    <h4>User: {{ comment.username }}</h4>
    <h4>{{ comment.comment }}</h4>
  </div>
</template>

<style></style>
