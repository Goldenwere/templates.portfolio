<script setup lang="ts">
import { ref } from 'vue'

import { useStore } from 'src/store'

import { type ProjectListingInfo } from 'src/types/shared/project'

import embedableContent from 'src/components/projects/embedableContent.vue'
import { useRoute } from 'vue-router';

const props = defineProps<{
  id: string,
}>()

const route = useRoute()
const store = useStore()
const url = route.path.split('/')[1]

const ready = ref(false)
let project = ref('')
let info = ref(undefined as unknown as ProjectListingInfo)

const init = async () => {
  project.value = await store.getProjectContent(url, props.id)
  info.value = await store.getProjectListingInfo(url, props.id)
  ready.value = true
}

init()
</script>

<template lang="pug">
.project
  article(
    v-if='ready'
  )
    embedableContent(
      :content='project'
      :info='info'
    )
</template>

<style lang="sass">

</style>
