<script setup lang="ts">
import { type FilterDefinition, type ProjectFilterCategory } from '@/src/types/shared/filter'

defineProps<{
  filter: FilterDefinition | ProjectFilterCategory
  depth: number
}>()
</script>

<template lang="pug">
div
  section(
    v-if='!!filter.heading'
  )
    h2(
      v-if='depth === 2'
    ) {{ filter.heading }}
    h3(
      v-else-if='depth === 3'
    ) {{ filter.heading }}
    h4(
      v-else-if='depth === 4'
    ) {{ filter.heading }}
    h5(
      v-else-if='depth === 5'
    ) {{ filter.heading }}
    h6(
      v-else
    ) {{ filter.heading }}
    projectsFilter(
      v-for='child in filter.filters'
      :filter='child'
      :depth='depth + 1'
    )
  .filter(
    v-else
    :filter-tag='filter.tag'
  )
    input(
      type='checkbox'
      :id='`filter_${filter.tag}`'
      :name='`filter_${filter.tag}`'
    )
    label(
      :for='`filter_${filter.tag}`'
    ) {{ filter.displayName || filter.tag }}
</template>

<style scoped lang="sass">
</style>
