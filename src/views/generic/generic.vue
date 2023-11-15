<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from 'src/store'

import embedableContent from 'src/components/projects/embedableContent.vue'

const route = useRoute()
const store = useStore()
const url = route.path.slice(1)
const content = ref('')
const ready = ref(false)

const init = async () => {
  content.value = await store.getGenericContent(url)
  ready.value = true
}

init()
</script>

<template lang="pug">
.generic(
  :id='url'
)
  article(
    v-if='ready'
  )
    embedableContent(
      :content='content'
    )
</template>

<style scoped lang="sass">

</style>
