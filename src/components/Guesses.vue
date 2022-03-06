<script lang="ts">
import { defineComponent } from 'vue'
import Guess from './Guess.vue'
import { Poems } from '../materials/poems'
import { createGuess, Guess as GuessType, TotalGuess } from '../materials/utils'

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
    )!
    
    // @ts-ignore
    this.emitter.on('MAKE_NEW_GUESS', (payload: GuessType) => {
      this.updateGuess(payload)
    })
  },
  watch: {
    guesses: {
      handler(guess) {
        console.log('checked')
        this.guesses[guess.id] = { ...guess }
      },
      deep: true,
    },
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
      v-for="guess in guesses"
      :key="guess.id"
      :guess="guesses[guess.id]"
      v-model="guesses[guess.id]"
    ></Guess>
  </div>
</template>
