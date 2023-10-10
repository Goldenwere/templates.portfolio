import { type ProjectListingInfo } from './project'

/**
 * Potentially recursive definition of filters whose tags correspond to the tags assigned to projects listing information
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
 * Defines a filter
 */
export type FilterDefinition = {
  /**
   * The name to display
   */
  displayName: string
  /**
   * The tag which corresponds to {@link ProjectListingInfo}
   */
  tag: string
}
