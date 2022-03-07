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
  mounted() {},
})
</script>

<template>
  <div
    class="flex flex-col h-screen w-fit justify-center overflow-y-hidden mx-auto"
  >
    <Banner class="w-full max-w-lg mt-4"></Banner>
    <div class="flex-grow w-full max-w-lg">
      <Guesses></Guesses>
      <SightInput></SightInput>
    </div>
    <Footer class="w-full max-w-lg mb-4"></Footer>
  </div>
</template>

<style></style>
