import { DateRange } from './dateRange'
import { Link } from './link'
import { Tag } from './tag'

/**
 * Shared information between projects.
 * Information here can be set in either `!LISTING{}` or `!CONTENT{}`, with `!LISTING{}` taking priority
 */
export type ProjectSharedInfo = {
  /**
   * When defined, the period will be displayed as {from} - {to}
   */
  period?: DateRange
}

/**
 * This describes aditional information about a project.
 * to display when listing the project on the portfolio page.
 * At minimum, the title should be specified.
 * 
 * To define ProjectListingInfo, use the `!LISTING{}` declaration in your markdown document, populating the fields from this type in YAML
 * @example
 * // defining ProjectContentInfo in markdown
 * !LISTING{
 *   period:
 *     from: '2020-05'
 *     to: '2021-06'
 *   title: 'Example title'
 *   caption: 'An XYZ Project'
 *   summary: |
 *     - 'Some short summary of the project'
 *     - 'Described in markdown'
 *   thumbnailBackground: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
 *   tags:
 *   - 'filtera'
 *   - 'filterb'
 *   - 'filterc'
 * }
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
 * while any other property key will simply be displayed as-is.
 * 
 * To define ProjectContentInfo, use the `!CONTENT{}` declaration in your markdown document, populating the fields from this type in YAML
 * @example
 * // defining ProjectContentInfo in markdown
 * !PROJECT{
 *   period:
 *     from: '2020-05'
 *     to: '2021-06'
 *   tags:
 *   - displayName: 'c#'
 *     className: 'cs'
 *   - 'gitlab'
 *   places:
 *   - caption: 'Example link'
 *     href: 'https://ecosia.org'
 *   // extra fields will be pulled as is
 *   alternateName: 'Project Title goes here'
 *   company: 'My Company'
 *   role: 'Creator / Developer'
 * }
 */
export type ProjectContentInfo = {
  /**
   * When defined, tags will which will create styled elements for each tag.
   * If passed as a string, it will create an element with both the displayed name and the CSS class selector as the string.
   * If passed as an object, it will create an element with the specified display name and CSS class selector
   */
  tags?: Tag[]
  /**
   * When defined, this will create a section below the table with the list of links passed through
   */
  places?: Link[]
} & { [key: string]: string }
