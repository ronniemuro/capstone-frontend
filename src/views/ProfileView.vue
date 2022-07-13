<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: [],
      newRelationshipParams: {
        leader_id: this.$route.params.id,
      },
      isFollowed: false,
      isSingularLike: 1,
      isSingularComment: 1,
      isSingularPost: 1,
      filteredRelationship: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.sortByMostRecentPosts();
      this.filteredRelationship = this.user.follower_relationships.filter(
        (follower_relationship) => follower_relationship.follower_id == this.getUserId()
      );
      console.log(this.filteredRelationship);
      if (this.filteredRelationship.length > 0) {
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
    redirectToEditProfile: function () {
      this.$router.push(`/users/${this.user.id}/edit`);
    },
    submitFollowRelationship: function () {
      axios.post("/relationships.json", this.newRelationshipParams).then((response) => {
        console.log("Followed successfully", response.data);
        this.user.follower_relationships.push(response.data);
        this.isFollowed = true;
        this.filteredRelationship[0] = response.data;
      });
    },
    destroyFollowRelationship: function () {
      axios.delete("/relationships/" + this.filteredRelationship[0].id + ".json").then((response) => {
        console.log("Unfollowed", response);
        this.isFollowed = false;
        this.user.follower_relationships = this.user.follower_relationships.filter((follower_relationship) => {
          return follower_relationship.id !== this.filteredRelationship[0].id;
        });
      });
    },
    destroyPost: function (post) {
      axios.delete("/posts/" + post.id + ".json").then((response) => {
        console.log("Successfully deleted", response);
        var postIndex = this.user.posts.indexOf(post);
        this.user.posts.splice(postIndex, 1);
      });
    },
    redirectToEdit: function (post) {
      this.$router.push(`/posts/${post.id}/edit`);
    },
    sortByMostRecentPosts: function () {
      this.user.posts.sort((a, b) => {
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
    <div id="profile-view" class="d-flex justify-content-center" data-aos="fade-up">
      <div class="col-lg-5 text-center mb-5">
        <p class="d-block mb-2 text-uppercase">
          {{ user.posts.length }} {{ user.posts.length == isSingularPost ? "Post" : "Posts" }}
        </p>
        <img v-bind:src="user.profile_pic" class="img-fluid rounded-circle mb-2" style="width: 250px; height: 250px" />
        <h3>{{ user.name }}</h3>
        <h3>@{{ user.username }}</h3>
        <span class="d-block mb-2 text-uppercase">☉: {{ user.sun }} | ☾: {{ user.moon }} | ↑: {{ user.rising }}</span>
        <span class="d-block mb-3 text-lowercase">
          {{ user.leader_relationships.length }} Following | {{ user.follower_relationships.length }}
          {{ followersToPlural() }} | {{ user.likes.length }} {{ likesToPlural() }}
        </span>
        <div class="d-block mb-5 text-uppercase" v-if="getUserId() != user.id">
          <button v-on:click="submitFollowRelationship()" v-if="!isFollowed" class="btn btn-outline-dark">
            Follow
          </button>
          <button v-on:click="destroyFollowRelationship()" v-if="isFollowed" class="btn btn-outline-dark">
            Unfollow
          </button>
        </div>
        <div v-if="getUserId() == user.id" class="col-sm mb-4">
          <button v-on:click="redirectToEditProfile()" class="btn btn-outline-dark">Edit Profile</button>
        </div>
        <!-- <p>
        profile bio
      </p> -->
        <div class="d-block mb-2" v-for="post in user.posts" v-bind:key="post.id">
          <div class="post-entry-1 border-bottom">
            <div class="author mb-0 d-block">
              <img
                v-bind:src="user.profile_pic"
                v-bind:alt="user.name"
                style="object-fit: fill; width: 50px; height: 50px; border: solid 1px #ccc"
              />
              {{ user.name }} @{{ user.username }}
            </div>
            <h2 class="mb-4 mt-0">
              <h5>{{ post.post_content }}</h5>
            </h2>
            <div class="post-meta mb-4">
              <span class="date">{{ post.sign_type }}</span>
              <span class="mx-1">&bullet;</span>
              <span>{{ post.sign }}</span>
            </div>
            <div v-if="getUserId() == user.id" class="col-sm mb-3">
              <button v-on:click="redirectToEdit(post)" class="btn btn-outline-dark btn-sm me-1">Edit Post</button>
              <button v-on:click="destroyPost(post)" class="btn btn-outline-danger btn-sm">Delete Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
