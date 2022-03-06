<script lang="ts">
import { defineComponent } from 'vue'
import { ChinaSights } from '../map/sights'
import confetti from 'canvas-confetti'

let myConfetti: any

export default defineComponent({
  data() {
    return {}
  },

  confetti: void 0,

  mounted() {
    myConfetti = confetti.create(this.$refs.confettiCanvas, {
      resize: true,
      useWorker: true,
    })
  },

  methods: {
    handleGuess() {
      myConfetti({
        particleCount: 50,
        startVelocity: 20,
        spread: 100,
      })
    },

    handleInput() {
      const a = document.createElement('div')
      a.setAttribute('class', 'autocomplete-items')
      const dom = this.$refs['myInput'] as HTMLInputElement
      dom.parentNode!.appendChild(a)
      let b
      for (const sight of ChinaSights) {
        if (sight.name.includes(dom.value)) {
          b = document.createElement('div')
          b.innerHTML = sight.name
          a.appendChild(b)
        }
      }
    },
  },
})
</script>

<template>
  <div>
    <div class="autocomplete mt-2 border-2">
      <input
        ref="myInput"
        @input="handleInput"
        id="myInput"
        type="text"
        name="myCountry"
        placeholder="请输入景点..."
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

<style scoped>
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}
input[type='text'] {
  background-color: #f1f1f1;
  width: 100%;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>
