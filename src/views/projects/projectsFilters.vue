<script setup lang="ts">
import {
  type FilterChangeEvent,
  type FilterDefinition,
  type FilterState,
  type ProjectFilterCategory,
} from 'src/types/shared/filter'

import projectsFilter from './projectsFilter.vue'

defineProps<{
  filters: FilterDefinition[] | ProjectFilterCategory[],
  startingDepth: number,
}>()

const emit = defineEmits<{
  (e: 'filterStateChanged', state: FilterState): void,
}>()

const tagState: FilterState = {}

/**
 * Handles changes to individual filters in the filters panel
 * @param event the change event information
 */
const onFilterChanged = (event: FilterChangeEvent) => {
  tagState[event.tag] = event.value
  emit('filterStateChanged', tagState)
}
</script>

<template lang="pug">
section#filters
  h2 Filters
  .filters
    projectsFilter(
      v-for='filter in filters'
      :filter='filter'
      :depth='startingDepth'
      @filterChanged='onFilterChanged'
    )
</template>

<style scoped lang="sass">
.filters
  position: sticky
  top: calc((var(--theme-nav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-subnav-size) + (var(--theme-header-spacing) * 2)))
</style>
