import { inflateDetailsElements } from './details'
import { inflateImageEmbeds } from './image'
import { inflateVideoEmbeds } from './video'

export const inflateEmbeds = (_window: Window) => {
  inflateDetailsElements(_window)
  inflateImageEmbeds(_window)
  inflateVideoEmbeds(_window)
}
