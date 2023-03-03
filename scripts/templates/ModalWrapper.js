import { _Template } from './_Template.js'

export class ModalWrapper extends _Template {
  constructor (name, title) {
    super()
    this.#initElement(name, title)
    this._create(this.#_modalWrapper)
  }

  #initElement (name, title) {
    // Init Titre
    if (typeof (title) === 'undefined') {
      this.#_modalWrapper.box.header.title._attributes.style += 'display: none;'
      this.#_modalWrapper.box.header._attributes.style += 'position: absolute; top: 35px; right: 35px;'
    } else {
      this.#_modalWrapper.box.header.title._element.innerHTML = title
    }

    // Création de classes
    this.#_modalWrapper.box._attributes.class = `${name}-modal`
  }

  hide () {
    this.#_modalWrapper._element.style.display = 'none'
  }

  show () {
    this.#_modalWrapper._element.style.display = 'flex'
  }

  addContent (element) {
    this.#_modalWrapper.box.contentBox._element.appendChild(element)
  }

  setCloseButton (filePath) {
    this.#_modalWrapper.box.header.closeButton._element.src = filePath
  }

  get element () {
    return this.#_modalWrapper._element
  }

  #_modalWrapper = {
    _element: document.createElement('div'),
    _attributes: {

      style: `
        position: fixed; z-index: 1;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(255, 255, 255, 0.75);
        
        display: none;
        align-items: center;
        justify-content: center;
      `
    },

    box: {
      _element: document.createElement('div'),
      _attributes: {

        style: `
          position: relative;
          
          padding: 35px;

          display: flex;
          flex-direction: column;
          gap: 35px;
        `
      },

      header: {
        _element: document.createElement('header'),
        _attributes: {

          style: `
            height: max-content;
            display: flex;
            align-items: start;
          `
        },

        title: {
          _element: document.createElement('h2'),
          _attributes: {

            style: `
              font-size: 48px;
              font-weight: normal;
              text-align: left;
            `
          }
        },

        closeButton: {
          _element: document.createElement('img'),
          _attributes: {
            src: 'assets/icons/close_colortheme.svg',

            style: `
              cursor: pointer;
            `
          },
          _events: {
            click: () => {
              this.hide()
            }
          }
        }
      },

      contentBox: {
        _element: document.createElement('div')
      }
    }
  }
}
