<script>
import axios from "axios";
export default {
  data: function () {
    return {
      post: {},
      likes: [],
      comments: [],
      newCommentParams: {
        post_id: this.$route.params.id,
      },
      newLikeParams: {
        post_id: this.$route.params.id,
      },
      errorStatus: null,
      isLiked: false,
      isSingularComment: 1,
    };
  },
  created: function () {
    axios.get("/posts/" + this.$route.params.id + ".json").then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.likes = response.data.likes;
      const filteredLikes = this.likes.filter((like) => like.user_id == this.getUserId());
      if (filteredLikes.length > 0) {
        this.isLiked = true;
      }
      console.log(response.data.comments);
      this.comments = response.data.comments;
    });
    console.log(this.$parent);
  },
  methods: {
    likesToPlural: function () {
      if (this.post.likes.length === 1) {
        return "Like";
      } else {
        return "Likes";
      }
    },
    destroyPost: function () {
      axios.delete("/posts/" + this.post.id + ".json").then((response) => {
        console.log("Successfully deleted", response);
        this.$router.push("/posts");
      });
    },
    redirectToShow: function () {
      this.$router.push("/posts");
    },
    redirectToEdit: function () {
      this.$router.push(`/posts/${this.post.id}/edit`);
    },
    redirectToFeed: function () {
      this.$router.push("/posts");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    submitComment: function () {
      axios
        .post("/comments.json", this.newCommentParams)
        .then((response) => {
          console.log(response.data);
          this.comments.push(response.data);
          this.newCommentParams.comment = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.status);
          this.errorStatus = error.response.status;
        });
    },
    submitLike: function () {
      axios.post("/likes.json", this.newLikeParams).then((response) => {
        console.log(response.data);
        this.likes.push(response.data);
        this.newLikeParams = null;
        this.isLiked = true;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div data-aos="fade-up">
      <h4>
        <p><button type="button" class="btn btn-light" v-on:click="redirectToFeed()">Back to feed..</button></p>
        <img
          v-bind:src="post.user.profile_pic"
          v-bind:alt="post.user.name"
          style="object-fit: fill; width: 90px; height: 80px; border: solid 1px #ccc"
        />
        <router-link v-bind:to="`/users/${post.user.id}`" class="btn btn-light btn-lg">
          {{ post.user.name }} @{{ post.user.username }}
        </router-link>
      </h4>

      <h3>{{ post.post_content }}</h3>
      <h4>{{ post.sign_type }}: {{ post.sign }}</h4>
      <div class="d-block mt-4 text-uppercase col-12">
        <p class="mb-0">
          <button v-on:click="submitLike()" v-bind:disabled="isLiked" class="btn btn-outline-dark">♥</button>
          {{ post.likes.length }} {{ likesToPlural() }}
        </p>
      </div>
      <div v-if="getUserId() == post.user.id" class="col-sm">
        <button v-on:click="redirectToEdit()" class="btn btn-outline-dark">Edit Post</button>
        <button v-on:click="destroyPost()" class="btn btn-outline-danger">Delete Post</button>
      </div>
      <div class="row justify-content-center mt-1">
        <div class="col-md-3">
          <div class="row">
            <form id="myForm" v-on:submit.prevent="submitComment()">
              <div class="col-12 mb-3">
                <label for="comment-message"></label>
                <textarea
                  class="form-control"
                  id="comment-message"
                  placeholder="Comment"
                  cols="20"
                  rows="1"
                  v-model="newCommentParams.comment"
                ></textarea>
              </div>
              <div class="d-block mb-3 text-uppercase col-12">
                <input type="submit" class="btn btn-primary" value="Post comment" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <p>{{ post.comments.length }} {{ post.comments.length == isSingularComment ? "Comment:" : "Comments:" }}</p>

      <div v-for="comment in comments" v-bind:key="comment.id" class="d-flex mb-4 justify-content-center">
        <div class="comment d-flex">
          <div class="flex-shrink-0">
            <div class="avatar avatar-sm rounded-circle">
              <img class="avatar-img" v-bind:src="comment.user.profile_pic" v-bind:alt="comment.user.name" />
            </div>
          </div>
          <div class="flex-shrink-1 ms-2 ms-sm-3">
            <div class="comment-meta d-flex">
              <h6 class="me-2">{{ comment.user.name }} @{{ comment.user.username }}</h6>
            </div>
            <div class="comment-body">
              {{ comment.comment }}
            </div>
            <span class="text-muted">{{ comment.user.created_at }}</span>
          </div>
        </div>
      </div>

      <!-- <form id="myForm" v-on:submit.prevent="submitComment()">
      <div>
        <label>Comment:</label>
        <input type="text" />
        <input type="submit" value="Post" />
      </div>
    </form> -->

      <!-- End Comments Form -->
    </div>
  </div>
</template>

<style></style>
