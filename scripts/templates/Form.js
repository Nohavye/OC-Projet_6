/**
 * Création d'une entrée de formulaire. */
class InputElement {
  /**
     * Créer un entrée de formulaire.
     * @param {string} label - Texte contenu dans le label associé à l'entrée.
     * @param {string} className - Représente le nom de classe, le nom et l'id de l'element.
     * @param {boolean} required - L'entrée est-elle requise pour validation du formulaire cible.
     */
  constructor (label, className, required) {
    this._label = label
    this._className = className
    this._required = required
    this._inputHTML = ''
  }

  /**
     * Initialisation d'évènements. */
  initEvent () {
    document.querySelector(`.${this._className}`).addEventListener('input', () => {
      document.dispatchEvent(new Event('inputsChange'))
    })
  }

  /**
     * Ajoute l'entrée dans un élément parent.
     * @param {Element} parent - Element parent.
     */
  addTo (parent) {
    parent.insertAdjacentHTML('beforeend', this._inputHTML)
  }

  /**
     * Retourne l'entrée. */
  get input () {
    return document.querySelector(`.${this._className}`)
  }

  /**
     * Retourne le nom de l'entrée. */
  get name () {
    return this._className
  }

  /**
     * Retourne la valeur de l'entrée. */
  get value () {
    return document.querySelector(`.${this._className}`).value
  }

  /**
     * Retourne la validité de l'entrée. */
  get validity () {
    return document.querySelector(`.${this._className}`).validity.valid
  }
}

/**
 * @extends {InputElement}
 */
export class InputText extends InputElement {
  /**
     * Créer un entrée type texte de formulaire.
     * @param {string} label - Texte contenu dans le label associé à l'entrée.
     * @param {string} className - Représente le nom de classe, le nom et l'id de l'element.
     * @param {boolean} required - L'entrée est-elle requise pour validation du formulaire cible.
     * @param {string} pattern - Expression régulière permettant le teste de l'entrée.
     * @param {string} message - Texte contenu dans l'info-bulle associé à l'entrée.
     */
  constructor (label, className, required, regex, message) {
    super(label, className, required)

    const pattern = regex.toString().slice(1, -1)

    this._inputHTML = `
      <label for="${this._className}">${this._label}</label>
      <input  class="${this._className}" 
              type="text" id="${this._className}" 
              name="${this._className}" 
              required="${this._required}"
              pattern="${pattern}"
              title="${message}">
    `
  }
}

/**
 * @extends {InputElement}
 */
export class InputTextArea extends InputElement {
  /**
     * Créer un entrée type zone de texte de formulaire.
     * @param {string} label - Texte contenu dans le label associé à l'entrée.
     * @param {string} className - Représente le nom de classe, le nom et l'id de l'element.
     * @param {boolean} required - L'entrée est-elle requise pour validation du formulaire cible.
     * @param {number} minlength - Nombre minimum de caractères permettant le teste de l'entrée.
     * @param {string} message - Texte contenu dans l'info-bulle associé à l'entrée.
     */
  constructor (label, className, required, minlength, message) {
    super(label, className, required)

    this._inputHTML = `
      <label for="${this._className}">${this._label}</label>
      <textarea   class="${this._className}" 
                  id="${this._className}" 
                  name="${this._className}" 
                  required="${this._required}"
                  minlength="${minlength}"
                  title="${message}"></textarea>
    `
  }
}

/**
 * Implémentation d'un formulaire */
export class Form {
  #_name
  #_inputs
  #_form
  #_button
  #_hasBeenSubmitted

  /**
     * Cette classe permet l'implémentation d'un formulaire prêt à l'emploi.
     *
     * Gestion et validation des entrées, messages d'erreur et de validation,
     * soumissions et retour des données du formulaire.
     *
     * À la construction il faut lui fournir un nom via le paramètre 'name'
     * et un objet littéral contenant une série d'instances de classes etendues
     * de la classe 'InputElement'.
     *
     * @param {string} name - Nom du formulaire.
     * @param {object} inputs - Objet contenant une série d'InputElement.
     * @param {InputElement} inputs.inputOne
     * @param {InputElement} inputs.inputTwo
     * @param {InputElement} inputs.inputEct
     */
  constructor (name, inputs) {
    this.#_name = name
    this.#_inputs = inputs

    this.#_form = document.createElement('form')
    this.#_form.classList.add(`${this.#_name}-form`)

    this.#initForm()
    this.#initEvents()
  }

  /**
    * Initialisation du formulaire. */
  #initForm () {
    this.#_hasBeenSubmitted = false
    this.#_form.innerHTML = ''

    for (const input in this.#_inputs) {
      this.#_inputs[input].addTo(this.#_form)
    }

    this.#_button = document.createElement('button')
    this.#_button.classList.add(`${this.#_name}-button`)
    this.#_button.innerHTML = 'Envoyer'

    this.#_form.appendChild(this.#_button)
  }

  /**
    * Initialisation des évènements du formulaire. */
  #initEvents () {
    this.#_form.onsubmit = (e) => {
      e.preventDefault()

      if (this.#_hasBeenSubmitted) {
        this.reset()
      } else {
        this.#_hasBeenSubmitted = true

        const answers = new Map()

        for (const input in this.#_inputs) {
          const inputName = this.#_inputs[input].name
          const inputValue = this.#_inputs[input].input.value
          answers.set(inputName, inputValue)
        }

        this.#_form.dispatchEvent(new CustomEvent(`submit-${this.#_name}`, {
          detail: { answers }
        }))
      }
    }
  }

  /**
    * Tester la validité du formulaire. */
  get #formValidity () {
    let validity = true

    for (const input in this.#_inputs) {
      if (this.#_inputs[input].validity === false) {
        validity = false
        break
      }
    }

    return validity
  }

  /**
    * Réinitialiser le formulaire */
  reset () {
    this.#initForm()
    this.#initEvents()
  }

  /**
     * Permet une fois le formulaire validé d'afficher un
     * message de réussite de l'envoi.
     *
     * Si le paramètre button n'est pas transmit
     * le message ne comportera pas de boutton.
     *
     * @param {string} message - Message de validation.
     * @param {string} [button] - Texte du bouton. (facultatif)
     * */
  displaySuccesMessage (message, button) {
    this.#_form.innerHTML = `
      <p class="succes-message">${message}</p>
    `
    if (typeof (button) !== 'undefined') {
      this.#_button = document.createElement('button')
      this.#_button.classList.add(`${this.#_name}-button`)
      this.#_button.innerHTML = button
      this.#_form.appendChild(this.#_button)
    }
  }

  /**
    * Déclanche l'écoute des évenements liés au entrées pour
    * gérer la validation du formulaire. */
  startListeners () {
    this.#_button.disabled = !this.#formValidity

    for (const input in this.#_inputs) {
      this.#_inputs[input].initEvent()
    }

    document.addEventListener('inputsChange', () => {
      this.#_button.disabled = !this.#formValidity
    })
  }

  /**
    * Retourne le formulaire. */
  get get () {
    return this.#_form
  }
}
