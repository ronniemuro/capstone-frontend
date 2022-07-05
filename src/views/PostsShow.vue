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
    console.log(this.$parent);
  },
  methods: {
    likesToPlural: function () {
      if (this.post.likes.length === 1) {
        return "Like";
      } else {
        return "Likes";
      }
    },
    destroyPost: function (post) {
      axios.delete("/posts/" + post.id + ".json").then((response) => {
        console.log("Successfully deleted", response);
        this.$router.push("/posts");
      });
    },
    redirectToShow: function () {
      this.$router.push("/posts");
    },
    redirectToEdit: function () {
      this.$router.push(`/posts/${this.post.id}/edit`);
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <div class="home">
    <h4>
      <p><router-link to="/posts">Back..</router-link></p>
      <img v-bind:src="post.user.profile_pic" v-bind:alt="post.user.name" />
      {{ post.user.name }} @{{ post.user.username }}
    </h4>
    <h3>{{ post.post_content }}</h3>
    <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
    <p>{{ post.likes.length }} {{ likesToPlural() }}</p>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <h5>Comments</h5>
      <p>{{ comment.user.name }} @{{ comment.user.username }}</p>
      <p>{{ comment.comment }}</p>
    </div>
    <div v-if="getUserId() == post.user.id">
      <p><button v-on:click="redirectToEdit()">Edit Post</button></p>
      <p><button v-on:click="destroyPost()">Delete Post</button></p>
    </div>
  </div>
</template>

<style></style>
