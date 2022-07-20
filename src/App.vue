<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      search: "",
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
    runSearch: function () {
      this.$router.push(`/users/search?search=${this.search}`);
    },
  },
};
</script>
<template>
  <div id="app">
    <!-- ======= Header ======= -->
    <header id="header" class="header d-flex align-items-center fixed-top">
      <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" class="logo d-flex align-items-center">
          <!-- Uncomment the line below if you also wish to use an image logo -->
          <!-- <img src="assets/img/zodiac-2.png" alt="" /> -->
          <h1>Synastry</h1>
        </a>
        <nav id="navbar" class="navbar">
          <ul>
            <li v-if="isLoggedIn">
              <a href="/posts">Feed</a>
            </li>
            <li v-if="isLoggedIn"><a href="/posts/new">New Post</a></li>
            <li v-if="isLoggedIn"><router-link v-bind:to="`/users/${getUserId()}`">My Profile</router-link></li>
            <li v-if="isLoggedIn"><a href="/logout">Logout</a></li>
            <li v-if="!isLoggedIn"><a href="/login">Login</a></li>
            <li v-if="!isLoggedIn"><a href="/signup">Sign Up</a></li>
          </ul>
        </nav>
        <!-- .navbar -->
        <div v-show="isLoggedIn">
          <div class="position-relative">
            <a href="" class="mx-2 js-search-open"><span class="bi-search"></span></a>
            <i class="bi bi-list mobile-nav-toggle"></i>

            <!-- ======= Search Form ======= v-bind -->
            <div class="search-form-wrap js-search-form-wrap">
              <form v-on:submit.prevent="runSearch()" class="search-form">
                <span class="icon bi-search"></span>
                <input
                  v-model="search"
                  v-on:keyup.enter="runSearch()"
                  type="text"
                  placeholder="Find New Friends :)"
                  class="form-control"
                />
                <button class="btn js-search-close">
                  <span class="bi-x"></span>
                </button>
              </form>
            </div>
          </div>
          <!-- End Search Form -->
        </div>
      </div>
    </header>
    <!-- End Header -->
    <router-view class="router" v-bind:searchTerm="search" />

    <!-- ======= Footer ======= -->
    <footer id="footer" class="footer">
      <div class="footer-content">
        <div class="container">
          <div class="row g-3">
            <div class="col-lg-4" v-if="!isLoggedIn">
              <h3 class="footer-heading">About Synastry</h3>
              <p>
                Social networking app meant to connect those passionate about astrology. You will be able to connect
                with others based on what they are posting in regards to either their sun, moon, or rising sign. See how
                current astrology and planetary positions might be affecting you and others current life.
              </p>
              <p><a href="/signup" class="footer-link-more">Sign Up</a></p>
              <p><a href="/login" class="footer-link-more">Login</a></p>
            </div>
            <div class="col-6 col-lg-2" v-if="isLoggedIn">
              <h3 class="footer-heading">Navigation</h3>
              <ul class="footer-links list-unstyled">
                <li>
                  <a href="/">
                    <i class="bi bi-chevron-right"></i>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/posts">
                    <i class="bi bi-chevron-right"></i>
                    Feed
                  </a>
                </li>
                <li>
                  <a href="/posts/new">
                    <i class="bi bi-chevron-right"></i>
                    New Post
                  </a>
                </li>
                <li>
                  <i class="bi bi-chevron-right"></i>
                  <router-link v-bind:to="`/users/${getUserId()}`">My Profile</router-link>
                </li>
                <li>
                  <a href="/logout">
                    <i class="bi bi-chevron-right"></i>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <!-- <div class="col-6 col-lg-2">
              <h3 class="footer-heading">Categories</h3>
              <ul class="footer-links list-unstyled">
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Business
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Culture
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Sport
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Food
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Politics
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Celebrity
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Startups
                  </a>
                </li>
                <li>
                  <a href="category.html">
                    <i class="bi bi-chevron-right"></i>
                    Travel
                  </a>
                </li>
              </ul>
            </div> -->

            <!-- <div class="col-lg-4">
              <h3 class="footer-heading">Recent Posts</h3>

              <ul class="footer-links footer-blog-entry list-unstyled">
                <li>
                  <a href="single-post.html" class="d-flex align-items-center">
                    <img src="assets/img/post-sq-1.jpg" alt="" class="img-fluid me-3" />
                    <div>
                      <div class="post-meta d-block">
                        <span class="date">Culture</span>
                        <span class="mx-1">&bullet;</span>
                        <span>Jul 5th '22</span>
                      </div>
                      <span>5 Great Startup Tips for Female Founders</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" class="d-flex align-items-center">
                    <img src="assets/img/post-sq-2.jpg" alt="" class="img-fluid me-3" />
                    <div>
                      <div class="post-meta d-block">
                        <span class="date">Culture</span>
                        <span class="mx-1">&bullet;</span>
                        <span>Jul 5th '22</span>
                      </div>
                      <span>What is the son of Football Coach John Gruden, Deuce Gruden doing Now?</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" class="d-flex align-items-center">
                    <img src="assets/img/post-sq-3.jpg" alt="" class="img-fluid me-3" />
                    <div>
                      <div class="post-meta d-block">
                        <span class="date">Culture</span>
                        <span class="mx-1">&bullet;</span>
                        <span>Jul 5th '22</span>
                      </div>
                      <span>Life Insurance And Pregnancy: A Working Mom’s Guide</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="single-post.html" class="d-flex align-items-center">
                    <img src="assets/img/post-sq-4.jpg" alt="" class="img-fluid me-3" />
                    <div>
                      <div class="post-meta d-block">
                        <span class="date">Culture</span>
                        <span class="mx-1">&bullet;</span>
                        <span>Jul 5th '22</span>
                      </div>
                      <span>How to Avoid Distraction and Stay Focused During Video Calls?</span>
                    </div>
                  </a>
                </li>
              </ul> -->
            <!-- </div> -->
          </div>
        </div>
      </div>

      <div class="footer-legal">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <div class="copyright">
                © Copyright
                <strong><span>Synastry</span></strong>
                . All Rights Reserved
              </div>

              <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ -->
                Designed by
                <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>

            <!-- <div class="col-md-6">
              <div class="social-links mb-3 mb-lg-0 text-center text-md-end">
                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="google-plus"><i class="bi bi-skype"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
              </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.router {
  padding-top: 100px;
}
</style>
