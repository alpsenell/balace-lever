<template>
  <div class="m-game-over">
    <div class="wrapper">
      <div class="left">
        <a-heading :heading-text="'Game Over!'" heading-type="h2"></a-heading>
        <a-button @buttonClicked="tryAgain" >Try Again</a-button>
      </div>
      <div class="right">
        <IllustrationSVG />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AHeading from "@/components/atoms/a-heading";
import AButton from "@/components/atoms/a-button";
import IllustrationSVG from '@/assets/pale-fatal-error.svg';

export default {
  name: 'MGameOver',
  components: {
    AHeading,
    AButton,
    IllustrationSVG
  },
  computed: {
    ...mapState(['gameStatus']),
  },
  methods: {
    ...mapActions(['tryAgain'])
  },
}
</script>

<style lang="scss" scoped>
@import "src/css/variables.scss";

.m-game-over {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: $white-color;
  z-index: 1;
}

.wrapper {
  display: flex;
  align-items: center;
}

.left {
  margin-right: $spacer-base;
  text-align: left;
}

.right {
  width: 300px;
}
</style>
