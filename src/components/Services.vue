<template>
  <div class="container">
    <div class="container__title">{{ data.title }}</div>
    <div class="container__grid">
      <div
        class="container__grid-item"
        v-for="(item, index) in data.items"
        :key="index"
      >
        <img :src="item.image" :alt="item.text" />
        <div class="container__grid-item-text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--pc-margin);

  .container__grid-item {
    display: flex;
    flex-direction: column;
    border-radius: var(--rounding);
    height: 220px;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--photo-mask);
      z-index: 1;
    }

    img {
      width: 100%;
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.4);
    }
  }

  .container__grid-item-text {
    position: absolute;
    font-family: var(--font2);
    font-weight: 700;
    font-size: var(--text-grid-size);
    line-height: 120%;
    color: var(--white);
    left: 32px;
    bottom: 24px;
    z-index: 2;
  }
}
@media (max-width: 1200px) {
  .container__grid {
    gap: var(--mob-margin);
    .container__grid-item-text {
      left: 8px;
      bottom: 12px;
    }
  }
}
@media (max-width: 1100px) {
  .container__grid {
    grid-template-columns: repeat(2, 1fr);
    .container__grid-item-text {
      font-size: var(--mob-text-grid-size);
    }

    .container__grid-item:nth-child(5n) {
      grid-column: span 2 / span 2;
      grid-row: span 2 / span 2;
    }
  }
}

@media (max-width: 750px) {
  .container__grid-item {
    height: 170px;
  }
}
</style>
