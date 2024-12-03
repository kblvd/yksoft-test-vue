<template>
  <div class="container large" data-aos="fade-up">
    <div class="container__title" v-if="content && content[0]?.title">
    </div>
    <div class="custom-slider">
      <swiper
        ref="swiper"
        :slides-per-view="'auto'"
        :space-between="spaceBetween"
        :loop="true"
        :centered-slides="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
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
          <div class="custom-slider__item" >
            <img :src="item.image" class="custom-slider__item-photo" />
            <div class="custom-slider__cover"></div>
            <div class="custom-slider__item-content">
              <div class="custom-slider__item-content__tag">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 9H16.5C24.232 9 30.5 15.268 30.5 23H16.5C8.76801 23 2.5 16.732 2.5 9Z"
                    fill="white"
                  />
                </svg>
                {{ item.tag }}
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.5 9H16.5C8.76801 9 2.5 15.268 2.5 23H16.5C24.232 23 30.5 16.732 30.5 9Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                class="custom-slider__item-content__title"
                v-html="item.title"
              ></div>
              <div
                class="custom-slider__item-content__price"
                v-html="item.price"
              ></div>
              <BaseButton size="large" variant="white-filled"
                >Записаться на сеанс</BaseButton
              >
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div
        v-if="showIndicators"
        class="slider-indicators"
        :class="indicatorPosition"
      >
        <div class="slider-indicators__container">
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
import BaseButton from "./base/BaseButton.vue";
import { Autoplay } from "swiper";

export default {
  props: {
    content: Object,
    sliderType: {
      type: String,
      default: "mainSlider",
      validator: (value) =>
        [
          "mainSlider",
          "doctorSlider",

        ].includes(value),
    },
  },

  components: {
    BaseButton,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
  data() {
    return {
      spaceBetween: 24,
      currentSlide: 0,
      showIndicators: true,
      swiperInstance: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateSpaceBetween);
    this.updateSpaceBetween();

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
    window.removeEventListener("resize", this.updateSpaceBetween);
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
      this.swiperInstance.slideToLoop(index);
      this.currentSlide = index;
    },
    updateSpaceBetween() {
      if (window.innerWidth < 860) {
        this.spaceBetween = 12;
      } else {
        this.spaceBetween = 24;
      }
    },
  },
};
</script>

<style lang="scss">
.container.normal {
  width: "";
}
.container.large {
  min-width: 100vw;
  box-sizing: border-box;
  padding: 0;
}

.custom-slider {
  position: relative;
  &__item {
    border-radius: var(--rounding);
    overflow: hidden;
    height: inherit;
  }
  &__cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--slider-mask);
    z-index: 2;
    overflow: hidden;
    border-radius: var(--rounding);
  }
  &__item-photo {
    object-fit: cover;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  &__item-content {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    gap: 16px;
    width: 900px;
    box-sizing: border-box;
    padding: 0 40px;
    &__tag {
      font-family: var(--font2);
      font-weight: 700;
      font-size: var(--text-grid-size);
      line-height: 120%;
      text-align: center;
      color: var(--white);
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
    }
    &__title {
      font-family: var(--font2);
      font-weight: 700;
      font-size: 64px;
      line-height: 120%;
      text-align: center;
      color: var(--white);
    }
    &__price {
      font-family: var(--font2);
      font-weight: 700;
      font-size: var(--pc-title-size-small);
      line-height: 120%;
      text-align: center;
      color: var(--white);
      span {
        text-decoration: line-through;
        color: var(--discount-price);
      }
    }
  }
}

.slider-slide.mainSlider {
  width: var(--xxl-trigger);
  height: 640px;
}

@media screen and (max-width: 1400px) {
  .slider-slide.mainSlider {
    width: var(--xl-trigger) !important;
  }
}
@media screen and (max-width: 1200px) {
  .slider-slide.mainSlider {
    width: var(--l-trigger) !important;
  }
}
@media screen and (max-width: 1120px) {
  .slider-slide.mainSlider{
    width: var(--m-trigger) !important;
  }

  .custom-slider {
    &__item-content {
      width: 100%;
      &__tag {
        font-size: var(--text-grid-size);
      }

      &__title {
        font-size: var(--pc-title-size);
      }

      &__price {
        font-size: var(--pc-title-size-small);
      }
    }
  }
}
@media screen and (max-width: 860px) {
  .slider-slide.mainSlider {
    width: calc(var(--s-trigger) - var(--mob-padding) * 2) !important;
    height: 566px !important;
  }
  .custom-slider {
    &__item-content {
      padding: 0 20px;
      &__tag {
        font-size: var(--text-size);
      }
      &__tag svg {
        width: 22px;
        height: 22px;
      }
      &__title {
        font-size: 32px;
      }

      &__price {
        font-size: 22px;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .custom-slider__item-content {
    padding: 0 5px;
  }
}
</style>
