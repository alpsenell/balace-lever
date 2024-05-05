<template>
  <div class="a-button">
    <button
      @click="buttonClicked"
      :disabled="disabled"
      class="button"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClicked () {
      this.$emit('buttonClicked')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.button {
  width: $button-width;
  height: $button-height;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  background: $color-black;
  color: $white-color;
  transition: 0.2s;
  text-transform: capitalize;

  &:hover {
    background: $color-grey;
  }
}
</style>
