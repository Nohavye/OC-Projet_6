import Template from './Template.js'

/**
 * Classe pour créer et gérer une fenêtre modale.
 * @class
 */
class ModalWrapper {
  /**
   * Crée une instance de ModalWrapper.
   * @constructor
   * @param {string} name - Le nom de la fenêtre modale pour ajouter une classe CSS personnalisée.
   * @param {string} [title] - Le titre de la fenêtre modale.
   */
  constructor (name, title) {
    this._tabExcludedElements = null

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        role: 'dialog',

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
              justify-content: space-between;
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

              title: 'Fermer la fenêtre',
              alt: 'Fermer la fenêtre',
              role: 'button',
              tabindex: '0',
              style: 'cursor: pointer;'
            },
            _events: {
              click: () => {
                this.hide()
              },

              keyup: (e) => {
                if (e.key === 'Enter') {
                  this.hide()
                }
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
      this._template._attributes['aria-label'] = title
    }

    // Création de classes
    this._template.box._attributes.class = `${name}-modal`

    // Construire Template
    Template.build(this._template)
  }

  /**
   * Ajoute la fenêtre modale au parent spécifié.
   * @param {HTMLElement} parent - L'élément parent où la fenêtre modale doit être ajoutée.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Définit l'image du bouton de fermeture.
   * @param {string} filePath - Le chemin de l'image à définir pour le bouton de fermeture.
   */
  setCloseButtonImage (filePath) {
    this._template.box.header.closeButton._.src = filePath
  }

  /**
   * Ajoute le contenu spécifié à la fenêtre modale.
   * @param {HTMLElement} element - L'élément à ajouter au contenu de la fenêtre modale.
   */
  addContent (element) {
    element.addEventListener('closeEvent', () => {
      this.hide()
    })
    this._template.box.contentBox._.appendChild(element)
  }

  /**
   * Affiche la fenêtre modale.
   */
  show (tabExcludedElements) {
    this._focusedElement = document.activeElement

    if (typeof (tabExcludedElements) !== 'undefined') {
      this._tabExcludedElements = tabExcludedElements

      this._tabExcludedElements.forEach((element) => {
        element.setAttribute('tabindex', '-1')
      })
    }

    this._template._.style.display = 'flex'

    // this._template.box.contentBox._.childNodes[0].focus()
    this.#getFirstFocusableElement(this._template.box.contentBox._).focus()
  }

  #getFirstFocusableElement (parent) {
    const firstFocusableElement = parent.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0]
    console.log(firstFocusableElement)
    return firstFocusableElement
  }

  /**
   * Masque la fenêtre modale.
   */
  hide () {
    if (this._tabExcludedElements !== null) {
      this._tabExcludedElements.forEach((element) => {
        element.setAttribute('tabindex', '0')
      })
    }

    this._template._.style.display = 'none'
    this._focusedElement.focus()
  }

  /**
   * L'élément DOM de la fenêtre modale.
   * @returns {HTMLElement} - L'élément HTML de la fenêtre modale.
   */
  get element () {
    return this._template._
  }
}

export { ModalWrapper as default }
