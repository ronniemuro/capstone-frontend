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
      isSingularLike: 1,
      isSingularComment: 1,
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
  <div class="home">
    <div id="profile-view" class="d-flex justify-content-center" data-aos="fade-up">
      <div class="col-lg-4 text-center mb-5">
        <p class="d-block mb-2 text-uppercase">{{ user.posts.length }} Posts</p>
        <img v-bind:src="user.profile_pic" class="img-fluid rounded-circle w-50 mb-4 width: 100px; height: 100px" />
        <h4>{{ user.name }}</h4>
        <h4>@{{ user.username }}</h4>
        <span class="d-block mb-2 text-uppercase">☉: {{ user.sun }} ☾: {{ user.moon }} ↑: {{ user.rising }}</span>
        <span class="d-block mb-3 text-lowercase">
          {{ user.leader_relationships.length }} Following | {{ user.follower_relationships.length }}
          {{ followersToPlural() }} | {{ user.likes.length }} {{ likesToPlural() }}
        </span>
        <div class="d-block mb-5 text-uppercase" v-if="getUserId() != user.id">
          <button v-on:click="submitFollowRelationship()" v-bind:disabled="isFollowed">
            {{ isFollowed ? "Following" : "Follow" }}
          </button>
        </div>
        <!-- <p>
        profile bio
      </p> -->
        <div class="d-block mb-3" v-for="post in posts" v-bind:key="post.id">
          <div class="post-entry-1 border-bottom pt-3">
            <div class="author mb-0 d-block">
              <img
                v-bind:src="user.profile_pic"
                v-bind:alt="user.name"
                style="object-fit: fill; width: 60px; height: 50px; border: solid 1px #ccc"
              />
              {{ user.name }} @{{ user.username }}
            </div>
            <h2 class="mb-4">
              <h5>{{ post.post_content }}</h5>
            </h2>
            <div class="post-meta mb-4">
              <span class="date">{{ post.sign_type }}</span>
              <span class="mx-1">&bullet;</span>
              <span>{{ post.sign }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
