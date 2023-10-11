<script setup lang="ts">
import { onMounted } from 'vue'

import { inflateEmbeds } from '@/src/components/raw/embed'

import { type ProjectListingInfo } from '@/src/types/shared/project'

const props = defineProps<{
  content: string
  info: ProjectListingInfo
}>()

onMounted(() => {
  inflateEmbeds(window, props.info)
})
</script>

<template lang="pug">
.content(
  v-html='content'
)
</template>

<style scope lang="sass">

</style>
