import Template from './Template.js'

class ModalWrapper {
  constructor (name, title) {
    this._template = {
      _: document.createElement('div'),
      _attributes: {

        style: `
          position: fixed; z-index: 1;
          top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(255, 255, 255, 0.85);
          
          display: none;
          align-items: center;
          justify-content: center;
        `
      },

      box: {
        _: document.createElement('div'),
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
          _: document.createElement('header'),
          _attributes: {

            style: `
              height: max-content;
              display: flex;
              align-items: start;
            `
          },

          title: {
            _: document.createElement('h2'),
            _attributes: {

              style: `
                font-size: 48px;
                font-weight: normal;
                text-align: left;
              `
            }
          },

          closeButton: {
            _: document.createElement('img'),
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
          _: document.createElement('div')
        }
      }
    }

    // Init Titre
    if (typeof (title) === 'undefined') {
      this._template.box.header.title._attributes.style += 'display: none;'
      this._template.box.header._attributes.style += 'position: absolute; top: 35px; right: 35px;'
    } else {
      this._template.box.header.title._.innerHTML = title
    }

    // Création de classes
    this._template.box._attributes.class = `${name}-modal`

    // Construire Template
    Template.build(this._template)
  }

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  setCloseButtonImage (filePath) {
    this._template.box.header.closeButton._.src = filePath
  }

  addContent (element) {
    this._template.box.contentBox._.appendChild(element)
  }

  show () {
    this._template._.style.display = 'flex'
  }

  hide () {
    this._template._.style.display = 'none'
  }

  get element () {
    return this._template._
  }
}

export { ModalWrapper as default }
