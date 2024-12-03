<template>
  <div class="container large">
    <div class="container__title" v-if="content && content[0]?.title">
      {{ content[0].title }}
    </div>
    <div class="custom-slider custom-slider-video">
      <swiper
        ref="swiper"
        :slides-per-view="'auto'"
        :space-between="spaceBetween"
        :loop="true"
        :centered-slides="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in content[0]['items']"
          :key="index"
          :class="['slider-slide', sliderType]"
          :style="{ width: sliderWidth }"
        >
          <div class="custom-slider__item">
            <div
              v-if="index === currentSlide && playingSlide === currentSlide"
              class="video-container"
            >
              <iframe
                :src="`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&enablejsapi=1`"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                class="custom-slider__video"
              ></iframe>
            </div>
            <div v-else>
              <img :src="item.image" class="video-slider__item-photo" />
              <div
                class="play-overlay"
                @click="index === currentSlide ? playVideo(index) : null"
              >
                <button class="play-button">
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M84 47.9999C84.0025 49.0185 83.7413 50.0204 83.2419 50.9082C82.7425 51.796 82.0218 52.5394 81.15 53.0662L27.12 86.1187C26.2091 86.6765 25.1658 86.981 24.0978 87.0008C23.0298 87.0205 21.976 86.7549 21.045 86.2312C20.1229 85.7156 19.3548 84.9638 18.8196 84.0529C18.2844 83.1421 18.0015 82.1051 18 81.0487V14.9512C18.0015 13.8947 18.2844 12.8578 18.8196 11.9469C19.3548 11.0361 20.1229 10.2842 21.045 9.76867C21.976 9.24498 23.0298 8.9793 24.0978 8.99908C25.1658 9.01885 26.2091 9.32337 27.12 9.88117L81.15 42.9337C82.0218 43.4604 82.7425 44.2039 83.2419 45.0916C83.7413 45.9794 84.0025 46.9813 84 47.9999Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div
        v-if="showIndicators"
        class="slider-indicators indicators_under indicators_video"
        :class="indicatorPosition"
      >
        <div class="slider-indicators__container indicators__container_blue">
          <div
            v-for="(item, index) in content[0]['items']"
            :key="index"
            class="indicator"
            :class="{ active: index === currentSlide }"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

export default {
  props: {
    content: Object,
    sliderType: {
      type: String,
      default: "mainSlider",
      validator: (value) => ["mainSlider", "videoSlider"].includes(value),
    },
  },
  data() {
    return {
      showIndicators: true,
      currentSlide: 0,
      playingSlide: null,
      spaceBetween: 24,
      slidesPerGroup: 1,
      indicatorPosition: "bottom",
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    onSwiper(swiper) {
      this.swiperInstance = swiper;
      if (this.swiperInstance) {
        this.currentSlide = this.swiperInstance.realIndex;
      }
    },
    onSlideChange() {
      if (this.swiperInstance) {
        this.currentSlide = this.swiperInstance.realIndex;
        this.playingSlide = null;
      }
    },
    goToSlide(index) {
      const slideIndex = index * this.slidesPerGroup;
      this.swiperInstance.slideToLoop(slideIndex);
      this.currentSlide = index;
      this.playingSlide = null;
    },
    playVideo(index) {
      this.playingSlide = index;
    },
  },
};
</script>

<style lang="scss">
.video-slider__item-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  border-radius: var(--rounding);
}
.video-container,
.custom-slider__video {
  width: 100%;
  height: 100%;
}
.custom-slider-video {
  height: 424px;
  position: relative;
}
.indicators_video {
  position: absolute !important;
  bottom: 0;
}
.slider-slide.videoSlider {
  width: 636px;
  height: 281px;
  transition: 0.5s height;
  top: 50%;
  transform: translateY(13%);
}
.swiper-slide-active.videoSlider {
  width: 636px;
  height: 360px;
  transition: 0.5s height;
  top: 0;
  transform: translateY(0);
}
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: var(--slider-mask);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: var(--rounding);
}

.play-button {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 660px) {
  .custom-slider-video {
    height: 239px;
  }
  .slider-slide.videoSlider {
    width: 335px;
    height: 158px;
    transform: translateY(10%);
  }

  .swiper-slide-active.videoSlider {
    width: 335px;
    height: 189px;
    transform: translateY(0%);
  }
}
@media screen and (max-width: 350px) {
  .slider-slide.videoSlider {
    width: 290px;
    height: 158px;
    transform: translateY(10%);
  }

  .swiper-slide-active.videoSlider {
    width: 295px;
    height: 189px;
    transform: translateY(0%);
  }
}
</style>
