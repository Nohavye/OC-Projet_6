import Template from './Template.js'

/**
 * Classe représentant un élément d'entrée de formulaire.
 * @class
 */
class InputElement {
  /**
   * Constructeur de la classe InputElement.
   * @constructor
   * @param {string} tag - La balise HTML de l'élément d'entrée.
   * @param {string} label - Le texte du label associé à l'élément d'entrée.
   * @param {object} attributes - Les attributs de l'élément d'entrée.
   */
  constructor (tag, label, attributes) {
    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('div'),
      _attributes: {
        style: `
          display: flex;
          flex-direction: column;
          width: 100%;
        `
      },

      // Etiquette associé à l'entrée configurée via les paramètres 'label' et 'attributes.id'.
      label: {
        _: document.createElement('label'),
        _textContent: label,
        _attributes: { for: attributes.id }
      },

      // Entrée configurée via les paramètres 'tag' et 'attributes'.
      input: {
        _: document.createElement(tag),
        _attributes: attributes,

        // Evènements générés par l'entrée.
        _events: {

          // Evènement personnalisé lorsque l'entrée est saisie.
          input: () => {
            document.dispatchEvent(new CustomEvent('inputElementChange', {
              detail: { inputElement: this }
            }))
          },

          // Evènement personnalisé lorsque l'entrée prend le focus.
          focus: () => {
            document.dispatchEvent(new CustomEvent('inputElementFocus', {
              detail: { inputElement: this }
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
   * Retourne l'élément d'entrée.
   * @returns {HTMLElement}
   */
  get input () {
    return this._template.input._
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
class InputText extends InputElement {
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
class InputTextArea extends InputElement {
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
 * Une classe représentant un élément de formulaire qui peut
 * contenir plusieurs entrées et un bouton de soumission.
 * @class
 */
class FormElement {
  /**
   * Crée une instance de FormElement.
   * @param {string} name - Le nom de l'élément de formulaire.
   * @param {Object.<string, InputElement>} inputsElements - Un objet contenant les entrées de l'élément
   * de formulaire sous la forme d'une classe héritée de la classe InputElement.
   */
  constructor (name, inputsElements) {
    this._name = name
    this._inputElements = inputsElements

    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal de type <form>.
      _: document.createElement('form'),

      _attributes: {

        // Définition d'un sélècteur personnalisé.
        class: `${name}-form`,

        // Style par défaut du formulaire.
        // Peut être stylisé via CSS et le sélecteur personnalisé.
        style: `
          width: 100%;
          display: flex;
          flex-direction: column;
        `
      },

      // Evènements du formulaire.
      _events: {
        submit: this.#eventListeners.submit,
        keydown: this.#eventListeners.keydown
      },

      /*  Message d'accessibilité. Permet de suivre en temps réel le statut
          de validation des entrées et du formulaire ainsi que d'envoyer
          des messages live au lecteur d'écran. */
      accessibilityMessage: {
        _: document.createElement('div'),
        _attributes: {
          'aria-live': 'assertive',
          role: 'status',
          style: `
            display: block;
            color: lightgrey;
            text-align: right;
            height: 0;
          `
        }
      },

      // Zone destiner à acceuillir les entrées de formulaire.
      contentArea: {
        _: document.createElement('div')
      },

      // Boutton de soumission.
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

  /*  Initialisation de la zone de contenu du formulaire.
      ( Zone destinée à recevoir les entrées du formulaire ) */
  #initContentArea () {
    this._hasBeenSubmitted = false
    this._template.contentArea._.innerHTML = ''

    for (const input in this._inputElements) {
      this._inputElements[input].value = ''
      this._inputElements[input].addTo(this._template.contentArea._)
    }

    this._template.submitButton._.innerHTML = 'Envoyer'
    this._template.submitButton._.disabled = true
  }

  /*  Initialisation des écouteur d'évènements lié à la validation du formulaire,
      et à la gestion des messages pour l'accessibilité. */
  #startInputsListeners () {
    // Gestion des messages pour l'accessibilité.
    const handleAccessibilityMessage = (e, formValidity) => {
      const inputElement = e.detail.inputElement

      if (formValidity) {
        this._template.accessibilityMessage._.innerHTML = 'Le formulaire validé'
      } else {
        if (inputElement.validity) {
          this._template.accessibilityMessage._.innerHTML = 'Saisie validée'
        } else {
          this._template.accessibilityMessage._.innerHTML = inputElement.input.getAttribute('title')
        }
      }
    }

    /*  Ecouter les changement d'entrées pour gérer l'activation du bouton
        de soumission et actualiser le message d'accessibilité. */
    document.addEventListener('inputElementChange', (e) => {
      const formValidity = this.#formValidity
      handleAccessibilityMessage(e, formValidity)
      this._template.submitButton._.disabled = !formValidity
    })

    // Ecouter le focus sur les entrées pour actualiser le message d'accessibilité.
    document.addEventListener('inputElementFocus', (e) => {
      handleAccessibilityMessage(e, this.#formValidity)
    })
  }

  // Tester la validité du formulaire.
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

  // Fonctions liées au évènements du formulaire.
  #eventListeners = {
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

        this._template._.dispatchEvent(new CustomEvent(`submit-${this._name}`, {
          detail: { answers }
        }))
      }
    },

    keydown: (e) => {
      if (e.key === 'Escape') {
        this.#sendCloseEvent()
      }
    }
  }

  /*  Envoyer un évènement de fermeture à l'attention de modalWrapper.
      ( Est appelé lors de l'appui sur la touche 'échap' ) */
  #sendCloseEvent () {
    this._template._.dispatchEvent(new Event('closeEvent'))
  }

  /**
   * Affiche un message de succès et modifie le texte du bouton de soumission.
   * @param {string} message - Le message de succès à afficher.
   * @param {string} buttonText - Le texte à afficher sur le bouton de soumission.
   */
  displaySucces (message, buttonText) {
    this._template.accessibilityMessage._.innerHTML = ''
    this._template.contentArea._.innerHTML = ''

    const elementDiv = document.createElement('div')
    elementDiv.setAttribute('aria-live', 'assertive')
    elementDiv.setAttribute('class', 'succes-message')
    this._template.contentArea._.appendChild(elementDiv)
    window.setTimeout(() => { elementDiv.innerHTML = message }, 10)

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

export { InputText, InputTextArea, FormElement }
