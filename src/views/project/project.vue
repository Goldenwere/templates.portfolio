<script setup lang="ts">
import { ref } from 'vue'

import { getProject } from '@/src/utilities/content'
import { useStore } from '@/src/store'

import { type ProjectViewModel } from '@/src/types/views/project'

import projectContent from './projectContent.vue'
import projectInfo from './projectInfo.vue'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref(undefined as unknown as ProjectViewModel)

const init = async () => {
  project.value = await getProject(store, props.id)
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
