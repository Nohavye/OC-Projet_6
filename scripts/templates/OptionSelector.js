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
    this._value = null
    this._isExpanded = true
    this._tabMode = false

    this._optionElements = []
    this._arrowElement = document.createElement('p')

    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('div'),
      _attributes: {

        // Définition d'un sélècteur personnalisé.
        // Peut être stylisé via CSS et le sélecteur personnalisé.
        class: `${this._name}-option-selector`,

        style: 'display: flex;',

        title: 'Selectionnez une options',
        'aria-label': 'Selectionnez une options',
        'aria-expanded': 'false',
        role: 'listbox'
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
          `,
          tabindex: '0'
        }
      },

      /*  Message d'accessibilité pour l'envoi
          de messages live au lecteur d'écran. */
      accessibilityMessage: {
        _: document.createElement('div'),
        _attributes: {
          'aria-live': 'assertive',
          style: `
            color: transparent;
            position: absolute;
            top: -100px; left: 0;
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
    /*  Ici, on construit les éléments du Dom stockés dans un
        tableau qui vont constituer les options du sélecteur */
    const optionsArray = Object.values(options)

    for (const option of optionsArray) {
      const optionElement = document.createElement('option')
      optionElement.setAttribute('value', option.value)
      optionElement.setAttribute('id', option.value)
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

    // Première option

    // Accessibility
    this._optionElements[0].setAttribute('aria-selected', true)

    // Style
    this._optionElements[0].insertAdjacentElement('beforeend', this._arrowElement)
    this._optionElements[0].style.borderTop = '0'

    // Autres options

    for (let i = 1; i < this._optionElements.length; i++) {
      // Accessibilité
      this._optionElements[i].setAttribute('aria-selected', false)

      // Style
      this._optionElements[i].style.borderTop = '2px solid white'
    }

    // Selecteur

    // Accessibilité
    this._template._.setAttribute('aria-activedescendant', this._value)
    this._template.accessibilityMessage._.innerHTML = `Vous venez de sélèctionner l'option ${this._optionElements[0].textContent}`

    // Actualisation selecteur
    this._template.selector._.innerHTML = ''
    for (const optionElement of this._optionElements) {
      this._template.selector._.appendChild(optionElement)
    }

    /*  Evènements à actualiser selon l'ordre des options. Défini le comportement
        du sélecteur lors de la perte du focus pour la navigation au clavier. */
    this._optionElements[0].addEventListener('keydown', (e) => {
      if (e.target === this._optionElements[0]) {
        if (this._tabMode && e.key === 'Tab' && e.shiftKey === true) {
          this.#toggleSelector()
        }
      }
    })

    this._optionElements[this._optionElements.length - 1].addEventListener('keydown', (e) => {
      if (e.target === this._optionElements[this._optionElements.length - 1]) {
        if (this._tabMode && e.key === 'Tab' && e.shiftKey === false) {
          this.#toggleSelector()
        }
      }
    })
  }

  /**
   * Initialise les événements pour chaque options du sélecteur et pour le sélecteur lui-même.
   */
  #initEvents () {
    // Options du sélecteur.
    for (const option of this._optionElements) {
      /*  Evènement personnalisé représentant la sélection d'une option.
          Communique la valeur de l'option sélectionnée. */
      const selectOptionEvent = new CustomEvent('select-option', {
        detail: { value: option.value }
      })

      //  Message live pour l'option indiquer l'option qui détient le focus.
      option.addEventListener('focus', () => {
        this._template.accessibilityMessage._.innerHTML = option.textContent
      })

      /*  Diffusion de l'évènement personnalisé 'select-option' au clique
          et sur pression de la touche 'Enter' sur une option. */
      option.addEventListener('click', () => {
        this._template.selector._.dispatchEvent(selectOptionEvent)
      })

      option.addEventListener('keyup', (e) => {
        if (e.target === option) {
          switch (e.key) {
            case 'Enter':
              this._template.selector._.dispatchEvent(selectOptionEvent)
          }
        }
      })
    }

    /*  Ecouter l'évènement 'select-option' et définir le comportement du
        sélecteur en fonction de l'option choisie. */
    this._template.selector._.addEventListener('select-option', (e) => {
      if (this._value === e.detail.value) {
        this.#toggleSelector()
      } else {
        this.#orderOptions(e.detail.value)
        this.#initSelector()
        this.#toggleSelector()

        /*  Diffusion de l'évènement personnalisé `${this._name}-option-change`.
            Communique la nouvelle valeur de l'option. */
        this._template._.dispatchEvent(new CustomEvent(`${this._name}-option-change`, {
          detail: { option: e.detail.value }
        }))
      }
    })

    // Permet d'ouvrir le sélecteur par l'action de la touche 'Enter'.
    this._template.selector._.addEventListener('keyup', (e) => {
      if (e.target === this._template.selector._) {
        switch (e.key) {
          case 'Enter':
            this.#toggleSelector(true)
        }
      }
    })
  }

  /**
   * Change l'état de déploiement du sélecteur ( déployé ou non déployé ).
   */
  #toggleSelector (tabMode = false) {
    if (this._isExpanded) {
      this._isExpanded = false
      this._template.selector._.style.height = `
        ${this._template._.clientHeight - 22}px
      `
      this._arrowElement.innerHTML = '\u23f7'
      if (this._tabMode) this.#toggleTabMode()
    } else {
      this._isExpanded = true
      this._template.selector._.style.height = 'max-content'
      this._arrowElement.innerHTML = '\u23f6'
      if (tabMode) this.#toggleTabMode()
    }
    this._template._.setAttribute('aria-expanded', this._isExpanded)
  }

  /**
   * Bascule l'état de la navigation dans les options.
   * ( souris / clavier )
   */
  #toggleTabMode () {
    if (this._tabMode) {
      this._tabMode = false
      for (const element of this._optionElements) {
        element.setAttribute('tabindex', '-1')
      }
      this._template.selector._.focus()
    } else {
      this._tabMode = true
      for (const element of this._optionElements) {
        element.setAttribute('tabindex', '0')
      }
      this._optionElements[0].focus()
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
