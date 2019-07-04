<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in screenShots"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    screenShots: {
      type: Array,
      required: true,
    }
  }
}
</script>
