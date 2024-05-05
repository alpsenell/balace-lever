<template>
  <div :style="figureStyles" :class="['falling-figure', figure.shape]">
    <span class="figure-weight">
      {{figure.weight + 'kg'}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AFallingFigure',
  props: {
    figure: {
      type: Object,
      default: () => {},
      required: true
    },
    rightSideFigure: {
      type: Boolean,
      default: false
    },
    isOnBoard: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    figureStyles () {
      return {
        width: `${this.figure.size}px`,
        height: `${this.figure.size}px`
      }
    }
  },
  mounted () {
    this.setFigureColor();
    this.updateFigurePosition(this.figure.leftPosition);
  },
  watch: {
    'figure.leftPosition' (newPosition) {
      this.updateFigurePosition(newPosition);
    }
  },
  methods: {
    updateFigurePosition (left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.rightSideFigure ? 50 : 0;

      this.$el.style.left = (this.rightSideFigure && left > 25)
        ? `calc(${start + left}% - ${width}px)`
        : `${start + left}%`;
    },
    setFigureColor () {
      const { color } = this.figure;

      this.figure.shape === 'triangle' ? this.$el.style.borderBottomColor = color : this.$el.style.backgroundColor = color;

      if (this.isOnBoard) {
        this.$el.style.transform += 'translateY(-100%)';
      }
    }
  },

}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.falling-figure {
  z-index: 1;
  position: absolute;
  transition: left 100ms ease-in;
  display: flex;
  justify-content: center;
  align-items: center;

  .figure-weight {
    color: $white-color;
    font-size: 12px;
  }

  &.square {
    border-radius: 5px;
  }

  &.circle {
    border-radius: 50%;
  }

  &.triangle {
    width: 0;
    height: 0;
    border-bottom: 60px solid;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;

    .figure-weight {
      margin: 0 auto;
      position: relative;
      top: 35px;
    }
  }
}
</style>
