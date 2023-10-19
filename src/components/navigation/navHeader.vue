<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { type RouteRecordRaw, useRouter } from 'vue-router'

import { siteRoutes } from '@/src/router'
import { useStore } from '@/src/store'

type headerLink = {
  route?: Partial<RouteRecordRaw>
  name: string
}

const router = useRouter()
const store = useStore()

let breadcrumb = reactive([] as headerLink[])
const showBreadcrumb = ref(false)
const links = computed(() => Object.keys(siteRoutes).map(name => ({
  route: siteRoutes[name],
  name,
} as headerLink)))

router.afterEach(async (to, from) => {
  if (to.name === 'project') {
    const projectTitle = (await store.getProjectListingInfo(to.params.id as string)).title
    breadcrumb = reactive([
      {
        route: siteRoutes.Projects,
        name: 'Portfolio',
      },
      {
        name: projectTitle,
      },
    ])
    showBreadcrumb.value = true
  } else {
    breadcrumb = reactive([])
    showBreadcrumb.value = false
  }
})
</script>

<template lang="pug">
header
  nav.primary
    router-link.link(
      v-for='link in links'
      :to='link.route'
    ) {{ link.name }}
  nav.breadcrumb(
    v-if='showBreadcrumb'
  )
    .link(
      v-for='link in breadcrumb'
    )
      span(
        v-if='link.route'
      )
        router-link(
          :to='link.route'
        ) {{ link.name }}
        span.divider /
      span(
        v-else
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
        color: var(--theme-nav-link)
    &.breadcrumb
      background: var(--theme-subnav-bg)
      .link
        display: inline
      a
        color: var(--theme-subnav-link)
      span
        color: var(--theme-subnav-fg)
    .link
      margin-right: var(--theme-header-spacing)
      &:last-of-type
        margin-right: 0
      .divider
        margin-left: var(--theme-header-spacing)
</style>
