import { type ProjectListingInfo } from './project'

/**
 * Defines a filter category in the filters panel
 */
export type ProjectFilterCategory = {
  /**
   * The heading of the category
   */
  heading: string
  /**
   * The filters associated with the category, or more categories
   */
  filters: FilterDefinition[] | ProjectFilterCategory[]
}

/**
 * Defines a filter for a project
 */
export type FilterDefinition = {
  /**
   * The name to display in the filters panel
   */
  displayName: string
  /**
   * The tag which the filter corresponds to for when defined in {@link ProjectListingInfo.tags}
   */
  tag: string
}

export type FilterChangeEvent = {
  tag: string
  value: boolean
}

export type FilterState = { [tag: string]: boolean }
