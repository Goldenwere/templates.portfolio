<script setup lang="ts">
import navHeader from '@/src/components/navigation/navHeader.vue'
</script>

<template lang="pug">
#entry
  navHeader
  main
    router-view
</template>

<style scoped lang="sass">
main
  margin: var(--theme-body-margin)
</style>
