import { inflateDetailsElements } from './details'
import { inflateVideoEmbeds } from './video'

export const inflateEmbeds = (_window: Window) => {
  inflateDetailsElements(_window)
  inflateVideoEmbeds(_window)
}
