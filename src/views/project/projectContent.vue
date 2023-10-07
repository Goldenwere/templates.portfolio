<script setup lang="ts">
import { onMounted } from 'vue'

import { inflateDetailsElements } from '@/src/components/raw/details'

defineProps<{
  content: string
}>()

onMounted(() => {
  inflateDetailsElements(document)
})
</script>

<template lang="pug">
.content(
  v-html='content'
)
</template>

<style scope lang="sass">

</style>
