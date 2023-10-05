import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

const homeBody = () => import ('./views/home/home.vue')
const projectBody = () => import ('./views/project/project.vue')

export const siteRoutes: RouteRecordRaw[] = [
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: siteRoutes,
})

export default router
