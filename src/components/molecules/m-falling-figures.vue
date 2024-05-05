<template>
  <div id="falling-wrapper">
    <a-falling-figure
      v-for="figure in fallingFigures"
      :id="`figure-${figure.id}`"
      :key="figure.id"
      :figure="figure"
      :isOnBoard="false"
      class="falling-figure"
    />
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import AFallingFigure from "@/components/atoms/a-falling-figure";
import { GAME_STATUS_PLAY } from "@/constants/constants";

export default {
  name: 'AFallingFigures',
  components: {
    AFallingFigure,
  },
  data () {
    return {
      teeter: null,
      fallingFigureTop: 0,
      fallingInterval: null,
      topLimit: 0
    }
  },
  mounted () {
    window.addEventListener('keydown', this.moveFigure);
    this.teeter = document.getElementById('falling-wrapper');
    this.startFalling();
    this.calculateLimitBottom();
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.moveFigure);
    clearInterval(this.fallingInterval);
  },
  watch: {
    gameStatus (newStatus) {
      if (newStatus === GAME_STATUS_PLAY) {
        window.addEventListener('keydown', this.moveFigure);
        this.startFalling();
      } else {
        clearInterval(this.fallingInterval);
        window.removeEventListener('keydown', this.moveFigure);
      }
    }
  },
  computed: {
    ...mapState(['fallingFigures', 'gameStatus', 'fallingSpeed']),
    ...mapGetters(['teeterAngle']),
    fallingFigure () {
      return this.fallingFigures[0]
    },
    $fallingFigureEl () {
      if (this.fallingFigure) {
        return document.getElementById('figure-' + this.fallingFigures[0].id);
      }
      return null
    },
    $fallingWrapperEl () {
      return document.getElementById('falling-wrapper');
    }
  },
  methods: {
    ...mapActions(['touchTeeterTotter', 'moveFallingFigure', 'setFallingSpeed']),
    nextFigure () {
      const fallingFigure = this.$fallingFigureEl.getBoundingClientRect();
      const fallingWrapper = this.$fallingWrapperEl.getBoundingClientRect();
      const newLeft = ((fallingFigure.left - fallingWrapper.left - Math.tan(this.teeterAngle * Math.PI / 180) * fallingFigure.width) * 100) / fallingWrapper.width;

      this.fallingFigureTop = 0;

      this.setFallingSpeed(this.fallingSpeed + 1.5);
      this.touchTeeterTotter(newLeft);
      this.startFalling();
      this.calculateLimitBottom();
    },
    calculateLimitBottom () {
      const fallingFigure = this.$fallingFigureEl.getBoundingClientRect();
      const fallingWrapper = this.$fallingWrapperEl.getBoundingClientRect();
      const b = fallingWrapper.width / 2 - (fallingFigure.left - fallingWrapper.left);
      const a = Math.tan(this.teeterAngle * Math.PI / 180) * b;

      this.topLimit = fallingWrapper.height - a - fallingFigure.height;
    },
    clearExistingInterval (){
      if (this.fallingInterval) clearInterval(this.fallingInterval)
    },
    startFalling () {
      this.clearExistingInterval()

      this.fallingInterval = setInterval(() => {
        if (this.fallingFigureTop > this.topLimit) {
          clearInterval(this.fallingInterval);
          this.fallingInterval = null;
          this.nextFigure();
        }
        else {
          this.fallingFigureTop += 1;
          this.$fallingFigureEl.style.top = `${this.fallingFigureTop}px`;
        }
      }, 20 / this.fallingSpeed)
    },
    moveFigure (event) {
      if (event.keyCode !== 39 && event.keyCode !== 37)
        return;

      const { leftPosition } = this.fallingFigure;
      const wrapperWidth = this.$fallingWrapperEl.getBoundingClientRect().width;
      const figureWidth = this.$fallingFigureEl.getBoundingClientRect().width;
      const fraction = figureWidth / wrapperWidth * 100;

      if (event.keyCode === 39 && (leftPosition + fraction) > 49) return;
      if (event.keyCode === 37 && leftPosition < 1) return;

      this.calculateLimitBottom();

      const amount = event.keyCode === 39 ? 2 : -2;
      this.moveFallingFigure(amount)
    }
  },
}
</script>

<style lang="scss" scoped>
#falling-wrapper {
  height: 50vh;
  position: relative;
}
</style>
