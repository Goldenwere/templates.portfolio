<script setup lang="ts">
import { ref } from 'vue'

import { fetchAndReturnProject } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
const project = ref(undefined as unknown)

const init = async () => {
  if (!!store.projects[props.id]) {
    project.value = store.projects[props.id]
    ready.value = true
  } else {
    project.value = await fetchAndReturnProject(`/content/projects/${props.id}.md`)
    console.log(project.value)
    ready.value = true
  }
}

init()
</script>

<template lang="pug">
.project
  .content(
    v-if='ready'
    v-html='project.content'
  )
</template>

<style scoped lang="sass">

</style>
