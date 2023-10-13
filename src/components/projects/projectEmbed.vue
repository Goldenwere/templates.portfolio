<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { marked } from 'marked'

import { getFormattedPeriod } from '@/src/utilities/dom'

import { type ProjectListingInfo } from '@/src/types/shared/project'

const router = useRouter()

const props = defineProps<{
  projectId: string,
  info: ProjectListingInfo,
}>()

const period = computed(() => (!!props.info.period
  ? getFormattedPeriod(props.info.period)
  : undefined
))
const caption = computed(() => marked.parse(props.info.caption || ''))
const summary = computed(() => marked.parse(props.info.summary || ''))
const title = computed(() => marked.parse(props.info.title))

/**
 * Handles clicking on the project
 * @param event the DOM event
 */
const onProjectClicked = (event: Event) => {
  event.preventDefault()
  router.push({ path: `project/${props.projectId}` })
}
</script>

<template lang="pug">
.project-embed
  .link(
    @click='onProjectClicked($event)'
    :style='{ background: info.thumbnailBackground, backgroundSize: info.thumbnailBackgroundSize }'
  )
    .text
      .title(
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
.link
  cursor: pointer
  display: flex
  height: var(--theme-project-height)
  flex-direction: column
  .text
    background: var(--theme-project-caption-bg)
    margin: var(--theme-project-caption-margin)
    padding: var(--theme-project-caption-padding)
    text-align: center
    .title,
    .period
      color: var(--theme-project-caption-fg)
      margin: 0
    .period
      margin-top: var(--theme-project-caption-padding)
    .title :deep(*)
      margin: 0
.caption
  margin-top: var(--theme-project-spacing)
  :deep(*)
    margin: 0
    font-style: italic
</style>
