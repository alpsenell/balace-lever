<template>
  <div :class="['o-game', {'is-game-over': gameStatus === endStatus}]">
    <m-game-over v-if="gameStatus === endStatus" />
    <div v-else>
      <m-header></m-header>
      <m-falling-items />
      <m-teeter-totter />
      <a-game-info />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MTeeterTotter from "@/components/molecules/o-teeter-totter";
import MFallingItems from "@/components/molecules/m-falling-figures";
import MHeader from "@/components/molecules/m-header";
import MGameOver from "@/components/molecules/m-game-over"
import AGameInfo from "@/components/atoms/a-game-info";
import { GAME_STATUS_CONTINUE, GAME_STATUS_END, GAME_STATUS_PAUSE } from "@/constants/constants";

export default {
  name: 'OGame',
  components: {
    MTeeterTotter,
    MFallingItems,
    MGameOver,
    MHeader,
    AGameInfo
  },
  created () {
    this.startGame();
  },
  computed: {
    ...mapState(['gameStatus']),
    endStatus () {
      return GAME_STATUS_END
    },
    buttonTitle () {
      return this.gameStatus === GAME_STATUS_PAUSE ? GAME_STATUS_CONTINUE : GAME_STATUS_PAUSE
    }
  },
  methods: {
    ...mapActions(['startGame']),
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.o-game {
  margin: $spacer-40 auto 0;
  max-width: 800px;
  min-width: 300px;
  padding: 0 $spacer-base;

  &.is-game-over {
    margin-top: 0;
  }
}
</style>
