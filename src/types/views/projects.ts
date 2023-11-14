import { type FilterDefinition, type ProjectFilterCategory } from 'src/types/shared/filter'

/**
 * The resulting model of the /content/projects.yml file
 */
export type ProjectsViewModel = {
  /**
   * Defines filters a page visitor can use to highlight projects based on their `tags`
   */
  filters?: FilterDefinition[] | ProjectFilterCategory[]
  /**
   * Defines the projects to list on the projects / portfolio page.
   * 
   * This is stored as a key-value object, where:
   * - the key is the id of the project used when navigating to the individual project page
   * (i.e. `<site root>/project/<id>` in the browser)
   * - the value is the url to the directory the project is stored; the id will be appended
   * (e.g. setting `<site root>/content/projects` will resolve projects to `<site root>/content/projects/<id>.<md|yml>`)
   */
  projects: { [id: string]: string }
}
