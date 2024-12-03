<template>
  <div class="container">
    <div class="container__title" v-if="content && content[0]?.title">
      {{ content[0].title }}
    </div>
    <div class="doctor-slider">
      <swiper
        ref="swiper"
        :slides-per-view="slidesPerView"
        :slides-per-group="slidesPerGroup"
        :space-between="spaceBetween"
        :loop="false"
        :centered-slides="centeredSlides"
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
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="doctor-slider__item"
          >
            <div class="doctor-slider__item-photo">
              <img :src="item.image" />
            </div>
            <div class="doctor-slider__item-name">
              {{ item.name }}
            </div>
          </a>
        </swiper-slide>
      </swiper>
      <div
        v-if="showIndicators"
        class="slider-indicators indicators_under"
        :class="indicatorPosition"
      >
        <div class="slider-indicators__container indicators__container_blue">
          <div
            v-for="(item, index) in Math.ceil(
              content[0]['items'].length / slidesPerGroup
            )"
            :key="index"
            class="indicator"
            :class="{ active: index === currentSlide / slidesPerGroup }"
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
      validator: (value) => ["mainSlider", "doctorSlider"].includes(value),
    },
  },

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      spaceBetween: 24,
      currentSlide: 0,
      showIndicators: true,
      swiperInstance: null,
      slidesPerView: 3,
      slidesPerGroup: 3,
      centeredSlides: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateSwiperSettings);
    this.updateSwiperSettings();

    this.$nextTick(() => {
      if (this.swiperInstance) {
        this.currentSlide = this.swiperInstance.realIndex;
        console.log(this.currentSlide);
      }
    });
    if (!this.content || !this.content[0]) {
      console.error("content или первый элемент массива не найден");
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSwiperSettings);
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
      }
    },
    goToSlide(index) {
      const slideIndex = index * this.slidesPerGroup;
      this.swiperInstance.slideToLoop(slideIndex);
      this.currentSlide = slideIndex;
    },
    updateSwiperSettings() {
      if (window.innerWidth <= 860) {
        this.slidesPerView = 1;
        this.slidesPerGroup = 1;
        this.spaceBetween = 12;
        this.centeredSlides = true;
      } else {
        this.slidesPerView = 3;
        this.slidesPerGroup = 3;
        this.spaceBetween = 24;
        this.centeredSlides = false;
      }
      if (this.swiperInstance) {
        this.swiperInstance.update();
      }
    },
  },
};
</script>

<style lang="scss">
.slider-slide.doctorSlider {
  width: auto;
}

.doctor-slider {
  position: relative;
  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--pc-margin);
    flex-wrap: nowrap;
    align-items: center;
  }
  &__item-photo {
    width: 100%;
    height: 600px;
    border-radius: var(--rounding);
    overflow: hidden;
  }
  &__item-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }
  &__item-name {
    font-family: var(--font2);
    font-weight: 700;
    font-size: var(--text-grid-size);
    line-height: 120%;
    text-align: center;
    color: var(--black);
  }
}

@media screen and (max-width: 1400px) {
  .slider-slide.doctorSlider {
    width: 364px;
  }
  .doctor-slider__item-photo {
    height: 525px;
  }
}
@media screen and (max-width: 1200px) {
  .slider-slide.doctorSlider {
    width: 304px;
  }
  .doctor-slider__item-photo {
    height: 438px;
  }
}
@media screen and (max-width: 1120px) {
  .slider-slide.doctorSlider {
    width: 250px;
  }
  .doctor-slider__item-photo {
    height: 330px;
  }
}
@media screen and (max-width: 900px) {
  .doctor-slider__item-name {
    font-size: var(--mob-text-grid-size);
  }
}
@media screen and (max-width: 860px) {
  .indicators__container_blue {
    padding: var(--mob-margin);
  }

  .slider-slide.doctorSlider {
    width: 100%;
  }
  .doctor-slider__item-photo {
    height: 566px;
  }
}
</style>
