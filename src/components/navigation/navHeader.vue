<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type RouteRecordRaw, useRouter } from 'vue-router'

import { getRoute } from 'src/router'
import { useStore } from 'src/store'

type headerLink = {
  route?: Partial<RouteRecordRaw>
  name: string
}

const router = useRouter()
const store = useStore()

const showBreadcrumb = ref(false)
const links = ref([] as headerLink[])
const logoUrl = ref('')
let breadcrumb = reactive([] as headerLink[])

const init = async () => {
  const appData = await store.getAppData()
  const siteRoutes = appData.routes
  logoUrl.value = appData.logoUrl

  links.value = Object.keys(siteRoutes).map(url => ({
    route: getRoute(router, url, siteRoutes[url]),
    name: siteRoutes[url].displayName || url,
  } as headerLink))

  router.afterEach(async (to, from) => {
    if (to.name?.toString().includes(': project')) {
      const url = to.path.split('/')[1]
      const projectTitle = (await store.getProjectListingInfo(url, to.params.id as string)).title
      breadcrumb = reactive([
        {
          route: getRoute(router, url, siteRoutes[url]),
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
}

init()
</script>

<template lang="pug">
header
  nav.primary
    router-link.logo(
      :to='{ name: "home" }'
    )
      img(
        :src='logoUrl'
        alt='logo'
      )
      .label
        span Back Home
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
  height: calc((var(--theme-nav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-subnav-size) + (var(--theme-header-spacing) * 2)))
  nav
    align-items: center
    display: flex
    padding-left: calc((var(--theme-nav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-subnav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-header-spacing) * 2))
    position: relative
    width: 100%
    &.primary
      background: var(--theme-nav-bg)
      height: calc(var(--theme-nav-size) + (var(--theme-header-spacing) * 2))
      a
        color: var(--theme-nav-link)
        font-size: var(--theme-nav-size)
    &.breadcrumb
      background: var(--theme-subnav-bg)
      height: calc(var(--theme-subnav-size) + (var(--theme-header-spacing) * 2))
      .link
        display: inline
        font-size: var(--theme-subnav-size)
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
    .logo
      display: inline-block
      height: calc((var(--theme-nav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-subnav-size) + (var(--theme-header-spacing) * 2)))
      left: var(--theme-header-spacing)
      position: absolute
      top: 0
      width: calc((var(--theme-nav-size) + (var(--theme-header-spacing) * 2)) + (var(--theme-subnav-size) + (var(--theme-header-spacing) * 2)))
      z-index: 1
      img
        max-width: 100%
        max-height: 100%
        width: auto
        height: auto
        margin: auto
      .label
        background: var(--theme-header-logo-label-bg)
        color: var(--theme-header-logo-label-fg)
        display: flex
        pointer-events: none
        position: absolute
        opacity: 0
        left: 0
        right: 0
        bottom: 0
        top: 0
        span
          margin: auto
          text-align: center
      &:hover,
      &:focus
        .label
          opacity: 1
</style>
