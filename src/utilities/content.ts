import { marked } from 'marked'
import rfdc from 'rfdc'
import yaml from 'js-yaml'

import { fetchAndParseYaml, fetchAndReturnText } from './fetch'

import {
  type AppStoreDefinition,
} from '@/src/store'
import {
  type ProjectContentInfo,
  type ProjectListingInfo,
} from '@/src/types/shared/project'
import { type ProjectsViewModel } from '@/src/types/views/projects'
import { type ProjectViewModel } from '@/src/types/views/project'

export const contentInfoRegex = new RegExp(/^(!CONTENT)({\n)((  .{0,}\n){0,})(})/gm)
export const listingInfoRegex = new RegExp(/^(!LISTING)({\n)((  .{0,}\n){0,})(})/gm)

export const deepCopy = rfdc()

/**
 * Retrieves the projects / portfolio page's data
 * @param store reference to the store instance
 * @returns projects page data
 */
export const loadProjects = async (store: AppStoreDefinition): Promise<ProjectsViewModel> => {
  return !!store.projectsContent
    ? store.projectsContent
    : fetchAndParseYaml(`/content/projects.yml`)
}

/**
 * Retrieves a project from either the store or from the 
 * @param store reference to the store instance
 * @returns the loaded project data
 */
export const getProject = async (store: AppStoreDefinition, id: string): Promise<ProjectViewModel> => {
  if (!!store.projectsByPath[id]) {
    return store.projectsByPath[id]
  } else {
    let projectsData = await loadProjects(store)
    return fetchAndReturnProject(projectsData.projects[id])
  }
}

/**
 * Fetches and builds a project from markdown
 * @param path the path of the markdown document to load
 * @returns the project parsed from the markdown document
 */
export const fetchAndReturnProject = async (path: string): Promise<ProjectViewModel> => {
  const document = await fetchAndReturnText(path)

  const contentInfoSrc = contentInfoRegex.exec(document)
  const listingInfoSrc = listingInfoRegex.exec(document)

  let contentInfo: ProjectContentInfo | undefined = undefined
  let listingInfo: ProjectListingInfo | undefined = undefined
  let content = document

  if (!!contentInfoSrc) {
    content = content.replace(contentInfoRegex, '')
    try {
      contentInfo = yaml.load(contentInfoSrc[3]) as any
    } catch (err) {
      console.log(err)
    }
  }
  if (!!listingInfoSrc) {
    content = content.replace(listingInfoRegex, '')
    try {
      listingInfo = yaml.load(listingInfoSrc[3]) as any
    } catch (err) {
      console.log(err)
    }
  }

  content = marked.parse(content)

  return patchSharedFields({
    content,
    contentInfo,
    listingInfo,
  })
}

/**
 * Checks for missing fields in a `Project`'s info fields and patches them with corresponding fields if defined in the other `Project`'s info fields.
 * For example, if the contentInfo is missing period, it will pull from listingInfo instead, if defined, and visa versa.
 * @param project the project model to patch
 */
export const patchSharedFields = async (project: Partial<ProjectViewModel>) => {
  const patched = deepCopy(project)
  if (!!patched.contentInfo) {
    if (!patched.contentInfo.period) {
      patched.contentInfo.period = patched.listingInfo?.period
    }
  }
  if (!!patched.listingInfo) {
    if (!patched.listingInfo.period) {
      patched.listingInfo.period = patched.contentInfo?.period
    }
  }
  return patched
}
