<script setup lang="ts">
import { ref } from 'vue'

import { fetchAndReturnProject } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import { type Project } from '@/src/types/views/project'

import projectContent from './projectContent.vue'
import projectInfo from './projectInfo.vue'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref(undefined as unknown as Project)

const fetchProject = async () => {
  return !!store.projects[props.id]
    ? store.projects[props.id]
    : fetchAndReturnProject(`/content/projects/${props.id}.md`)
}

const init = async () => {
  project.value = await fetchProject()
  ready.value = true
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
    projectContent(
      :content='project.content'
    )
</template>

<style lang="sass">

</style>
