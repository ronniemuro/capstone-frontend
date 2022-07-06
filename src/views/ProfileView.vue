<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.getUserId() + ".json").then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <div class="home"></div>
  <h2>
    <img
      v-bind:src="user.profile_pic"
      v-bind:alt="user.name"
      style="object-fit: fill; width: 100px; height: 100px; border: solid 1px #ccc"
    />
    {{ user.name }}
  </h2>
  <h3>@{{ user.username }}</h3>
  <p>☉: {{ user.sun }} ☾: {{ user.moon }} ↑: {{ user.rising }}</p>
  <div v-for="post in posts" v-bind:key="post.id">
    <p>{{ post.post_content }}</p>
  </div>
</template>

<style></style>
