<template>
  <button
    :class="['base-button', size, variant, { withIcon: hasIcon }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="hasIcon" class="icon">
      <slot name="icon"></slot>
    </span>
    <span class="text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "normal",
      validator: (value) => ["normal", "large"].includes(value),
    },
    variant: {
      type: String,
      default: "blue-filled",
      validator: (value) =>
        [
          "blue-filled",
          "blue-outline",
          "white-filled",
          "white-outline",
          "green-filled",
        ].includes(value),
    },
    disabled: {
      //вопрос нахуй надо
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //вопрос нахуй надо
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event); // Генерация события клика
      }
    },
  },
};
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex; 
  // display: inline-block;
  align-items: center;
  justify-content: center;
  // height: 40px;
  border: none;
  border-radius: 3px;
  font-family: var(--font1);
  font-size: 13px;
  font-weight: 600;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.7s ease;
  padding: 8px 16px;
  /* width: 100%; */
  // height: 100%;
  white-space: nowrap;
}

/* button size */
.base-button.normal {
  padding: 8px 16px;
}

.base-button.large {
  padding: 8px 48px;
}

/* button color */
.base-button.blue-filled {
  background-color: var(--blue);
  color: var(--white);
  span{
    color: var(--white);
  }
}

.base-button.blue-filled:hover {
  background-color: var(--white);
  color: var(--blue);
  box-shadow: inset 0 0 0 1px var(--blue);
  span{
    color: var(--blue);
  }
}

.base-button.blue-outline {
  background-color: transparent;
  color: var(--blue);
  box-shadow: inset 0 0 0 1px var(--blue);
  span{
    color: var(--blue);
  }
}

.base-button.blue-outline:hover {
  color: var(--white);
  background-color: var(--blue);
  span{
    color: var(--white);
  }
}

.base-button.white-filled {
  background-color: var(--white);
  color: var(--black);
  span{
    color: var(--black);
  }
}

.base-button.white-filled:hover {
  background-color: transparent;
  color: var(--white);
  box-shadow: inset 0 0 0 1px var(--white);
  span{
    color: var(--white);
  }
}

.base-button.white-outline {
  background-color: transparent;
  color: var(--white);
  box-shadow: inset 0 0 0 1px var(--white);
  span{
    color: var(--white);
  }
}

.base-button.white-outline:hover {
  background-color: var(--white);
  color: var(--black);
  span{
    color: var(--black);
  }
}

.base-button.green-filled {
  background-color: var(--green);
  color: var(--white);
  span{
    color: var(--white);
  }
}

.base-button.green-filled:hover {
  background-color: var(--green-white);
}

/* button icon */
.base-button.withIcon {
  gap: 8px;
}

.base-button .icon {
  display: flex;
  align-items: center;
}

.base-button .text {
  display: inline-block;
}

.base-button:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  border: none;
}

</style>
