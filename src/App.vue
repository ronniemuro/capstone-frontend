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
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/signup" v-if="!isLoggedIn">Sign Up</router-link>
    |
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    |
    <router-link to="/logout" v-if="isLoggedIn">Logout</router-link>
    |
    <router-link to="/posts">Feed</router-link>
    |
    <router-link to="/posts/new">New Post</router-link>
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
