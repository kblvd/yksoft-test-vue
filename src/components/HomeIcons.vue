<template>
  <div class="container" data-aos="zoom-in">
    <div v-if="showTitle" class="container__title">{{ data.title }}</div>
    <div class="home-icons">
      <div
        :class="['home-icons__item', size]"
        v-for="(tag, index) in data.items"
        :key="index"
      >
        <div class="home-icons__item-img">
          <img :src="tag.image" />
        </div>
        <div class="home-icons__item-text">
          {{ tag.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    showTitle: {
      type: Boolean,
      required: true, 
    },
    size: {
      type: String,
      default: "normal",
      validator: (value) => ["normal", "large"].includes(value),
    },
  },
};
</script>

<style scoped lang="scss">
.container__title{
    font-size: var(--pc-title-size-small);
}
.home-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--pc-margin);
  &__item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 240px;
  }
  &__item-img {
    display: flex;
    justify-content: center;
  }
  &__item-text {
    font-family: var(--font2);
    font-weight: 600;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    color: var(--black);
  }
}
.home-icons__item.large{
  max-width: 416px;
}
@media screen and (max-width: 1300px) {
  .home-icons {
    &__item {
      max-width: 360px;
    }
    &__item.large{
      max-width: 360px;
    }
  }
}
@media screen and (max-width: 750px) {
  .home-icons, .home-icons.large {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--mob-margin);
    &__item, &__item.large {
      max-width: 100%;
      display: flex;
      flex-direction: row;
    }
    &__item-text {
      display: flex;
      align-items: center;
      text-align: start;
      font-size: var(--mob-text-size);
    }
  }
}
</style>
