<template>
  <div class="a-game-info">
    <div>
      Total left weight: {{ totalLeftWeight }}
    </div>
    <div>
      Total right weight: {{ totalRightWeight }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AGameInfo',
  computed: {
    ...mapGetters(['totalLeftWeight', 'totalRightWeight'])
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.a-game-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: $spacer-60;
}
</style>
