import { Template } from './Template.js'

/**
 * Classe représentant un élément d'entrée de formulaire.
 */
class InputElement {
  /**
   * Constructeur de la classe InputElement.
   * @param {string} tag - La balise HTML de l'élément d'entrée.
   * @param {string} label - Le texte du label associé à l'élément d'entrée.
   * @param {object} attributes - Les attributs de l'élément d'entrée.
   */
  constructor (tag, label, attributes) {
    this._template = {
      _: document.createElement('div'),
      _attributes: {
        style: `
          display: flex;
          flex-direction: column;
          width: 100%;
        `
      },

      label: {
        _: document.createElement('label'),
        _textContent: label,
        _attributes: { for: attributes.id }
      },

      input: {
        _: document.createElement(tag),
        _attributes: attributes,
        _events: {
          input: () => {
            document.dispatchEvent(new CustomEvent('inputElementChange', {
              detail: { id: this.id, validity: this.validity, value: this.value }
            }))
          }
        }
      }
    }
    Template.build(this._template)
  }

  /**
   * Ajoute l'élément d'entrée au parent spécifié.
   * @param {HTMLElement} parent - Le parent de l'élément d'entrée.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Retourne l'identifiant de l'élément d'entrée.
   * @returns {string}
   */
  get id () {
    return this._template.input._.getAttribute('id')
  }

  /**
   * Retourne la validité de l'élément d'entrée.
   * @returns {boolean}
   */
  get validity () {
    return this._template.input._.validity.valid
  }

  /**
   * Définit une nouvelle valeur de l'élément d'entrée.
   * @param {string} value - La nouvelle valeur de l'élément d'entrée.
   */
  set value (value) {
    this._template.input._.value = value
  }

  /**
   * Retourne la valeur de l'élément d'entrée.
   * @returns {string}
   */
  get value () {
    return this._template.input._.value
  }
}

/**
 * Une classe représentant un élément d'entrée de texte.
 * @extends InputElement
 */
export class InputText extends InputElement {
  /**
   * Crée une instance de InputText.
   * @param {string} id - L'identifiant de l'élément d'entrée.
   * @param {string} label - Le libellé de l'élément d'entrée.
   * @param {RegExp} regex - L'expression régulière pour valider l'entrée.
   * @param {string} message - Le message à afficher si l'entrée est invalide.
   * @param {boolean} required - Indique si l'entrée est obligatoire ou non. Par défaut, true.
   */
  constructor (id, label, regex, message, required = true) {
    super('input', label, { id, type: 'text', required, pattern: regex.toString().slice(1, -1), title: message })
  }
}

/**
 * Une classe représentant un élément d'entrée de zone de texte.
 * @extends InputElement
 */
export class InputTextArea extends InputElement {
  /**
   * Crée une instance de InputTextArea.
   * @param {string} id - L'identifiant de l'élément d'entrée.
   * @param {string} label - Le libellé de l'élément d'entrée.
   * @param {number} minlength - La longueur minimale de l'entrée.
   * @param {string} message - Le message à afficher si l'entrée est invalide.
   * @param {boolean} required - Indique si l'entrée est obligatoire ou non. Par défaut, true.
   */
  constructor (id, label, minlength, message, required = true) {
    super('textarea', label, { id, required, minlength, title: message })
  }
}

/**
 * Une classe représentant un élément de formulaire qui peut contenir plusieurs entrées et un bouton de soumission.
 */
export class FormElement {
  /**
   * Crée une instance de FormElement.
   * @param {string} name - Le nom de l'élément de formulaire.
   * @param {Object.<string, InputElement>} inputsElements - Un objet contenant les entrées de l'élément de formulaire sous la forme d'une classe héritée de la classe InputElement.
   */
  constructor (name, inputsElements) {
    this._inputElements = inputsElements

    this._template = {
      _: document.createElement('form'),
      _attributes: {
        class: `${name}-form`,
        style: `
          width: 100%;
          display: flex;
          flex-direction: column;
        `
      },
      _events: {
        submit: (e) => {
          e.preventDefault()

          if (this._hasBeenSubmitted) {
            this.#initContentArea()
          } else {
            this._hasBeenSubmitted = true

            const answers = new Map()

            for (const input in this._inputElements) {
              const id = this._inputElements[input].id
              const value = this._inputElements[input].value
              answers.set(id, value)
            }

            this._template._.dispatchEvent(new CustomEvent(`submit-${name}`, {
              detail: { answers }
            }))
          }
        }
      },

      contentArea: {
        _: document.createElement('div')
      },

      submitButton: {
        _: document.createElement('button'),
        _textContent: 'Envoyer',
        _attributes: {
          class: `${name}-button`,
          style: `
            margin: auto;
            margin-top: 20px;
          `
        }
      }
    }

    Template.build(this._template)

    this.#initContentArea()
    this.#startInputsListeners()
  }

  #initContentArea () {
    this._hasBeenSubmitted = false
    this._template.contentArea._.innerHTML = ''

    for (const input in this._inputElements) {
      this._inputElements[input].value = ''
      this._inputElements[input].addTo(this._template.contentArea._)
    }

    this._template.submitButton._.innerHTML = 'Envoyer'
    this._template.submitButton._.disabled = !this.#formValidity
  }

  #startInputsListeners () {
    document.addEventListener('inputElementChange', () => {
      this._template.submitButton._.disabled = !this.#formValidity
    })
  }

  get #formValidity () {
    let validity = true

    for (const input in this._inputElements) {
      if (this._inputElements[input].validity === false) {
        validity = false
        break
      }
    }

    return validity
  }

  /**
   * Affiche un message de succès et modifie le texte du bouton de soumission.
   * @param {string} message - Le message de succès à afficher.
   * @param {string} buttonText - Le texte à afficher sur le bouton de soumission.
   */
  displaySucces (message, buttonText) {
    this._template.contentArea._.innerHTML = `
      <p class="succes-message">${message}</p>
    `
    this._template.submitButton._.innerHTML = buttonText
  }

  /**
   * Obtienir l'élément HTML représentant l'élément de formulaire.
   * @returns {HTMLElement} - L'élément HTML représentant l'élément de formulaire.
   */
  get element () {
    return this._template._
  }
}
