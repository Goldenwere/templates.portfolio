import { DateRange } from './dateRange'

/**
 * This describes aditional information about a project.
 * to display when listing the project on the portfolio page.
 * At minimum, the title should be specified.
 */
export type ProjectListingInfo = {
  /**[Supports Markdown]
   * Caption displayed below the title of the project on the projects page
   */
  caption?: string
  /**
   * When defined, the period will be displayed as {from} - {to}
   */
  period?: DateRange
  /**[Supports Markdown]
   * Information to summarize a project
   */
  summary?: string
  /**
   * Tags that correspond to project filters on the portfolio page if defined
   */
  tags?: string[]
  /**[Supports Markdown]
   * The title of the project
   */
  title: string
  /**[CSS:background]
   * Background image, repeat, attachment, and position for the project
   */
  thumbnailBackground?: string
  /**[CSS:background-size]
   * Background image size
   */
  thumbnailBackgroundSize?: string
}

/**
 * This concatenates project files for entry within the store.
 */
export type ProjectStoreEntry = {
  /**
   * Content pulled from the projects' markdown (.md) file
   */
  content?: string

  /**
   * Listing information pulled from the projects' yaml (.yml) file
   */
  listing?: ProjectListingInfo
}
