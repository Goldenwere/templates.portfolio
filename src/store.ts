import { defineStore } from 'pinia'

import { fetchAndParseMarkdown, fetchAndParseYaml } from 'src/utilities/fetch'

import type { AppViewModel } from 'src/types/views/app'
import type { HomeViewModel } from 'src/types/views/home'
import type { ProjectsViewModel } from 'src/types/views/projects'
import type { ProjectListingInfo, ProjectStoreEntry } from 'src/types/shared/project'

export const useStore = defineStore('store', {
  state: () => ({
    _appData: null as AppViewModel | null,
    _homeData: null as {
      config: HomeViewModel,
      content: string,
    } | null,

    /** project content keyed by id; note that directly referencing this prop can return undefined */
    _projectsById: {} as { [url: string]: { [id: string]: ProjectStoreEntry} },
    /** content of the projects/portfolio page; note that directly referencing this prop can return undefined */
    _projectsData: {} as { [url: string]: ProjectsViewModel | null },
    _contentById: {} as { [url: string]: string }
  }),
  actions: {
    /**
     * Retrieves the app's main config
     * @returns app config
     */
    async getAppData(): Promise<AppViewModel> {
      if (!this._appData) {
        const config: AppViewModel = await fetchAndParseYaml('/content/app.yml')
        this._appData = config
      }
      return this._appData
    },

    /**
     * Retrieves the home page's data
     * @returns home page data
     */
    async getHomeData() {
      if (!!this._homeData) {
        return this._homeData
      } else {
        const config: HomeViewModel = await fetchAndParseYaml(`/content/home.yml`)
        const content = await fetchAndParseMarkdown(`/content/home.md`)
        this._homeData = {
          config,
          content,
        }
        return this._homeData
      }
    },

    /**
     * Retrieves the projects / portfolio page's data
     * @returns projects page data
     */
    async getProjectsData(url: string) {
      if (!!this._projectsData[url]) {
        return this._projectsData[url]
      } else {
        this._projectsData[url] = await fetchAndParseYaml(this._appData!.routes[url].configUrl!)
        return this._projectsData[url]
      }
    },

    /**
     * Retrieves a project by its id
     * @param id the id of the project
     * @returns the project
     */
    getProject(url: string, id: string) {
      if (!this._projectsById[url]) {
        this._projectsById[url] = {}
      }
      if (!this._projectsById[url][id]) {
        this._projectsById[url][id] = {}
      }
      return this._projectsById[url][id]
    },

    /**
     * Retrieves project listing info from either the store or from the yml file
     * @param id the id of the project
     * @returns the loaded project listing information
     */
    async getProjectListingInfo(url: string, id: string) {
      const project = this.getProject(url, id)
      if (!!project.listing) {
        return project.listing
      } else {
        const projectsData = await this.getProjectsData(url)
        this._projectsById[url][id].listing = await fetchAndParseYaml(`${projectsData!.projects[id]}/${id}.yml`)
        return this._projectsById[url][id].listing as ProjectListingInfo
      }
    },

    /**
     * Retrieves a project from either the store or from the markdown file
     * @param id the id of the project
     * @returns the loaded project content
     */
    async getProjectContent(url: string, id: string) {
      const project = this.getProject(url, id)
      if (!!project.content) {
        return project.content
      } else {
        let projectsData = await this.getProjectsData(url)
        this._projectsById[url][id].content = await fetchAndParseMarkdown(`${projectsData!.projects[id]}/${id}.md`)
        return this._projectsById[url][id].content as string
      }
    },

    /**
     * Retrieves generic content from the markdown file associated with a given url
     * @param url the url of the route
     * @returns the markdown content
     */
    async getGenericContent(url: string) {
      if (!!this._contentById[url]) {
        return this._contentById[url]
      } else {
        const appData = await this.getAppData()
        this._contentById[url] = await fetchAndParseMarkdown(`${appData.routes[url].contentUrl}`)
        return this._contentById[url]
      }
    }
  }
})

export type AppStoreDefinition = Omit<
  ReturnType<typeof useStore>,
  keyof ReturnType<typeof defineStore>
>
