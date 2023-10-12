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

/**
 * Whenever a filter is toggled in the filters panel, this holds the data regarding that change
 */
export type FilterChangeEvent = {
  /**
   * The tag that the filter is associated with
   */
  tag: string
  /**
   * The toggle state of the filter
   */
  value: boolean
}

/**
 * Defines the state of the filters panel
 */
export type FilterState = { [tag: string]: boolean }
