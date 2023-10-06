<script setup lang="ts">
import { ref } from 'vue'

import { fetchAndReturnProject } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import { type Project } from '@/src/types/views/project'
import { type Tag, type TagDefinition } from '@/src/types/shared/tag'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref(undefined as unknown as Project)

const infoTable = ref(undefined as unknown)
const infoPlaces = ref(undefined as unknown)
const infoTags = ref(undefined as unknown)

const getTableElementClass = (key: string) => {
  return key.toLowerCase().replace(' ', '-')
}

const getTagClass = (tag: Tag): string => {
  let val = !!(tag as TagDefinition).className
    ? (tag as TagDefinition).className
    : !!(tag as TagDefinition).displayName
      ? (tag as TagDefinition).displayName
      : tag as string
  
  val = val.toLowerCase().replace(' ', '-')

  return val
}

const getTagDisplayName = (tag: Tag): string => {
  return (tag as TagDefinition).displayName || tag as string
}

const setupTable = () => {
  const info = project.value.contentInfo

  if (!!info) {
    // because special keys are handled separately, remove them from the looped KV pairs
    infoTable.value = {
      ...info,
      period: !!info.period ? `${info.period.from}${info.period.to ? ' - ' + info.period.to : ''}` : undefined,
    }

    delete (infoTable.value as any).tags
    delete (infoTable.value as any).places
    // define places in its own container
    infoPlaces.value = info.places
    // define tags separately so classes can be setup
    infoTags.value = info.tags
  }
}

const init = async () => {
  if (!!store.projects[props.id]) {
    project.value = store.projects[props.id]
    setupTable()
    ready.value = true
  } else {
    project.value = await fetchAndReturnProject(`/content/projects/${props.id}.md`)
    setupTable()
    ready.value = true
  }
}

init()
</script>

<template lang="pug">
.project
  article(
    v-if='ready'
  )
    section#information
      h2 Information
      .info(
        v-if='project.contentInfo'
      )
        .grid
          .grid-item(
            v-for='(entry, key) in infoTable'
            :class='getTableElementClass(key)'
          )
            .grid-title
              span {{ key }}
            .grid-value
              span {{ entry }}
          .grid-item.tags(
            v-if='!!infoTags'
          )
            .grid-title
              span tags
            .grid-value
              .tag(
                v-for='(tag) in infoTags'
                :class='getTagClass(tag)'
              ) {{ getTagDisplayName(tag) }}
      section.places(
        v-if='!!infoPlaces'
      )
        h3 Places
        .link(
          v-for='link in infoPlaces'
        )
          a(
            :href='link.href'
            :target='link.target || "_blank"'
          ) {{ link.caption || link.href }}
    .content(
      v-html='project.content'
    )
</template>

<style scoped lang="sass">
.info
  .grid
    grid-auto-columns: 1fr
    .grid-item
      display: grid
      grid-template-columns: 1fr 2fr
      &.tags
        grid-column: 1/3
        grid-template-columns: 1fr 5fr
        .tag
          display: inline
</style>
