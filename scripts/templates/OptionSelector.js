import Template from './Template.js'

class OptionSelector {
  /**
   * Représente un composant de sélecteur d'options.
   * @param {string} name - Le nom du sélecteur d'options.
   * @param {string} label - L'étiquette à afficher.
   * @param {Object} options - Les options à afficher dans le sélecteur.
   */
  constructor (name, label, options) {
    this._name = name
    this._isDeployed = true
    this._value = null

    this._optionElements = []
    this._arrowElement = document.createElement('p')

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: `${this._name}-option-selector`,
        style: 'display: flex;'
      },

      label: {
        _: document.createElement('label'),
        _textContent: label,
        _attributes: {
          class: `${this._name}-label`,
          for: `${this._name}-selector`,
          style: 'padding: 20px;'
        }
      },

      selector: {
        _: document.createElement('div'),
        _attributes: {
          class: `${this._name}-selector`,
          id: `${this._name}-selector`,
          style: `
            position: absolute;
            overflow: hidden;
            margin-left: 60px;
            cursor: pointer;
          `
        }
      }
    }

    Template.build(this._template)

    this.#initOptions(options)
    this.#initSelector()
  }

  /**
   * Initialise les options du sélecteur.
   * @param {Object} options - Les options à afficher dans le sélecteur.
   */
  #initOptions (options) {
    const optionsArray = Object.values(options)

    for (const option of optionsArray) {
      const optionElement = document.createElement('option')
      optionElement.setAttribute('value', option.value)
      optionElement.setAttribute('style', `
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
      `)

      optionElement.innerHTML = `<p>${option.name}</p>`

      this._optionElements.push(optionElement)
    }
  }

  /**
   * Initialise le sélecteur avec la première option comme option sélectionnée par défaut,
   * configure la flèche de sélection, définit les styles.
   */
  #initSelector () {
    this._value = this._optionElements[0].value
    this._optionElements[0].insertAdjacentElement('beforeend', this._arrowElement)
    this._optionElements[0].style.borderTop = '0'

    for (let i = 1; i < this._optionElements.length; i++) {
      this._optionElements[i].style.borderTop = '2px solid white'
    }

    this._template.selector._.innerHTML = ''
    for (const optionElement of this._optionElements) {
      this._template.selector._.appendChild(optionElement)
    }
  }

  /**
   * Initialise les événements pour chaque option du sélecteur et pour le sélecteur lui-même.
   */
  #initEvents () {
    for (const option of this._optionElements) {
      option.addEventListener('click', () => {
        this._template.selector._.dispatchEvent(new CustomEvent('click-option', {
          detail: { value: option.value }
        }))
      })
    }

    this._template.selector._.addEventListener('click-option', (e) => {
      if (this._value === e.detail.value) {
        this.#toggleSelector()
      } else {
        this.#orderOptions(e.detail.value)
        this.#initSelector()
        this.#toggleSelector()

        this._template._.dispatchEvent(new CustomEvent(`${this._name}-option-change`, {
          detail: { option: e.detail.value }
        }))
      }
    })
  }

  /**
   * Change l'état de déploiement du sélecteur (déployé ou non déployé),
   * ajuste la hauteur du sélecteur et la flèche de sélection.
   */
  #toggleSelector () {
    if (this._isDeployed) {
      this._isDeployed = false
      this._template.selector._.style.height = `
        ${this._template._.clientHeight - 22}px
      `
      this._arrowElement.innerHTML = '\u23f7'
    } else {
      this._isDeployed = true
      this._template.selector._.style.height = 'max-content'
      this._arrowElement.innerHTML = '\u23f6'
    }
  }

  /**
   * Réorganise le tableau d'options pour placer l'option sélectionnée en première position.
   * @param {string} value - La valeur de l'option sélectionnée.
   */
  #orderOptions (value) {
    let seletedItem
    let index = 0

    for (const option of this._optionElements) {
      if (option.value === value) {
        seletedItem = { option, index }
        break
      }
      index++
    }

    this._optionElements.splice(seletedItem.index, 1)
    this._optionElements.splice(0, 0, seletedItem.option)
  }

  /**
   * Ajoute l'élément HTML correspondant à l'instance de la classe
   * `OptionSelector` dans un élément parent donné. Initialise les événements.
   * @param {HTMLElement} parent - L'élément HTML parent dans lequel ajouter le sélecteur d'options.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
    this._template.selector._.style.marginLeft = `${this._template.label._.clientWidth + 10}px`
    this.#initEvents()
    this.#toggleSelector()
  }

  /**
   * Définit la valeur actuelle de l'option sélectionnée.
   * @param {string} value - La valeur de l'option à sélectionner.
   */
  set value (value) {
    this.#orderOptions(value)
    this.#initSelector()

    this._template._.dispatchEvent(new CustomEvent(`${this._name}-option-change`, {
      detail: { option: value }
    }))
  }

  /**
   * Récupère la valeur actuelle de l'option sélectionnée.
   * @returns {string} - La valeur de l'option sélectionnée.
   */
  get value () {
    return this._value
  }

  /**
   * Récupère l'élément HTML correspondant à l'instance du composant.
   * @returns {HTMLElement} L'élément HTML correspondant à l'instance du composant.
   */
  get element () {
    return this._template._
  }
}

export { OptionSelector as default }
