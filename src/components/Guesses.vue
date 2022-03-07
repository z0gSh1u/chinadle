<script lang="ts">
import { defineComponent } from 'vue'
import Guess from './Guess.vue'
import { Poems } from '../materials/poems'
import {
  buildDispBlocks,
  createGuess,
  Guess as GuessType,
  TotalGuess,
} from '../materials/utils'

export default defineComponent({
  data() {
    return {
      poem: '',
      guesses: [] as GuessType[],
    }
  },
  components: { Guess },
  mounted() {
    this.poem = Poems[~~(Math.random() * Poems.length)]
    this.guesses = Array.from(Array(TotalGuess).fill(0), (_, id) =>
      createGuess(id)
    )
    this.emitter.on('MAKE_NEW_GUESS', (payload: unknown) => {
      const { guess, dist } = payload as { guess: GuessType; dist: number }
      this.updateGuess(guess)
      const animStrings = buildDispBlocks(dist / 1000)
      this.emitter.emit('PLAY_ANIMATION', { id: guess.id, disp: animStrings })
    })
  },
  methods: {
    updateGuess(guess: GuessType) {
      this.guesses[guess.id] = { ...guess }
    },
  },
})
</script>

<template>
  <div>
    <p class="text-base my-2">{{ poem }}</p>
    <Guess
      v-for="(guess, index) in guesses"
      :key="guess.id"
      :id="guess.id"
      :value="guesses[index]"
    ></Guess>
  </div>
</template>
