<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
      signTypeFilter: "",
      signFilter: "",
      resetFilter: "",
      isSingularLike: 1,
      isSingularComment: 1,
      selected: undefined,
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
        this.sortByMostRecentPosts();
      });
    },
    filterPosts: function () {
      return this.posts.filter((post) => {
        var lowerSignType = post.sign_type.toLowerCase();
        var lowerSignTypeFilter = this.signTypeFilter.toLowerCase();
        var lowerSign = post.sign.toLowerCase();
        var lowerSignFilter = this.signFilter.toLowerCase();
        if (this.signTypeFilter && this.signFilter) {
          return lowerSignType.includes(lowerSignTypeFilter) && lowerSign.includes(lowerSignFilter);
        } else if (this.signTypeFilter) {
          return lowerSignType.includes(lowerSignTypeFilter);
        } else if (this.signFilter) {
          return lowerSign.includes(lowerSignFilter);
        } else {
          return true;
        }
      });
    },
    sortByMostRecentPosts: function () {
      this.posts.sort((a, b) => {
        var keyA = new Date(a.created_at);
        var keyB = new Date(b.created_at);
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="d-flex justify-content-center mb-4">
      <div class="d-inline">
        <select class="form-select d-inline" required v-model="signTypeFilter">
          <option value="" disabled selected>Filter by the Big 3</option>
          <option value="Sun">Sun</option>
          <option value="Moon">Moon</option>
          <option value="Rising">Rising</option>
        </select>
      </div>
      <button v-on:click="signTypeFilter = ''" class="btn btn-light me-3">Clear</button>
      <div class="d-inline">
        <select class="form-select d-inline" required v-model="signFilter">
          <option value="" disabled selected>Filter by Sign</option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
      </div>
      <button v-on:click="signFilter = ''" class="btn btn-light">Clear</button>
    </div>
    <div v-for="post in filterPosts()" v-bind:key="post.id" class="d-flex justify-content-center" data-aos="fade-up">
      <div class="col-6">
        <h3>
          <img
            v-bind:src="post.user.profile_pic"
            v-bind:alt="post.user.name"
            style="object-fit: fill; width: 90px; height: 80px; border: none #ccc"
            class="me-2"
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
          <h2 class="d-flex justify-content-center mb-1">
            <h4 class="col-md-8">{{ post.post_content }}</h4>
          </h2>
          <span class="author mb-0 d-block">
            <h5>
              {{ post.likes.length }} {{ post.likes.length == isSingularLike ? "Like" : "Likes" }} :
              {{ post.comments.length }} {{ post.comments.length == isSingularComment ? "Comment" : "Comments" }}
            </h5>
          </span>
          <p class="text-muted">{{ new Date(post.created_at).toDateString() }}</p>
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
