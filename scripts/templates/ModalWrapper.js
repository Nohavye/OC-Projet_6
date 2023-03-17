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
    /*  Permet de stocker les élements de la pages qui ne doivent
        plus recevoir le focus tant que la modale est affichée. */
    this._focusExcludedElements = null

    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      // Arrière plan de la modale.
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

      // Boite de dialogue.
      box: {
        _: document.createElement('div'),
        _attributes: {
          class: `${name}-modal`,

          style: `
            position: relative;
            padding: 35px;
            display: flex;
            flex-direction: column;
            gap: 35px;
          `
        },

        /*  En-tête contenant le titre et le bouton
            de fermeture de la modale. */
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
              click: this.#eventListeners.closeButton.click,
              keyup: this.#eventListeners.closeButton.keyup
            }
          }
        },

        // Zone destiner à acceuillir le contenu de la modale.
        contentArea: {
          _: document.createElement('div')
        }
      }
    }

    // Modification de l'en-tête en fonction de la présence d'un titre ou non.
    if (typeof (title) === 'undefined') {
      this._template.box.header.title._attributes.style += 'display: none;'
      this._template.box.header._attributes.style += 'position: absolute; top: 35px; right: 35px;'
    } else {
      this._template.box.header.title._.innerHTML = title
      this._template._attributes['aria-label'] = title
    }

    Template.build(this._template)
  }

  // Retourne le premier élément focusable du parent spécifié.
  #getFirstFocusableElement (parent) {
    const firstFocusableElement = parent.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0]
    console.log(firstFocusableElement)
    return firstFocusableElement
  }

  // Fonctions liées au évènements de la modale.
  #eventListeners = {

    // Fermeture de la modale au clique et sur pression
    // de la touche 'Enter' sur le bouton de fermeture.
    closeButton: {
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
    /*  Ecouter l'évènement 'closeEvent' sur le contenu ajouté pour
        une fermeture de la modale sur appui de la touche 'Echap'. */
    element.addEventListener('closeEvent', () => {
      this.hide()
    })
    this._template.box.contentArea._.appendChild(element)
  }

  /**
   * Affiche la fenêtre modale.
   */
  show (focusExcludedElements) {
    // Mémoriser l'élément qui détient le focus sur la page courante.
    this._focusedElement = document.activeElement

    // Si des éléments à exclure du focus sont définis.
    if (typeof (focusExcludedElements) !== 'undefined') {
      // Mémoriser ses éléments.
      this._focusExcludedElements = focusExcludedElements

      // Rendre ses éléments non focusables.
      this._focusExcludedElements.forEach((element) => {
        element.setAttribute('tabindex', '-1')
      })
    }

    // Afficher la modale.
    this._template._.style.display = 'flex'

    // Donner le focus au premier élément focusable du contenu de la modale.
    this.#getFirstFocusableElement(this._template.box.contentArea._).focus()
  }

  /**
   * Masque la fenêtre modale.
   */
  hide () {
    // Si des éléments non focusables ont été définis.
    if (this._focusExcludedElements !== null) {
      // Rendre ses éléments de nouveau focusables.
      this._focusExcludedElements.forEach((element) => {
        element.setAttribute('tabindex', '0')
      })
    }

    // Cacher la modale.
    this._template._.style.display = 'none'

    // Restituer le focus à l'élément qui le détennait avant ouverture de la modale.
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
