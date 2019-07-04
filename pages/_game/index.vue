<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-xs-center">
        <h1 class="display-3">{{ name }}</h1>
        <p class="subheading" v-if="description && description !== ''">{{ description }}</p>
      </div>
      <div v-html="gameEmbedCode"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import { getGame } from '@/api/contentful'
import ScreenShots from '@/components/ScreenShots.vue'

export default {
  components: {
    ScreenShots
  },
  data() {
    return {
      name: '',
      description: '',
      gameEmbedCode: '',
      screenShots: [],
    }
  },
  async asyncData({ params, error }) {
    try {
       const game = await getGame(params.game)

      if (!game) {
        return error({ statusCode: 404, message: 'Game not found' })
      }

      const { name, description, gameEmbedCode, screenShots } = game.fields
      return {
        name,
        description,
        gameEmbedCode,
        screenShots
      }

    } catch(e) {
      return error({ statusCode: 400, message: e })
    }
  },
  computed: {
    screenShotsList() {
      if (!this.screenShots || !Array.isArray(this.screenShots)) {
        return []
      }
      if (this.screenShots.length === 0) {
        return []
      }

      return this.screenShots.map(screenShot => {
        return {
          src: screenShot.fields.file.url
        }
      })
    }
  }
}
</script>
