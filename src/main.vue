<script setup lang="ts">
import { ref } from 'vue'

import navHeader from 'src/components/navigation/navHeader.vue'

const ready = ref(false)

const init = async () => {
  ready.value = true
}

init()
</script>

<template lang="pug">
#main
  #entry(
    v-if='ready'
  )
  navHeader
  main
    router-view
</template>

<style scoped lang="sass">
main
  margin: var(--theme-body-margin)
</style>
