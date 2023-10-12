<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked';

import { getFormattedPeriod } from '@/src/utilities/dom'

import { type ProjectListingInfo } from '@/src/types/shared/project'

const props = defineProps<{
  info: ProjectListingInfo
}>()

const period = computed(() => (!!props.info.period
  ? getFormattedPeriod(props.info.period)
  : undefined
))
const caption = computed(() => marked.parse(props.info.caption || ''))
const summary = computed(() => marked.parse(props.info.summary || ''))
const title = computed(() => marked.parse(props.info.title))
</script>

<template lang="pug">
.project-embed
  .link(
    :style='{ background: info.thumbnailBackground }'
  )
    .text
      p.title(
        v-html='title'
      )
      p.period(
        v-if='period'
      ) {{ period }}
  .caption(
    v-html='caption'
  )
  .summary(
    v-html='summary'
  )
</template>

<style scoped lang="sass">

</style>
