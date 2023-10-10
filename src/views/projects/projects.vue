<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/src/store'
import { fetchAndReturnProject, loadProjects } from '@/src/utilities/content'

import { type ProjectListingInfo } from '@/src/types/shared/project'
import { type ProjectsViewModel } from '@/src/types/views/projects'

import projectEmbed from '@/src/components/projects/projectEmbed.vue'

const store = useStore()
const content = ref({} as ProjectsViewModel)
const projects = ref([] as ProjectListingInfo[])
const ready = ref(false)

const init = async () => {
  content.value = await loadProjects(store)
  Promise.all(Object.keys(content.value.projects).map((id) => fetchAndReturnProject(content.value.projects[id])))
  .then((_projects) => {
    _projects.forEach((_project) => {
      if (!!_project.listingInfo) {
        projects.value.push(_project.listingInfo)
      }
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
    section.filters
      h2 Filters
</template>

<style scoped lang="sass">
.content
  display: flex
  .projects-grid
    flex: 1 1 auto
  .filters
    flex: 0 0 16em
.projects-grid
  .grid
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr))
</style>
