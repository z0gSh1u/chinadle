<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {},
  methods: {},
  props: {},
})
</script>

<template>
  <div class="grid grid-cols-6 gap-1 text-center">
    <div class="flex justify-center border-2 h-8 col-span-3">
      <p class="overflow-hidden text-ellipsis whitespace-nowrap">
        <slot name="name"></slot>
      </p>
    </div>
    <div class="flex justify-center border-2 h-8 col-span-2">
      <slot distance="distance"></slot>
    </div>
    <div class="flex justify-center border-2 h-8 col-span-1">
      <slot orientation="orientation"></slot>
    </div>
  </div>
</template>
