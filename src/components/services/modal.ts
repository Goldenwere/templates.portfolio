import { Service } from './service';

/**
 * A service for displaying modals on the site
 */
export class ModalService extends Service<ModalService>() {
  /** whether or not the modal service is open */
  static _open?: boolean = false
  /** reference to the page document */
  static _document?: Document
  /** reference to the main modal outlet */
  static _modal?: HTMLDivElement
  /** reference to the container which displays modal content, a child of the container element */
  static _contentOutlet?: HTMLDivElement
  /** reference to the container element that is a direct child to the modal for the scrollbar/background */
  static _container?: HTMLDivElement
  /** reference to the button which closes the modal, a child of the container element */
  static _closeButton?: HTMLDivElement
  /** whether or not the modal service is initialized */
  static _initialized?: boolean = false

  static init(_window: Window) {
    if (!!this._initialized) {
      console.warn('the modal service is already initialized')
      return
    }

    this._document = _window.document

    // create the modal wrapper outlet element
    this._modal = _window.document.createElement('div')
    this._modal.id = 'modal-outlet'
    this._modal.setAttribute('state', 'closed')

    // create the modal body container and append to the modal wrapper outlet
    this._container = _window.document.createElement('div')
    this._container.classList.add('container')
    this._modal.appendChild(this._container)

    // create the close button and append to the modal body container
    this._closeButton = _window.document.createElement('div')
    this._closeButton.classList.add('close')
    this._closeButton.addEventListener('click', this.close)
    this._closeButton.innerHTML = 'CLOSE'
    this._container.appendChild(this._closeButton)

    // create the content outlet and append to the modal body container
    this._contentOutlet = _window.document.createElement('div')
    this._contentOutlet.classList.add('content')
    this._container.appendChild(this._contentOutlet)

    this._document.body.appendChild(this._modal)
    this._initialized = true
  }

  /**
   * Opens the modal (note that this will close any currently open modals)
   * @param content body to display within the modal
   */
  static open = (content: Node) => {
    if (!this._initialized) {
      console.error('the modal service has not yet been initialized')
      return
    }
    if (this._open) {
      this.close()
    }
    this._modal!.setAttribute('state', 'open')
    this._contentOutlet!.appendChild(content)
    this._open = true
  }

  /**
   * Closes the modal
   * @param event the close button event
   */
  static close = (event?: Event) => {
    event?.preventDefault()
    this._modal!.setAttribute('state', 'closed')
    this._contentOutlet!.innerHTML = ''
    this._open = false
  }
}