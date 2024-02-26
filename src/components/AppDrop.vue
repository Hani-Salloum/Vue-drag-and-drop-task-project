<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['drop'])

const onDrop = (e) => {
  const transferData = JSON.parse(e.dataTransfer.getData('payload'))

  console.log('drop : ' + transferData)

  emit('drop', transferData)
}
</script>