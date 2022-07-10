<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <section id="hero-slider" class="hero-slider mt-4 mb-5">
      <div class="container-md" data-aos="fade-in">
        <div class="row">
          <div class="col-12">
            <div class="swiper sliderFeaturedPosts">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <a
                    href="/signup"
                    class="img-bg d-flex align-items-end"
                    style="background-image: url('assets/img/synastry3.jpg')"
                  >
                    <div class="img-bg-inner">
                      <h2>Synastry (n)</h2>
                      <p>
                        : comparison between the natal charts of two or more people in order to determine their likely
                        compatibility and relationship.
                      </p>
                      <p>
                        An app where you can connect with other fellow astrology enthusiasts, and share, discover, and
                        learn more about the 3 main components in your chart.
                      </p>
                    </div>
                  </a>
                </div>

                <div class="swiper-slide">
                  <a
                    href="/signup"
                    class="img-bg d-flex align-items-end"
                    style="background-image: url('assets/img/sun4.jpg')"
                  >
                    <div class="img-bg-inner">
                      <h2>Your Sun Sign</h2>
                      <p>
                        The sun is your identity. It is the essence that you shine out into the world. It represents the
                        vital force that drives you to seek the highest expression of your true self. Your sun sign is
                        how you answer the question “I am” and how you experience life and express your individuality
                      </p>
                    </div>
                  </a>
                </div>

                <div class="swiper-slide">
                  <a
                    href="/signup"
                    class="img-bg d-flex align-items-end"
                    style="background-image: url('assets/img/moon.jpg')"
                  >
                    <div class="img-bg-inner">
                      <h2>Your Moon Sign</h2>
                      <p>
                        The moon is the soul behind your identity. It is the subconscious side of yourself that you
                        typically keep hidden and is the driving force behind your emotional reactions. Your moon sign
                        helps you feel pleasure and pain, joy and sorrow, and gives insight into how you nurture and
                        restore yourself.
                      </p>
                    </div>
                  </a>
                </div>

                <div class="swiper-slide">
                  <a
                    href="/signup"
                    class="img-bg d-flex align-items-end"
                    style="background-image: url('assets/img/rising.jpg')"
                  >
                    <div class="img-bg-inner">
                      <h2>Your Rising Sign</h2>
                      <p>
                        Your rising sign or ascendant is your external self — the "mask" that people see upon meeting
                        you. In addition to characterizing your external self, it also tells the story of skills,
                        talents, and strategies that you'll use as you move through your life path (your sun sign) in
                        pursuit of your most innate desires (your moon sign).
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="custom-swiper-button-next">
                <span class="bi-chevron-right"></span>
              </div>
              <div class="custom-swiper-button-prev">
                <span class="bi-chevron-left"></span>
              </div>

              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
