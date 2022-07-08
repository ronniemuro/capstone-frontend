<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
      signTypeFilter: "",
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
    filterPosts: function () {
      return this.posts.filter((post) => {
        var lowerSignType = post.sign_type.toLowerCase();
        var lowerSignTypeFilter = this.signTypeFilter.toLowerCase();
        return lowerSignType.includes(lowerSignTypeFilter);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <p>
      Filter by Sign Type:
      <select name="Sign" v-model="signTypeFilter">
        <option value="Sun">Sun</option>
        <option value="Moon">Moon</option>
        <option value="Rising">Rising</option>
      </select>
    </p>
    <div v-for="post in filterPosts()" v-bind:key="post.id">
      <h4>
        <img
          v-bind:src="post.user.profile_pic"
          v-bind:alt="post.user.name"
          style="object-fit: fill; width: 60px; height: 50px; border: solid 1px #ccc"
        />
        <router-link v-bind:to="`/users/${post.user.id}`">{{ post.user.name }} @{{ post.user.username }}</router-link>
      </h4>
      <h3>{{ post.post_content }}</h3>
      <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
      <router-link v-bind:to="`/posts/${post.id}`">More...</router-link>
    </div>
  </div>
</template>

<style>
img {
  border-radius: 100%;
}
</style>
