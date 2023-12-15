import { ModalService } from 'src/components/services/modal'

/**
 * Queries for HTMLImageElement nodes and inflates them with extra functionality
 * @param _window the reference to the window
 */
export const inflateImageEmbeds = (_window: Window) => {
  _window.document.querySelectorAll('.content img:not(.no-inflate)').forEach((_element) => {
    new ImageElement(_element as HTMLImageElement, _window)
  })
}

/**
 * Inflates HTMLImageElement with extra functionality,
 * namely previewing images in the modal service and displaying captions from titles
 */
export class ImageElement {
  element: HTMLImageElement
  caption: HTMLParagraphElement | null = null
  wrapper: HTMLDivElement

  constructor(_element: HTMLImageElement, _window: Window) {
    this.element = _element
    const parent = this.element.parentElement!
    this.wrapper = _window.document.createElement('div')
    this.wrapper.classList.add('embed', 'image')
    const subWrapper = _window.document.createElement('div')
    subWrapper.classList.add('image-wrapper')
    parent.appendChild(this.wrapper)
    this.wrapper.appendChild(subWrapper)
    subWrapper.appendChild(this.element)
    if (!!this.element.title) {
      this.caption = _window.document.createElement('p')
      this.wrapper.appendChild(this.caption)
      this.caption.innerHTML = this.element.title
    }
    this.element.addEventListener('click', this.onClick)
  }

  /**
   * Handler for when the image is clicked
   * @param event the click event
   */
  onClick = (event: Event) => {
    event.preventDefault()
    let cloned = this.wrapper.cloneNode(true) as HTMLElement
    let image = cloned.firstChild as HTMLElement
    image.removeEventListener('click', this.onClick)
    ModalService.open(cloned)
  }
}
