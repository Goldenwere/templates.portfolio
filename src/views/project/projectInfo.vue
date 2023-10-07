<script setup lang="ts">
import { computed, ref } from 'vue'
import { type ProjectContentInfo } from '@/src/types/shared/project'

import projectInfoPlaces from './projectInfoPlaces.vue'
import projectInfoTable from './projectInfoTable.vue'

const props = defineProps<{
  contentInfo: ProjectContentInfo
}>()

const places = ref(props.contentInfo.places)
const tags = ref(props.contentInfo.tags)
const table = computed(() => {
  let info = props.contentInfo
  delete info.places
  delete info.tags
  if (!!info.period) {
    info.period = `${info.period.from}${info.period.to ? ' - ' + info.period.to : ''}` as any
  }
  return info
})
</script>

<template lang="pug">
section#information
  h2 Information
  projectInfoTable(
    v-if='!!table || !!tags'
    :table='table'
    :tags='tags'
  )
  projectInfoPlaces(
    v-if='!!places'
    :places='places'
  )
</template>

<style scoped lang="sass">

</style>
