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
  }
}
