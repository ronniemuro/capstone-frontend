<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    isError: function () {
      if (
        this.newUserParams.password?.length < 6 ||
        this.newUserParams.password?.length > 20 ||
        this.newUserParams.password !== this.newUserParams.password_confirmation ||
        this.newUserParams.username?.length > 20
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<template>
  <div class="signup">
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />
        <p v-if="newUserParams.username">
          <small>{{ 20 - newUserParams.username.length }} characters remaining</small>
        </p>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
        <p v-if="newUserParams.password && newUserParams.password.length < 6">
          <small class="text-danger">Must be at least 6 characters</small>
        </p>
        <p v-if="newUserParams.password && newUserParams.password.length > 20">
          <small class="text-danger">Cannot exceed 20 characters</small>
        </p>
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <p v-if="newUserParams.password && newUserParams.password !== newUserParams.password_confirmation">
          <small class="text-danger">Must match password</small>
        </p>
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="url" v-model="newUserParams.profile_pic" />
      </div>
      <div>
        <label>Sun:</label>
        <select name="Sun" v-model="newUserParams.sun">
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
      <div>
        <label>Moon:</label>
        <select name="Moon" v-model="newUserParams.moon">
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
      <div>
        <label>Rising:</label>
        <select name="Rising" v-model="newUserParams.rising">
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
      <input type="submit" value="Submit" v-bind:disabled="isError()" />
    </form> -->
    <section id="contact" class="contact mb-5">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12 text-center mb-3">
            <h2>Welcome to Synastry</h2>
          </div>
        </div>

        <div class="form mt-2">
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
            <div class="row">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  id="name"
                  placeholder="Your Name"
                  required
                  v-model="newUserParams.name"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="Username"
                  required
                  v-model="newUserParams.username"
                />
                <p v-if="newUserParams.username">
                  <small>{{ 20 - newUserParams.username.length }} characters remaining</small>
                </p>
              </div>
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                name="subject"
                id="subject"
                placeholder="Email"
                required
                v-model="newUserParams.email"
              />
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <input
                  type="password"
                  name="name"
                  class="form-control"
                  id="name"
                  placeholder="Password"
                  required
                  v-model="newUserParams.password"
                />
                <p v-if="newUserParams.password && newUserParams.password.length < 6">
                  <small class="text-danger">Must be at least 6 characters</small>
                </p>
                <p v-if="newUserParams.password && newUserParams.password.length > 20">
                  <small class="text-danger">Cannot exceed 20 characters</small>
                </p>
              </div>
              <div class="form-group col-md-6">
                <input
                  type="password"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="Password Confirmation"
                  required
                  v-model="newUserParams.password_confirmation"
                />
                <p v-if="newUserParams.password && newUserParams.password !== newUserParams.password_confirmation">
                  <small class="text-danger">Must match password</small>
                </p>
              </div>
            </div>
            <div class="form-group">
              <input
                type="url"
                class="form-control"
                name="subject"
                id="subject"
                placeholder="Profile Picture"
                required
                v-model="newUserParams.profile_pic"
              />
            </div>
            <div class="row g-1">
              <div class="form-floating col-sm">
                <select class="form-select" id="floatingSelectGrid" required v-model="newUserParams.sun">
                  <option value="" disabled selected>Please choose your Sun sign...</option>
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
                <label for="floatingSelectGrid">Sun</label>
              </div>
              <div class="form-floating col-sm">
                <select class="form-select" id="floatingSelectGrid" required v-model="newUserParams.moon">
                  <option value="" disabled selected>Please choose your Moon sign...</option>
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
                <label for="floatingSelectGrid">Moon</label>
              </div>
              <div class="form-floating col-sm">
                <select class="form-select" id="floatingSelectGrid" required v-model="newUserParams.rising">
                  <option value="" disabled selected>Please choose your Rising sign...</option>
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
                <label for="floatingSelectGrid">Rising</label>
              </div>
            </div>
            <div class="my-3">
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">You are signed up!</div>
            </div>
            <div class="text-center"><button type="submit" v-bind:disabled="isError()">Sign Up</button></div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </section>
  </div>
</template>

<style></style>
