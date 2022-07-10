<script>
import axios from "axios";

export default {
  data: function () {
    return {
      post: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/posts/" + this.$route.params.id + ".json").then((response) => {
      console.log(response.data);
      this.post = response.data;
    });
  },
  methods: {
    submit: function () {
      axios
        .patch("/posts/" + this.$route.params.id + ".json", this.post)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/posts/" + this.$route.params.id);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div id="update-post">
    <!-- <form v-on:submit.prevent="submit()">
      <h3>Edit Post</h3>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>How are the planets aligning for you?</label>
        <input type="text" v-model="post.post_content" />
      </div>
      <div>
        <label>Sign Type:</label>
        <select name="Sign" v-model="post.sign_type">
          <option value="Sun">Sun</option>
          <option value="Moon">Moon</option>
          <option value="Rising">Rising</option>
        </select>
      </div>
      <div>
        <label>Sign:</label>
        <select name="Sign" v-model="post.sign">
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
      <input type="submit" value="Update Post" />
    </form> -->
    <section id="contact" class="contact mb-3">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-sm text-center mb-2">
            <h2>Edit Post</h2>
          </div>
        </div>

        <div class="form mt-5">
          <form
            action="forms/contact.php"
            method="post"
            role="form"
            class="php-email-form"
            v-on:submit.prevent="submit()"
          >
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div class="row g-1 mb-4">
              <div class="form-floating col-md-6">
                <select class="form-select" id="floatingSelectGrid" v-model="post.sign_type">
                  <option value="Sun">Sun</option>
                  <option value="Moon">Moon</option>
                  <option value="Rising">Rising</option>
                </select>
                <label for="floatingSelectGrid">Which of the Big 3?</label>
              </div>
              <div class="form-floating col-md-6">
                <select class="form-select" v-model="post.sign" id="floatingSelectGrid">
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
                <label for="floatingSelectGrid">Sign</label>
              </div>
            </div>
            <div class="form-group">
              <textarea
                class="form-control"
                name="message"
                rows="4"
                placeholder="How are the planets aligning for you today?"
                v-model="post.post_content"
              ></textarea>
            </div>
            <div class="my-3">
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">Updated!</div>
            </div>
            <div class="text-center"><button type="submit" value="Create">Update</button></div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </section>
  </div>
</template>

<style>
.update-post {
  padding-top: 0px;
}
</style>
