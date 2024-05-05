<template>
  <div class="a-heading">
    <h1 class="heading heading-h1" v-if="headingType === 'h1'">{{headingText}}</h1>
    <h2 class="heading heading-h2" v-if="headingType === 'h2'">{{headingText}}</h2>
    <h3 class="heading heading-h3" v-if="headingType === 'h3'">{{headingText}}</h3>
  </div>
</template>

<script>
export default {
  name: 'AHeading',
  props: {
    headingType: {
      type: String,
      default: 'h1'
    },
    headingText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/variables";

.heading {
  font-weight: 600;
}

.heading-h1 {
  font-size: $heading-h1;
}

.heading-h2 {
  font-size: $heading-h2;
}

.heading-h3 {
  font-size: $heading-h3;
}
</style>
