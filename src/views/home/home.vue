<script setup lang="ts">
import { ref } from 'vue'

import { useStore } from 'src/store'

import { type HomeViewModel } from 'src/types/views/home'

import embedableContent from 'src/components/projects/embedableContent.vue'

const store = useStore()
const config = ref(null as HomeViewModel | null)
const content = ref('')
const ready = ref(false)

const init = async () => {
  const data = await store.getHomeData()
  config.value = data.config
  content.value = data.content
  ready.value = true
}

init()
</script>

<template lang="pug">
.home
  .outlet(
    v-if='ready'
  )
    embedableContent(
      :content='content'
    )
</template>

<style scoped lang="sass">

</style>
