<script lang="ts">
import { defineComponent } from 'vue'
import Guess from './Guess.vue'
import { Poems } from '../map/poems'

export default defineComponent({
  data() {
    return {
      poem: '',
    }
  },
  components: { Guess },
  mounted() {
    this.poem = Poems[~~Math.random() * Poems.length]
  },
})
</script>

<template>
  <div>
    <p class="my-2">{{ poem }}</p>
    <Guess></Guess>
    <Guess></Guess>
    <Guess></Guess>
    <Guess></Guess>
    <Guess></Guess>
  </div>
</template>
