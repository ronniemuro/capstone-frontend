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
    axios.get("/posts/" + this.$route.params.id + ".json").then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.likes = response.data.likes;
      console.log(response.data.comments);
      this.comments = response.data.comments;
    });
  },
  methods: {
    likesToPlural: function () {
      if (this.post.likes.length === 1) {
        return "Like";
      } else {
        return "Likes";
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <h4>
      <router-link to="/posts">Back</router-link>
      <img v-bind:src="post.user.profile_pic" v-bind:alt="post.user.name" />
      {{ post.user.name }} @{{ post.user.username }}
    </h4>
    <h3>{{ post.post_content }}</h3>
    <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
    <p>{{ post.likes.length }} {{ likesToPlural() }}</p>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <p>{{ comment.user.name }} @{{ comment.user.username }}</p>
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>

<style></style>
