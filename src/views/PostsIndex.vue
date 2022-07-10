<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
      signTypeFilter: "",
      isSingularLike: 1,
      isSingularComment: 1,
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
    <div class="d-flex justify-content-center">
      <div class="col-md-2 mb-3">
        <select class="form-select d-block" required v-model="signTypeFilter">
          <option value="" disabled selected>Filter by the Big 3</option>
          <option value="Sun">Sun</option>
          <option value="Moon">Moon</option>
          <option value="Rising">Rising</option>
        </select>
      </div>
    </div>
    <div v-for="post in filterPosts()" v-bind:key="post.id" class="d-flex justify-content-center" data-aos="fade-up">
      <div class="col-md-3">
        <h3>
          <img
            v-bind:src="post.user.profile_pic"
            v-bind:alt="post.user.name"
            style="object-fit: fill; width: 60px; height: 50px; border: solid 1px #ccc"
          />
          <router-link v-bind:to="`/users/${post.user.id}`" class="btn btn-light btn-lg">
            {{ post.user.name }} @{{ post.user.username }}
          </router-link>
        </h3>
        <div class="post-entry-1 border-bottom">
          <div class="post-meta">
            <span class="date">{{ post.sign_type }}</span>
            <span class="mx-1">&bullet;</span>
            <span>{{ post.sign }}</span>
          </div>
          <h2 class="mb-2">
            <h4>{{ post.post_content }}</h4>
          </h2>
          <span class="author mb-3 d-block">
            <h5>
              {{ post.likes.length }} {{ post.likes.length == isSingularLike ? "Like" : "Likes" }} :
              {{ post.comments.length }} {{ post.comments.length == isSingularComment ? "Comment" : "Comments" }}
            </h5>
          </span>
          <router-link v-bind:to="`/posts/${post.id}`" class="mb-3 btn btn-outline-dark">More...</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img {
  border-radius: 100%;
}
.home {
  text-align: center;
}
.col-md-3 {
  text-align: center;
}
</style>
