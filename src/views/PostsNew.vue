<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newPostParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      axios
        .post("/posts.json", this.newPostParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/posts");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <div class="new-post">
    <main id="main">
      <section id="contact" class="contact mb-5">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-sm text-center mb-3">
              <h3>New Post</h3>
            </div>
          </div>

          <div class="row gy-4">
            <div class="col-md-4">
              <div class="info-item">
                <i class="bi bi-sun-fill"></i>
                <h3>CORE SELF</h3>
                <address>Ego, personality, life path, surface desires, self-image.</address>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="col-md-4">
              <div class="info-item info-item-borders">
                <i class="bi bi-moon-fill"></i>
                <h3>INNER SELF</h3>
                <p><a href="tel:+155895548855">Emotions, insecurities, fears, dreams.</a></p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="col-md-4">
              <div class="info-item">
                <i class="bi bi-arrow-up"></i>
                <h3>OUTER SELF</h3>
                <p><a href="mailto:info@example.com">External mask, intuition, moral code, life approach.</a></p>
              </div>
            </div>
            <!-- End Info Item -->
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
                  <select class="form-select" id="floatingSelectGrid" v-model="newPostParams.sign_type">
                    <option value="Sun">Sun</option>
                    <option value="Moon">Moon</option>
                    <option value="Rising">Rising</option>
                  </select>
                  <label for="floatingSelectGrid">Which of the Big 3?</label>
                </div>
                <div class="form-floating col-md-6">
                  <select class="form-select" v-model="newPostParams.sign" id="floatingSelectGrid">
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
                  font-size="4rem"
                  rows="4"
                  placeholder="How are the planets aligning for you today?"
                  v-model="newPostParams.post_content"
                ></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Posted!</div>
              </div>
              <div class="text-center"><button type="submit" value="Create">Post</button></div>
            </form>
          </div>
          <!-- End Contact Form -->
        </div>
      </section>
    </main>
  </div>
</template>

<style>
.new-post {
  padding-top: 0px;
}
</style>
