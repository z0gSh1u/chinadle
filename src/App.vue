<script setup lang="ts">
import { defineComponent } from 'vue'

import Banner from './components/Banner.vue'
import SightInput from './components/SightInput.vue'
import Guesses from './components/Guesses.vue'
import Footer from './components/Footer.vue'

defineComponent({
  components: {
    Banner,
    SightInput,
    Guesses,
    Footer,
  },
})
</script>

<template>
  <div class="w-fit justify-center my-0 mx-auto h-full max-h-full min-h-full overflow-y-hidden mt-4 mb-4">
    <Banner class="w-full max-w-lg"></Banner>
    <Guesses class="w-full max-w-lg"></Guesses>
    <SightInput class="w-full max-w-lg"></SightInput>
    <Footer class="w-full max-w-lg"></Footer>
  </div>
</template>

<style></style>
