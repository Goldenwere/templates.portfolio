import { DateRange } from './dateRange'
import { Link } from './link'
import { Tag } from './tag'

/**
 * This describes aditional information about a project
 * to display when listing the project on the portfolio page.
 * At minimum, the title should be specified.
 */
export type ProjectListingInfo = {
  /**[Supports Markdown]
   * Caption displayed below the title of the project on the projects page
   */
  caption?: string
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
   * Background image for the project
   */
  thumbnailBackground?: string
}

/**
 * This describes additional information about a project
 * which can populate an informational table at the top of the project page.
 * This should be a simple 1-level key-value object.
 * There are certain property keys that when defined will populate the table a bit differently,
 * while any other property key will simply be displayed as-is
 */
export type ProjectContentInfo = {
  /**
   * When defined, tags will which will create styled elements for each tag.
   * If passed as a string, it will create an element with both the displayed name and the CSS class selector as the string.
   * If passed as an object, it will create an element with the specified display name and CSS class selector
   */
  tags?: Tag[]
  /**
   * When defined, the period will be displayed as {from} - {to}
   */
  period?: DateRange
  /**
   * When defined, this will create a section below the table with the list of links passed through
   */
  places?: Link[]
} & { [key: string]: string }
