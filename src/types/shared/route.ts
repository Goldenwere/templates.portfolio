export enum TemplateType {
  /** 
   * Corresponds to the `HomeViewModel`,
   * pulls in config for featured projects,
   * additionally loads a markdown document to display content.
   * Note that '/' will look for home.md/home.yml by default, so defining it is unneccessary.
   */
  'home' = 'home',
  /**
   * Corresponds to the `ProjectsViewModel`,
   * loads array of projects and set of filters to link to various projects.
   */
  'projects' = 'projects',
  /**
   * Pulls a config of type `ProjectListingInfo`
   * and loads a markdown document to display content,
   * using the loaded `ProjectListingInfo` to perform some additional markdown inflation.
   * Projects that are already listed under a `'projects'` template do not need to be specified manually;
   * this is moreso for allowing navigation to unlisted projects.
   */
  'project' = 'project',
  /**
   * Generic template with no config
   * which simply loads a markdown document with standard inflation.
   */
  'markdown' = 'markdown',
}

export type Route = {
  /**
   * The url to the config (.yml/.yaml) for this route.
   * This is required for the following `TemplateType`s:
   * - `home`
   * - `projects`
   * - `project`
   */
  configUrl?: string
  /**
   * The path to the content (.md)
   * This is required for the following `TemplateType`s:
   * - `home`
   * - `markdown`
   */
  contentUrl?: string
  /**
   * What the route will be displayed as in the tab title, site navigation, etc.
   * If left unset, this will default to `url` instead
   */
  displayName?: string
  /**
   * Whether to hide (true) or show (false/unset) the route from global navigation header.
   * These urls can still be navigated to directly, but will not show in the site's header.
   */
  hidden?: boolean
  /**
   * The type of route view to load. Defaults to 'markdown'
   */
  type?: TemplateType
}

/**
 * Defines a route for the app,
 * where each key is the url this route should load in the browser.
 * The app will append `/` automatically.
 * This url also acts as an id for the route for when the user navigates directly to the url
 * before loading the app.
 * @example
 * // router will set <your-site-url>/portfolio in the browser
 * 'portfolio':
 *   // define Route here...
 */
export type AppRoutes = { [url: string]: Route }
