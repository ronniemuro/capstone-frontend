<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
    };
  },
  props: ["searchTerm"],
  created: function () {
    this.indexUsers();
  },
  watch: {
    searchTerm() {
      this.indexUsers();
    },
  },
  methods: {
    indexUsers: function () {
      // this.searchTerm = this.$route.query.search;
      axios.get("/users.json?search_term=" + this.searchTerm).then((response) => {
        console.log(response.data);
        this.users = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="profile-search">
    <h5 class="text-center mb-4">Results:</h5>
    <div v-for="user in users" v-bind:key="user.id" class="d-flex justify-content-center">
      <div class="post-entry-1 border-bottom col-6 mb-3">
        <h2>
          <div class="mb-0 text-center">
            <router-link v-bind:to="`/users/${user.id}`">
              <img
                v-bind:src="user.profile_pic"
                v-bind:alt="user.name"
                style="object-fit: fill; width: 90px; height: 80px; border: solid 1px #ccc"
              />

              <h4 class="btn btn-light btn-lg">{{ user.name }} @{{ user.username }}</h4>
            </router-link>
            <div class="post-meta mb-4">
              <span class="date">{{ user.sun }}</span>
              <span class="mx-1">&bullet;</span>
              <span>{{ user.moon }}</span>
              <span class="mx-1">&bullet;</span>
              <span>{{ user.rising }}</span>
            </div>
          </div>
        </h2>
      </div>
    </div>
  </div>
</template>

<style></style>
