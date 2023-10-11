<script setup lang="ts">
import { ref } from 'vue'

import { useStore } from '@/src/store'

import { type ProjectListingInfo } from '@/src/types/shared/project'

import projectContent from './projectContent.vue'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref('')
let info = ref(undefined as unknown as ProjectListingInfo)

const init = async () => {
  project.value = await store.getProjectContent(props.id)
  info.value = await store.getProjectListingInfo(props.id)
  ready.value = true
}

init()
</script>

<template lang="pug">
.project
  article(
    v-if='ready'
  )
    projectContent(
      :content='project'
      :info='info'
    )
</template>

<style lang="sass">

</style>
