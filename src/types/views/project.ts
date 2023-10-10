import {
  type ProjectContentInfo,
  type ProjectListingInfo,
} from '@/src/types/shared/project'

/**
 * The resulting model interpreted from the markdown body.
 * YAML markup wrapped in a `!<DECLARATION>{}` will be pulled into their respective fields in this model.
 * All remaining content will be stored into the `content` field in this model.
 */
export type Project = {
  /**
   * The remaining markdown body of the project
   */
  content?: string
  /**
   * Project page info `!CONTENT{}`
   */
  contentInfo?: ProjectContentInfo
  /**
   * Portfolio page project listing info `!PROJECT{}`
   */
  listingInfo?: ProjectListingInfo
}
