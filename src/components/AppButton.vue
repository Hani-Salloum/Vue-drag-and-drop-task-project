<template>
  <button type="button" class="button" :class="typeClasses">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  type: {
    type: String
  }
})

const typeClasses = computed(() => {
  switch (this.type) {
    case 'danger':
      return 'bg-red'
    default:
      return 'bg-teal'
  }
})
</script>

<style lang="css" scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold rounded items-center;
}
</style>
