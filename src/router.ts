import {
  createRouter as vueCreateRouter,
  createWebHashHistory,
  RouteRecordRaw,
  type Router,
} from 'vue-router'

import type { AppRoutes, Route, TemplateType } from 'src/types/shared/route'

const genericBody = () => import ('./views/generic/generic.vue')
const homeBody = () => import ('./views/home/home.vue')
const projectBody = () => import ('./views/project/project.vue')
const projectsBody = () => import ('./views/projects/projects.vue')

export const templates: {[ type in TemplateType ]: () => Promise<any>} = {
  'home': homeBody,
  'markdown': genericBody,
  'project': projectBody,
  'projects': projectsBody,
}

export const pushRoute = (router: Router, url: string, route: Route) => {
  router.addRoute({
    name: route.displayName || url,
    path: `/${url}`,
    component: templates[route.type || 'markdown'],
  })

  if (route.type === 'projects') {
    router.addRoute({
      name: `${route.displayName || url}: project`,
      path: `/${url}/:id`,
      component: templates['project'],
      props: true,
    })
  }
}

export const pushAppRoutes = (router: Router, routes: AppRoutes) => {
  Object.keys(routes).forEach((url) => {
    pushRoute(router, url, routes[url])
  })
}

export const getRoute = (router: Router, url: string, route: Route) => {
  return router.getRoutes().find(other => other.name === (route.displayName || url))!
}

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
]

export const createRouter = () => vueCreateRouter({
  history: createWebHashHistory(),
  routes: appRoutes,
})
