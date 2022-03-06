<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Guess } from '../materials/utils'
export default defineComponent({
  methods: {},
  props: {
    sealed: {
      type: Boolean,
      default: true,
    },
    guess: {
      type: Object as PropType<Guess>,
      default: {},
    },
  },
  created() {},
})
</script>

<template>
  <div class="grid grid-cols-6 gap-1 text-center">
    <div
      class="flex justify-center border-2 h-8 col-span-6 bg-gray-300 my-0.5"
      v-if="sealed"
    ></div>
    <div
      class="flex justify-center border-2 h-8 col-span-3 my-0.5"
      v-if="!sealed"
    >
      <p class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ guess?.name ?? '' }}
      </p>
    </div>
    <div
      class="flex justify-center border-2 h-8 col-span-1 my-0.5"
      v-if="!sealed"
    >
      {{ guess?.orientation ?? '' }}
    </div>
    <div
      class="flex justify-center border-2 h-8 col-span-2 my-0.5"
      v-if="!sealed"
    >
      {{ guess?.distance ?? '' }}
    </div>
  </div>
</template>
