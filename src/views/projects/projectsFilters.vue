<script setup lang="ts">
import { type FilterDefinition, type ProjectFilterCategory } from '@/src/types/shared/filter'

import projectsFilter from './projectsFilter.vue'

const props = defineProps<{
  filters: FilterDefinition[] | ProjectFilterCategory[],
  startingDepth: number,
}>()
</script>

<template lang="pug">
section#filters
  h2 Filters
  projectsFilter(
    v-for='filter in filters'
    :filter='filter'
    :depth='startingDepth'
  )
</template>

<style scoped lang="sass">

</style>
