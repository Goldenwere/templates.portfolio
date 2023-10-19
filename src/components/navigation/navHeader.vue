<script setup lang="ts">
import { computed } from 'vue'

import { siteRoutes } from '@/src/router'

const links = computed(() => Object.keys(siteRoutes).map(name => ({
  route: siteRoutes[name],
  name,
})))
</script>

<template lang="pug">
header
  nav.primary
    router-link(
      v-for='link in links'
      :to='link.route'
    ) {{ link.name }}
</template>

<style scoped lang="sass">
header
  z-index: 99
  top: 0
  left: 0
  right: 0
  position: var(--theme-header-position)
  nav
    padding: var(--theme-header-spacing)
    width: 100%
    &.primary
      background: var(--theme-nav-bg)
      a
        color: var(--theme-nav-fg)
    &.breadcrumb
      background: var(--theme-subnav-bg)
      a
        color: var(--theme-nav-fg)
    a
      margin-right: var(--theme-header-spacing)
      &:last-of-type
        margin-right: 0
</style>
