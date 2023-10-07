import { inflateDetailsElements } from './details'
import { inflateImageEmbeds } from './image'
import { inflateVideoEmbeds } from './video'

/**
 * Inflates various supported embeds
 * @param _window the reference to the window
 */
export const inflateEmbeds = (_window: Window) => {
  inflateDetailsElements(_window)
  inflateImageEmbeds(_window)
  inflateVideoEmbeds(_window)
}
