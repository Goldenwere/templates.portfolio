<script setup lang="ts">
import {
  type FilterChangeEvent,
  type FilterDefinition,
  type FilterState,
  type ProjectFilterCategory,
} from '@/src/types/shared/filter'

import projectsFilter from './projectsFilter.vue'

const props = defineProps<{
  filters: FilterDefinition[] | ProjectFilterCategory[],
  startingDepth: number,
}>()

const emit = defineEmits<{
  (e: 'tagStateChanged', value: FilterState): void,
}>()

const tagState: FilterState = {}

const onTagChanged = (value: FilterChangeEvent) => {
  tagState[value.tag] = value.value
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
    @tagChanged='onTagChanged'
  )
</template>

<style scoped lang="sass">

</style>
