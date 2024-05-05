<template>
  <div>
    <div
      class="teeter"
      :style="teeterStyle"
    >
      <a-falling-figure
        v-for="figure in rightItems"
        :key="figure.id"
        :figure="figure"
        :rightSideFigure="true"
      />

      <a-falling-figure
        v-for="figure in leftItems"
        :key="figure.id"
        :figure="figure"
      />
    </div>
    <div class="base" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AFallingFigure from "@/components/atoms/a-falling-figure";
import { colorGenerator } from "@/helpers";
import { GAME_STATUS_END } from "@/constants/constants";

export default {
  name: 'OTeeterTotter',
  components: {
    AFallingFigure,
  },
  computed: {
    ...mapState(['rightItems', 'leftItems']),
    ...mapGetters(['teeterAngle']),
    teeterStyle () {
      return {
        backgroundColor: colorGenerator(),
        transitionDuration: `${3000 / Math.abs(this.teeterAngle)}ms`,
        transform: `rotate(${this.teeterAngle}deg)`
      }
    }
  },
  watch: {
    teeterAngle (newAngle) {
      if (Math.abs(newAngle) > 30) {
        this.setGameStatus(GAME_STATUS_END)
      }
    }
  },
  methods: {
    ...mapActions(['setGameStatus'])
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.base {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 30px;
  height: 120px;
  background: $teeter-base-color;
  margin: 0 auto;
  position: relative;
}

.teeter {
  height: $teeter-height;
  width: 100%;
  border-radius: 4px;
  transition: 500ms ease-in;
  position: relative;
}
</style>
