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
      v-for="game in games" :key="game.title"
      class="game-card"
    >
    
      <v-card >
        <v-img
          :src="game.featuredImage"
        >
          <v-container 
            fill-height
            fluid
            pa-2
          >
            <v-layout align-end justify-center row fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title class="headline">
         <span v-html="game.name"></span>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn                                                                                                
            color="primary"
            flat
            nuxt
            :to="game.slug"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getGames } from '@/api/contentful'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      games: [],
    }
  },
  async asyncData({ error }) {
    const games = await getGames()
    return { games }
  }
}
</script>

<style scoped>
.game-card {
  width: 100%;
  margin-bottom: 35px;
}
</style>
