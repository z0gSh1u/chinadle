<script lang="ts">
import { defineComponent } from 'vue'
import { ChinaSights, Sight } from '../materials/sights'
import confetti from 'canvas-confetti'
import {
  buildToastHTML,
  CompassToArrow,
  createGuess,
  Guess,
  TotalGuess,
} from '../materials/utils'
import * as geolib from 'geolib'

let myConfetti: any

export default defineComponent({
  data() {
    return {
      currentGuess: 0,
      name: '',
      answer: {} as Sight,
      success: false,
      failed: false,
    }
  },
  mounted() {
    // TODO move to somewhere else instead of input component.
    myConfetti = confetti.create(this.$refs.confettiCanvas, {
      resize: true,
      useWorker: true,
    })
    window.$('#sight').autocomplete({
      source: ChinaSights.map((v) => v.name),
    })
    // generate answer. // TODO move to somewhere else instead of input component.
    const answerIndex = ~~(ChinaSights.length * Math.random())
    this.answer = ChinaSights[answerIndex]
    // For debug.
    // console.log(this.answer)
    localStorage.setItem('CHINADLE_ANSWER', JSON.stringify(this.answer))
  },
  methods: {
    handleReplay() {
      window.location.reload()
    },

    // Refetch the input name of sightseeing because autocomplete of JQueryUI might not sync with Vue's binding.
    fetchName() {
      this.name = (this.$refs.nameInput as HTMLInputElement).value
    },

    handleGuess() {
      if (this.success) {
        this.$toast.open({
          message: '你已猜中，不如点击 ♻️ 重玩 换一题~',
          type: 'info',
          position: 'top',
          duration: 2000,
          dismissible: true,
        })
        return
      }

      if (this.failed) {
        this.$toast.open({
          message: '你没猜中，不如点击 ♻️ 重玩 换一题~',
          type: 'info',
          position: 'top',
          duration: 2000,
          dismissible: true,
        })
        return
      }

      let guess: Guess,
        dist = -1

      this.fetchName()
      if (this.name === this.answer.name) {
        // I'm right.
        guess = createGuess(this.currentGuess, true, this.name, '0 m', '✔️')
        this.success = true
      } else {
        const guessCorresponding = ChinaSights.find(
          (v) => v.name == this.name.trim()
        )
        if (!guessCorresponding) {
          // not a valid guess
          this.$toast.open({
            message: '这个景点不在题库中嗷~',
            type: 'info',
            position: 'top',
            duration: 2000,
            dismissible: true,
          })
          return
        }

        const guessLoc = guessCorresponding.coord
        const answerLoc = this.answer.coord

        // calculate distance
        dist = geolib.getDistance(guessLoc, answerLoc) // m
        let unit = dist >= 1000 ? 'km' : 'm'

        // calculate compass
        const compass = geolib.getCompassDirection(guessLoc, answerLoc)

        guess = createGuess(
          this.currentGuess++,
          true,
          this.name,
          `${
            dist >= 1000 ? Math.round(dist / 1000) : Math.round(dist)
          } ${unit}`,
          CompassToArrow[compass]
        )
      }

      this.emitter.on('ANIMATION_DONE', () => {
        if (this.currentGuess == TotalGuess || this.success) {
          // didnt make it, or finished it, we should show answer
          this.failed = true
          this.showAnswer()
        }
        this.success &&
          myConfetti({
            particleCount: 50,
            startVelocity: 20,
            spread: 100,
          })
        this.name = ''
      })
      this.emitter.emit('MAKE_NEW_GUESS', { guess, dist })
    },

    showAnswer() {
      this.$toast.open({
        message: buildToastHTML(this.answer),
        type: 'success',
        position: 'top',
        duration: 10000,
        dismissible: true,
        queue: true,
      })
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
    <button
      class="w-full justify-center border-2 my-1 hover:bg-gray-50 active:bg-gray-100"
      @click="handleReplay"
    >
      ♻️ 重玩
    </button>
    <canvas id="confetti-canvas" ref="confettiCanvas"></canvas>
  </div>
</template>

<style scoped></style>
