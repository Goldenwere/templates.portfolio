<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/src/store'

import { type ProjectListingInfo } from '@/src/types/shared/project'
import { type ProjectsViewModel } from '@/src/types/views/projects'

import projectEmbed from '@/src/components/projects/projectEmbed.vue'
import projectsFilters from './projectsFilters.vue'

const store = useStore()
const content = ref({} as ProjectsViewModel)
const projects = ref([] as ProjectListingInfo[])
const ready = ref(false)

const init = async () => {
  content.value = await store.getProjectsData()
  Promise.all(Object.keys(content.value.projects).map((id) => store.getProjectListingInfo(id)))
  .then((_projects) => {
    _projects.forEach((_project) => {
      projects.value.push(_project)
    })
    ready.value = true
  })
}

init()
</script>

<template lang="pug">
.projects
  .content(
    v-if='ready'
  )
    section.projects-grid#projects
      h2 Projects
      .grid
        projectEmbed(
          v-for='project in projects'
          :info='project'
        )
    projectsFilters(
      v-if='content.filters'
      :filters='content.filters'
      :startingDepth='3'
    )
</template>

<style scoped lang="sass">
.content
  display: flex
  .projects-grid
    flex: 1 1 auto
  #filters
    flex: 0 0 16em
.projects-grid
  .grid
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr))
</style>
