<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Guess } from '../materials/utils'
export default defineComponent({
  data() {
    return {
      animString: ' ',
      guessDone: false,
    }
  },
  props: {
    value: {
      type: Object as PropType<Guess>,
      default: {},
    },
    id: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    async playAnimation(disp: string[]) {
      return new Promise<void>((resolve) => {
        let i = 0
        const timer = setInterval(() => {
          // we are dealing with emoji, whose unicode requires two \uXXXX
          this.animString += disp[i++]
          if (i >= disp.length) {
            clearInterval(timer)
            resolve()
          }
        }, 500)
      })
    },
  },
  mounted() {
    this.emitter.on('PLAY_ANIMATION', async (payload: unknown) => {
      const { id, disp } = payload as { id: number; disp: string[] }
      if (this.id == id) {
        await this.playAnimation(disp)
        this.emitter.emit('ANIMATION_DONE', id)
        setTimeout(() => {
          this.guessDone = true
        }, 500)
      }
    })
  },
})
</script>

<template>
  <div class="grid grid-cols-6 gap-1 text-center">
    <div
      class="flex justify-center border-2 h-8 col-span-6 bg-gray-300 my-0.5"
      style="letter-spacing: 1em; text-indent: 1em"
      v-show="!guessDone"
    >
      <span>{{ animString }}</span>
    </div>
    <div
      class="flex justify-center border-2 h-8 col-span-3 my-0.5"
      v-show="guessDone"
    >
      <p class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ value.name ?? '' }}
      </p>
    </div>
    <div
      class="flex justify-center border-2 h-8 col-span-1 my-0.5"
      v-show="guessDone"
    >
      {{ value.orientation ?? '' }}
    </div>
    <div
      class="flex justify-center border-2 h-8 col-span-2 my-0.5"
      v-show="guessDone"
    >
      {{ value.distance ?? '' }}
    </div>
  </div>
</template>
