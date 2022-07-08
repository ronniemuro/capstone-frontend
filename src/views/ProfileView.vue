<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: [],
      posts: [],
      likes: [],
      follower_relationships: [],
      leader_relationships: [],
      newRelationshipParams: {
        leader_id: this.$route.params.id,
      },
      isFollowed: false,
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.posts = response.data.posts;
      this.likes = response.data.likes;
      this.follower_relationships = response.data.follower_relationships;
      this.leader_relationships = response.data.leader_relationships;
      const filteredFollowed = this.follower_relationships.filter(
        (follower_relationship) => follower_relationship.follower_id == this.getUserId()
      );
      if (filteredFollowed.length > 0) {
        this.isFollowed = true;
      }
    });
  },
  methods: {
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    likesToPlural: function () {
      if (this.user.likes.length === 1) {
        return "Like";
      } else {
        return "Likes";
      }
    },
    followersToPlural: function () {
      if (this.user.follower_relationships.length === 1) {
        return "Follower";
      } else {
        return "Followers";
      }
    },
    submitFollow: function () {
      axios.post();
    },
    submitFollowRelationship: function () {
      axios.post("/relationships.json", this.newRelationshipParams).then((response) => {
        console.log(response.data);
        this.follower_relationships.push(response.data);
        this.leader_relationships.push(response.data);
        this.isFollowed = true;
      });
    },
  },
};
</script>

<template>
  <div class="home"></div>
  <p>{{ user.posts.length }} Posts</p>
  <h2>
    <img
      v-bind:src="user.profile_pic"
      v-bind:alt="user.name"
      style="object-fit: fill; width: 100px; height: 100px; border: solid 1px #ccc"
    />
    {{ user.name }}
  </h2>
  <h3>@{{ user.username }}</h3>
  <div v-if="getUserId() != user.id">
    <button v-on:click="submitFollowRelationship()" v-bind:disabled="isFollowed">
      {{ isFollowed ? "Following" : "Follow" }}
    </button>
  </div>
  <p>☉: {{ user.sun }} ☾: {{ user.moon }} ↑: {{ user.rising }}</p>
  <p>
    {{ user.leader_relationships.length }} Following | {{ user.follower_relationships.length }}
    {{ followersToPlural() }} | {{ user.likes.length }} {{ likesToPlural() }}
  </p>
  <div v-for="post in posts" v-bind:key="post.id">
    <h4>
      <img
        v-bind:src="user.profile_pic"
        v-bind:alt="user.name"
        style="object-fit: fill; width: 60px; height: 50px; border: solid 1px #ccc"
      />
      {{ user.name }} @{{ user.username }}
    </h4>
    <p>{{ post.post_content }}</p>
    <p>{{ post.sign_type }}: {{ post.sign }}</p>
  </div>
</template>

<style></style>
