import {
  type ProjectContentInfo,
  type ProjectListingInfo,
} from '@/src/types/shared/project'

export type Project = {
  /**[.md -> MARKDOWN]
   * The remaining markdown body of the project
   */
  content?: string
  /**[.md -> !PROJECT{}]
   * Project page info
   */
  contentInfo?: ProjectContentInfo
  /**[.md -> !LISTING{}]
   * Portfolio page project listing info
   */
  listingInfo?: ProjectListingInfo
}
