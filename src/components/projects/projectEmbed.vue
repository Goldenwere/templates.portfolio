<script setup lang="ts">
import { computed } from 'vue'

import { getFormattedPeriod } from '@/src/utilities/content'

import { type ProjectListingInfo } from '@/src/types/shared/project'

const props = defineProps<{
  info: ProjectListingInfo
}>()

const period = computed(() => (!!props.info.period
  ? getFormattedPeriod(props.info.period)
  : undefined
))
</script>

<template lang="pug">
.project-embed
  .link(
    :style='{ background: info.thumbnailBackground }'
  )
    .text
      p.title(
        v-html='info.title'
      )
      p.period(
        v-if='period'
      ) {{ period }}
  .caption(
    v-html='info.caption'
  )
  .summary(
    v-html='info.summary'
  )
</template>

<style scoped lang="sass">

</style>
