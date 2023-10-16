import { inflateDescriptionListEmbeds } from './descriptionList'
import { inflateDetailsElements } from './details'
import { inflateImageEmbeds } from './image'
import { inflateVideoEmbeds } from './video'

import { type ProjectListingInfo } from '@/src/types/shared/project'

/**
 * Inflates various supported embeds
 * @param _window the reference to the window
 */
export const inflateEmbeds = (_window: Window, _projectInfo?: ProjectListingInfo) => {
  inflateDescriptionListEmbeds(_window, _projectInfo)
  inflateDetailsElements(_window)
  inflateImageEmbeds(_window)
  inflateVideoEmbeds(_window)
}
