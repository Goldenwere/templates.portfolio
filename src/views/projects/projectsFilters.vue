<script setup lang="ts">
import {
  type FilterChangeEvent,
  type FilterDefinition,
  type FilterState,
  type ProjectFilterCategory,
} from '@/src/types/shared/filter'

import projectsFilter from './projectsFilter.vue'

defineProps<{
  filters: FilterDefinition[] | ProjectFilterCategory[],
  startingDepth: number,
}>()

const emit = defineEmits<{
  (e: 'tagStateChanged', state: FilterState): void,
}>()

const tagState: FilterState = {}

/**
 * Handles changes to individual filters in the filters panel
 * @param event the change event information
 */
const onFilterChanged = (event: FilterChangeEvent) => {
  tagState[event.tag] = event.value
  emit('tagStateChanged', tagState)
}
</script>

<template lang="pug">
section#filters
  h2 Filters
  projectsFilter(
    v-for='filter in filters'
    :filter='filter'
    :depth='startingDepth'
    @filterChanged='onFilterChanged'
  )
</template>

<style scoped lang="sass">

</style>
