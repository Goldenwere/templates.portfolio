import { defineStore } from 'pinia'

import { fetchAndParseMarkdown, fetchAndParseYaml } from '@/src/utilities/fetch'

import { type ProjectsViewModel } from '@/src/types/views/projects'
import { type ProjectListingInfo, type ProjectStoreEntry } from '@/src/types/shared/project'

export const useStore = defineStore('store', {
  state: () => ({
    /** project content keyed by id; note that directly referencing this prop can return undefined */
    _projectsById: {} as { [key: string]: ProjectStoreEntry },
    /** content of the projects/portfolio page; note that directly referencing this prop can return undefined */
    _projectsData: null as unknown as ProjectsViewModel,
    projectFilters: {} as { [tag: string]: boolean },
  }),
  actions: {
    /**
     * Retrieves the projects / portfolio page's data
     * @param store reference to the store instance
     * @returns projects page data
     */
    async getProjectsData() {
      if (!!this._projectsData) {
        return this._projectsData
      } else {
        this._projectsData = await fetchAndParseYaml(`/content/projects.yml`)
        return this._projectsData
      }
    },

    /**
     * Retrieves a project by its id
     * @param id the id of the project
     * @returns the project
     */
    getProject(id: string) {
      if (!this._projectsById[id]) {
        this._projectsById[id] = {}
      }
      return this._projectsById[id]
    },

    /**
     * Retrieves project listing info from either the store or from the yml file
     * @param store reference to the store instance
     * @param id the id of the project
     * @returns the loaded project listing information
     */
    async getProjectListingInfo(id: string) {
      const project = this.getProject(id)
      if (!!project.listing) {
        return project.listing
      } else {
        const projectsData = await this.getProjectsData()
        this._projectsById[id].listing = await fetchAndParseYaml(`${projectsData.projects[id]}/${id}.yml`)
        return this._projectsById[id].listing as ProjectListingInfo
      }
    },

    /**
     * Retrieves a project from either the store or from the markdown file
     * @param store reference to the store instance
     * @param id the id of the project
     * @returns the loaded project content
     */
    async getProjectContent(id: string) {
      const project = this.getProject(id)
      if (!!project.content) {
        return project.content
      } else {
        let projectsData = await this.getProjectsData()
        this._projectsById[id].content = await fetchAndParseMarkdown(`${projectsData.projects[id]}/${id}.md`)
        return this._projectsById[id].content as string
      }
    },
  }
})

export type AppStoreDefinition = Omit<
  ReturnType<typeof useStore>,
  keyof ReturnType<typeof defineStore>
>
