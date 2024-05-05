<template>
  <div id="app">
    <o-game/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OGame from '@/components/organisms/o-game'
import { GAME_STATUS_PAUSE, GAME_STATUS_PLAY } from "@/constants/constants";

export default {
  name: 'App',
  components: {
    OGame
  },
  computed: {
    ...mapState(['gameStatus']),
  },
  created() {
    window.addEventListener('keypress', this.onKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.onKeyPress);
  },
  methods: {
    ...mapActions(['setGameStatus']),
    onKeyPress(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        this.setGameStatus(this.gameStatus === GAME_STATUS_PAUSE ? GAME_STATUS_PLAY : GAME_STATUS_PAUSE);
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/css/variables.scss";

#app {
  font-family: "Inter","Helvetica Neue","Segoe UI","Fira Sans",Roboto,Oxygen,Ubuntu,"Droid Sans","Arial",sans-serif;
  text-align: center;
  color: $color-black;
}
</style>
