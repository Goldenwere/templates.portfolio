<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/src/store'

import { doFiltersMatchTags } from '@/src/utilities/dom'

import { type FilterState } from '@/src/types/shared/filter'
import { type ProjectListingInfo } from '@/src/types/shared/project'
import { type ProjectsViewModel } from '@/src/types/views/projects'

import projectEmbed from '@/src/components/projects/projectEmbed.vue'
import projectsFilters from './projectsFilters.vue'

type EmbedReference = {
  el: HTMLElement,
  tags?: string[]
}

const store = useStore()

const content = ref({} as ProjectsViewModel)
const projects = ref({} as { [key: string]: ProjectListingInfo })
const ready = ref(false)
const projectEmbeds = ref({} as { [key: string]: EmbedReference })

/**
 * Assigns a reference to a project embed to handle toggling visbility when filters change
 * @param id the index of the embed being assigned to the id
 * @param tags the tags of the embed
 */
const setEmbedRef = (id: string, tags?: string[]) => {
  window.requestAnimationFrame(() => {
    projectEmbeds.value[id] = {
      el: document.querySelector(`#project_${id}`)!,
      tags,
    }
  })
}

/**
 * Handles changes to the filters panel
 * @param state the new filter state
 */
const onFilterStateChanged = (state: FilterState) => {
  Object.values(projectEmbeds.value).forEach((embed) => {
    const shown = doFiltersMatchTags(state, embed.tags)
    if (!!shown) {
      embed.el.classList.remove('hidden')
    } else {
      embed.el.classList.add('hidden')
    }
  })
}

const init = async () => {
  content.value = await store.getProjectsData()
  Promise.all(Object.keys(content.value.projects).map(async (id) => ({ id, info: await store.getProjectListingInfo(id) })))
  .then((_projects) => {
    _projects.forEach((_project) => {
      projects.value[_project.id] = _project.info
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
          v-for='(project, id) in projects'
          :info='project'
          :id='`project_${id}`'
          :projectId='id'
          :ref='el => setEmbedRef(id, project.tags)'
        )
    projectsFilters(
      v-if='content.filters'
      :filters='content.filters'
      :startingDepth='3'
      @filterStateChanged='onFilterStateChanged'
    )
</template>

<style scoped lang="sass">
.hidden
  opacity: 0.2
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
