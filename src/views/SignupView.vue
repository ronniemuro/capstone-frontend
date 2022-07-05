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
    <form v-on:submit.prevent="submit()">
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
    </form>
  </div>
</template>
