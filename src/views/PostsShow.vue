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
    destroyPost: function (post) {
      axios.delete("/posts/" + post.id + ".json").then((response) => {
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
    <h4>
      <p><router-link to="/posts">Back..</router-link></p>
      <img
        v-bind:src="post.user.profile_pic"
        v-bind:alt="post.user.name"
        style="object-fit: fill; width: 60px; height: 50px; border: solid 1px #ccc"
      />
      {{ post.user.name }} @{{ post.user.username }}
    </h4>
    <h3>{{ post.post_content }}</h3>
    <h3>{{ post.sign_type }}: {{ post.sign }}</h3>
    <div>
      <p>
        <button v-on:click="submitLike()" v-bind:disabled="isLiked">♥</button>
        {{ post.likes.length }} {{ likesToPlural() }}
      </p>
    </div>

    <p>Comments:</p>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <p>{{ comment.user.name }} @{{ comment.user.username }}</p>
      <p>{{ comment.comment }}</p>
    </div>
    <div v-if="getUserId() == post.user.id">
      <p><button v-on:click="redirectToEdit()">Edit Post</button></p>
      <p><button v-on:click="destroyPost()">Delete Post</button></p>
    </div>
    <form id="myForm" v-on:submit.prevent="submitComment()">
      <div>
        <label>Comment:</label>
        <input type="text" v-model="newCommentParams.comment" />
        <input type="submit" value="Post" />
      </div>
    </form>
  </div>
</template>

<style></style>
