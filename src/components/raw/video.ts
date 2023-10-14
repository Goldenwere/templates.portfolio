import { findFirstMatchingChild } from '@/src/utilities/dom'

/**
 * Queries for iframe, video, or object nodes and inflates them with extra functionality
 * @param _window the reference to the window
 */
export const inflateVideoEmbeds = (_window: Window) => {
  _window.document.querySelectorAll('.video').forEach((_element) => {
    new VideoElement(_element)
  })
}

/**
 * Inflates iframe, video, or object elements with extra functionality, namely embed styles
 */
export class VideoElement {
  element: Element
  videoElement: HTMLIFrameElement | HTMLVideoElement | HTMLObjectElement

  constructor(_element: Element) {
    this.element = _element
    this.videoElement = findFirstMatchingChild(_element, 'iframe', 'video', 'object') as any
    if (!this.videoElement) {
      console.warn('A video embed was defined but contained no video elements within it')
    } else {
      this.element.classList.add('embed', 'video')
    }
  }
}
