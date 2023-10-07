<script setup lang="ts">
import { ref } from 'vue'

import { fetchAndReturnProject } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import { type Project } from '@/src/types/views/project'

import projectInfo from './projectInfo.vue'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref(undefined as unknown as Project)

const init = async () => {
  if (!!store.projects[props.id]) {
    project.value = store.projects[props.id]
    ready.value = true
  } else {
    project.value = await fetchAndReturnProject(`/content/projects/${props.id}.md`)
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
    projectInfo(
      v-if='project.contentInfo'
      :contentInfo='project.contentInfo'
    )
    .content(
      v-html='project.content'
    )
</template>

<style lang="sass">
article
  margin: auto
  max-width: 48rem
</style>
