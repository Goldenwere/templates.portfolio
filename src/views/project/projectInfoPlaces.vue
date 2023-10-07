<script setup lang="ts">
import { type Link } from '@/src/types/shared/link'

defineProps<{
  places: Link[]
}>()
</script>

<template lang="pug">
section.places
  h3 Places
  .link(
    v-for='link in places'
  )
    a(
      :href='link.href'
      :target='link.target || "_blank"'
    ) {{ link.caption || link.href }}
</template>

<style scoped lang="sass">

</style>
