import { Service } from './service';

export class ModalService extends Service<ModalService>() {
  static _open?: boolean = false
  static _document?: Document
  static _modal?: HTMLDivElement
  static _contentOutlet?: HTMLDivElement
  static _container?: HTMLDivElement
  static _closeButton?: HTMLDivElement
  static _initialized?: boolean = false

  static init(_window: Window) {
    this._document = _window.document

    this._modal = _window.document.createElement('div')
    this._modal.id = 'modal-outlet'
    this._modal.setAttribute('state', 'closed')

    this._container = _window.document.createElement('div')
    this._container.classList.add('container')
    this._modal.appendChild(this._container)

    this._closeButton = _window.document.createElement('div')
    this._closeButton.classList.add('close')
    this._closeButton.addEventListener('click', this.close)
    this._closeButton.innerHTML = 'CLOSE'
    this._container.appendChild(this._closeButton)

    this._contentOutlet = _window.document.createElement('div')
    this._contentOutlet.classList.add('content')
    this._container.appendChild(this._contentOutlet)

    this._document.body.appendChild(this._modal)
    
    this._initialized = true
  }

  static open = (content: Node) => {
    if (this._open) {
      this.close()
    }
    this._modal!.setAttribute('state', 'open')
    this._contentOutlet!.appendChild(content)
    this._open = true
  }

  static close = (event?: Event) => {
    event?.preventDefault()
    this._modal!.setAttribute('state', 'closed')
    this._contentOutlet!.innerHTML = ''
    this._open = false
  }
}