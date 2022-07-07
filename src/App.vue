<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  methods: {
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
<template>
  <nav>
    <div v-if="!isLoggedIn">
      <router-link to="/signup">Sign Up</router-link>
      |
    </div>
    <div v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
      |
    </div>
    <div v-if="isLoggedIn">
      <router-link to="/posts">Feed</router-link>
      |
    </div>
    <div v-if="isLoggedIn">
      <router-link to="/posts/new">New Post</router-link>
      |
    </div>
    <div v-if="isLoggedIn">
      <router-link v-bind:to="`/users/${getUserId()}`">My Profile</router-link>
    </div>
    <div v-if="isLoggedIn">
      <router-link to="/logout">Logout</router-link>
      |
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
