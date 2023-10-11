<script setup lang="ts">
import { ref } from 'vue'

import { useStore } from '@/src/store'

import projectContent from './projectContent.vue'

const props = defineProps<{
  id: string,
}>()

const store = useStore()

const ready = ref(false)
let project = ref('')

const init = async () => {
  project.value = await store.getProjectContent(props.id)
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
    )
</template>

<style lang="sass">

</style>
