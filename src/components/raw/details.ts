export type DetailsAnimationState =
| 'idle'
| 'opening'
| 'closing'

/**
 * Queries for HTMLDetailsElement nodes and inflates them with extra functionality
 * @param _document the reference to the document
 */
export const inflateDetailsElements = (_document: Document) => {
  _document.querySelectorAll('details').forEach((_element) => {
    new DetailsElement(_element)
  })
}

/**
 * Inflates HTMLDetailsElement with extra functionality, namely animations
 */
export class DetailsElement {
  element: HTMLDetailsElement
  summary: HTMLElement
  content: HTMLElement
  animation: Animation | null = null
  animationState: DetailsAnimationState = 'idle'

  constructor(_element: HTMLDetailsElement) {
    this.element = _element
    this.summary = _element.querySelector('summary')!
    this.content = _element.querySelector('.content')!
    if (!this.summary) {
      console.error('Summary was not found on this <details> element; therefore, it cannot be inflated with animation, and may not be compliant with web standards')
    } else if (!this.content) {
      console.warn('Content was not found on this <details> element; therefore, it cannot be inflated with animation')
    } else {
      this.summary.addEventListener('click', (e) => this.onClick(e))
    }
  }

  /**
   * Handler for when the shrink/expand animations finish
   */
  onAnimationFinish(_isOpen: boolean) {
    this.element.open = _isOpen
    this.animation = null
    this.animationState = 'idle'
    this.element.style.height = this.element.style.overflow = ''
  }

  /**
   * Handler for user clicking the summary element
   */
  onClick(_event: Event) {
    console.log('clicked')
    _event.preventDefault()
    this.element.style.overflow = 'hidden'
    if (this.animationState === 'closing' || !this.element.open) {
      this.open()
    } else if (this.animationState === 'opening' || this.element.open) {
      this.shrink()
    }
  }

  /**
   * Shrinks the <details> block with animation
   */
  shrink() {
    this.animationState = 'closing'

    const startHeight = `${this.element.offsetHeight}px`
    const endHeight = `${this.summary.offsetHeight}px`

    if (!!this.animation) {
      this.animation.cancel()
    }

    this.animation = this.element.animate({
      height: [ startHeight, endHeight ]
    }, {
      duration: 400,
      easing: 'ease-out'
    })
    this.animation.onfinish = () => this.onAnimationFinish(false)
    this.animation.oncancel = () => this.animationState = 'idle'
  }

  /**
   * Prepares the <details> block for expanding
   */
  open() {
    this.element.style.height = `${this.element.offsetHeight}px`
    this.element.open = true
    window.requestAnimationFrame(() => this.expand())
  }

  /**
   * Expands the <details> block with animation
   */
  expand() {
    this.animationState = 'opening'

    const startHeight = `${this.element.offsetHeight}px`
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`

    if (!!this.animation) {
      this.animation.cancel();
    }

    this.animation = this.element.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    })

    this.animation.onfinish = () => this.onAnimationFinish(true)
    this.animation.oncancel = () => this.animationState = 'idle'
  }
}