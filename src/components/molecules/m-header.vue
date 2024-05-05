<template>
  <div class="m-header">
    <a-heading
        :heading-text="headingText"
        heading-type="h1"
        class="heading"
    />
    <a-heading
        :heading-text="subheadingText"
        heading-type="h3"
        class="heading"
    />
    <p>Press "Space" to Pause/Play</p>
    <div class="game-control">
      <a-button
          :disabled="gameStatus === endStatus"
          @buttonClicked="toggleGameStatus"
      >
        {{ buttonTitle }}
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { GAME_STATUS_CONTINUE, GAME_STATUS_END, GAME_STATUS_PAUSE, GAME_STATUS_PLAY } from "@/constants/constants";
import AHeading from "@/components/atoms/a-heading";
import AButton from "@/components/atoms/a-button";

export default {
  name: 'MHeader',
  components: {
    AButton,
    AHeading
  },
  computed: {
    ...mapState(['gameStatus']),
    endStatus () {
      return GAME_STATUS_END
    },
    headingText () {
      return 'Welcome to Lever Balance Game!'
    },
    subheadingText () {
      return 'Control weights with arrow keys and try to balance the lever'
    },
    buttonTitle () {
      return this.gameStatus === GAME_STATUS_PAUSE ? GAME_STATUS_CONTINUE : GAME_STATUS_PAUSE
    }
  },
  methods: {
    ...mapActions(['startGame', 'setGameStatus']),
    toggleGameStatus () {
      this.setGameStatus(this.gameStatus === GAME_STATUS_PAUSE ? GAME_STATUS_PLAY : GAME_STATUS_PAUSE)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.heading {
  margin-bottom: $spacer-base;
}

.game-control {
  margin-bottom: $spacer-base;
}
</style>
