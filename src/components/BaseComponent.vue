<template>
  <div class="container" data-aos="fade-up">
    <div class="container__title" v-if="data.title">{{ data.title }}</div>
    <div class="container__two-row">
      <div class="container__two-content">
        <div class="container__two-text">
          <p v-html="data.paragraph1"></p>
          <div class="container__bubble" v-if="data.bubbleTags">
            <div
              v-for="(tag, index) in data.bubbleTags"
              :key="index"
              class="container__bubble-item"
            >
              {{ tag }}
            </div>
          </div>
          <p v-html="data.paragraph2"></p>
          <p v-html="data.paragraph3"></p>
          <p v-html="data.paragraph4"></p>
          <div v-html="data.list"></div>
        </div>
        <div v-if="showButtons" class="container__buttons">
          <BaseButton size="large" variant="blue-filled"
            >Записаться в клинику</BaseButton
          >
          <BaseButton size="large" variant="blue-outline">Подробнее</BaseButton>
        </div>
      </div>
      <div class="container__two-img">
        <img :src="data.imgLink" alt="Image" v-if="data.imgLink" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
export default {
  name: "BaseComponent",
  components: {
    BaseButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    showButtons: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.container__two-row {
  display: flex;
  gap: var(--pc-margin);
  min-height: 420px;
}
.container__two-content {
  font-family: var(--font1);
  font-weight: 300;
  font-size: var(--text-size);
  line-height: 140%;
  color: var(--black);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  max-width: 746px;
}
.container__buttons {
  display: flex;
  flex-direction: row;
}
.container__two-img {
  /* min-width: 526px; */
  min-width: 40%;
  min-height: 354px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}
.container__two-img img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  object-position: center;
}
.container__bubble {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  margin-top: 6px;
}
.container__bubble-item {
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: var(--black);
  border-radius: 12px;
  padding: 8px 16px;
  background-color: var(--bubble-fill);
  display: inline-flex;
}
.container span {
  font-weight: 700;
  color: var(--blue);
}

@media screen and (max-width: 1100px) {
  /* .container__two-img {
    max-width: 400px;
  } */
}
@media screen and (max-width: 900px) {
  .container__two-img {
    min-width: 100%;
    min-height: 300px;
  }
  .container__two-row {
    display: flex;
    flex-direction: column-reverse;
  }
  .container__two-content{
    min-width: 100%;
  }
}
@media screen and (max-width: 700px) {
  .container__two-img {
    /* min-width: 100%; */
    min-height: 200px;
  }
}
@media screen and (max-width: 450px) {
  .container__buttons {
    display: flex;
    flex-direction: column;
  }
}
</style>
