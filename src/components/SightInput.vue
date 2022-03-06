<script lang="ts">
import { defineComponent } from 'vue'
import { ChinaSights, Sight } from '../materials/sights'
import confetti from 'canvas-confetti'
import { CompassToArrow, createGuess, Guess } from '../materials/utils'
import * as geolib from 'geolib'

let myConfetti: any

export default defineComponent({
  data() {
    return { currentGuess: 0, name: '', answer: {} as Sight }
  },
  mounted() {
    myConfetti = confetti.create(this.$refs.confettiCanvas, {
      resize: true,
      useWorker: true,
    })
    window.$('#sight').autocomplete({
      source: ChinaSights.map((v) => v.name),
    })
    const answerIndex = ~~(ChinaSights.length * Math.random())
    this.answer = ChinaSights[answerIndex]
    console.log(this.answer)
  },
  methods: {
    fetchName() {
      this.name = (this.$refs.nameInput as HTMLInputElement).value
    },

    handleGuess() {
      myConfetti({
        particleCount: 50,
        startVelocity: 20,
        spread: 100,
      })

      let guess: Guess

      this.fetchName()
      if (this.name === this.answer.name) {
        guess = createGuess(this.currentGuess++, true, this.name, '0 m', '✔️')
      } else {
        console.log('Finding ', this.name)
        console.log(ChinaSights.find((v) => v.name == this.name))

        const guessLoc = ChinaSights.find(
          (v) => v.name == this.name.trim()
        )!.coord
        const answerLoc = this.answer.coord
        let dist = geolib.getDistance(guessLoc, answerLoc) // m
        let unit = 'm'
        if (dist >= 1000) {
          dist /= 1000
          unit = 'km'
        }
        dist = Math.round(dist)

        const compass = geolib.getCompassDirection(guessLoc, answerLoc)

        guess = createGuess(
          this.currentGuess++,
          true,
          this.name,
          `${dist} ${unit}`,
          CompassToArrow[compass]
        )
      }

      // @ts-ignore
      this.emitter.emit('MAKE_NEW_GUESS', guess)
    },
  },
})
</script>

<template>
  <div>
    <div class="ui-widget mt-2 border-2 p-1">
      <input
        id="sight"
        placeholder="请输入景点..."
        class="w-full p-1"
        v-model="name"
        ref="nameInput"
      />
    </div>
    <button
      class="w-full justify-center border-2 my-1 hover:bg-gray-50 active:bg-gray-100"
      @click="handleGuess"
    >
      🛫 猜测
    </button>
    <canvas id="confetti-canvas" ref="confettiCanvas"></canvas>
  </div>
</template>

<style scoped></style>
