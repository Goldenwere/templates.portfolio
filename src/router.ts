import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

const homeBody = () => import ('./views/home/home.vue')
const projectBody = () => import ('./views/project/project.vue')
const projectsBody = () => import ('./views/projects/projects.vue')

export const siteRoutes: { [name: string]: Partial<RouteRecordRaw> } = {
  'Home': {
    path: '/',
  },
  'Projects': {
    path: '/projects',
  },
}

export const allRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
  {
    path: '/project/:id',
    component: projectBody,
    name: 'project',
    props: true,
  },
  {
    path: '/projects',
    component: projectsBody,
    name: 'projects',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
})

export default router
