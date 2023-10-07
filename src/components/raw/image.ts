import { ModalService } from '@/src/components/services/modal'

export const inflateImageEmbeds = (_window: Window) => {
  _window.document.querySelectorAll('img').forEach((_element) => {
    new ImageElement(_element, _window)
  })
}

export class ImageElement {
  element: HTMLImageElement
  caption: HTMLParagraphElement | null = null
  wrapper: HTMLDivElement
  constructor(_element: HTMLImageElement, _window: Window) {
    this.element = _element
    this.wrapper = window.document.createElement('div')
    this.wrapper.classList.add('embed')
    this.element.insertAdjacentElement('beforebegin', this.wrapper)
    this.wrapper.appendChild(this.element)
    if (!!this.element.title) {
      this.caption = window.document.createElement('p')
      this.wrapper.appendChild(this.caption)
      this.caption.innerHTML = this.element.title
    }
    this.element.addEventListener('click', this.onClick)
  }

  onClick = (event: Event) => {
    event.preventDefault()
    let cloned = this.wrapper.cloneNode(true) as HTMLElement
    let image = cloned.firstChild as HTMLElement
    image.removeEventListener('click', this.onClick)
    ModalService.open(cloned)
  }
}
