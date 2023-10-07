<script setup lang="ts">
import { onMounted } from 'vue'

import { inflateEmbeds } from '@/src/components/raw/embed'

defineProps<{
  content: string
}>()

onMounted(() => {
  inflateEmbeds(window)
})
</script>

<template lang="pug">
.content(
  v-html='content'
)
</template>

<style scope lang="sass">

</style>
