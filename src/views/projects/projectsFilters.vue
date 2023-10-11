<script setup lang="ts">
import { type FilterChangeEvent, type FilterDefinition, type ProjectFilterCategory } from '@/src/types/shared/filter'

import projectsFilter from './projectsFilter.vue'

const props = defineProps<{
  filters: FilterDefinition[] | ProjectFilterCategory[],
  startingDepth: number,
}>()

const onTagChanged = (value: FilterChangeEvent) => {
  console.log(`${value.tag} changed to ${value.value}`)
}
</script>

<template lang="pug">
section#filters
  h2 Filters
  projectsFilter(
    v-for='filter in filters'
    :filter='filter'
    :depth='startingDepth'
    @tagChanged='onTagChanged'
  )
</template>

<style scoped lang="sass">

</style>
