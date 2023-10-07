export type DetailsAnimationState =
| 'idle'
| 'opening'
| 'closing'

/**
 * Queries for HTMLDetailsElement nodes and inflates them with extra functionality
 * @param _window the reference to the window
 */
export const inflateDetailsElements = (_window: Window) => {
  const styles = window.getComputedStyle(_window.document.documentElement)
  const options: KeyframeAnimationOptions = {
    duration: Number(styles.getPropertyValue('--theme-transition-duration')?.replace('s', '') || 0.5) * 1000,
    easing: styles.getPropertyValue('--theme-transition-function') || 'ease-in-out',
  }

  _window.document.querySelectorAll('details').forEach((_element) => {
    new DetailsElement(_element, options)
  })
}

/**
 * Inflates HTMLDetailsElement with extra functionality, namely animations
 */
export class DetailsElement {
  animationOptions?: KeyframeAnimationOptions
  element: HTMLDetailsElement
  summary: HTMLElement
  content: HTMLElement
  animation: Animation | null = null
  animationState: DetailsAnimationState = 'idle'

  constructor(_element: HTMLDetailsElement, _animationOptions?: KeyframeAnimationOptions) {
    this.element = _element
    this.summary = _element.querySelector('summary')!
    this.content = _element.querySelector('.content')!
    if (!this.summary) {
      console.error('Summary was not found on this <details> element; therefore, it cannot be inflated, and may not be compliant with web standards')
    } else if (!this.content) {
      console.warn('Content was not found on this <details> element; therefore, it cannot be inflated')
    } else {
      this.summary.addEventListener('click', (e) => this.onClick(e))
      this.animationOptions = _animationOptions
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
    }, this.animationOptions)

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
      height: [ startHeight, endHeight ]
    }, this.animationOptions)

    this.animation.onfinish = () => this.onAnimationFinish(true)
    this.animation.oncancel = () => this.animationState = 'idle'
  }
}