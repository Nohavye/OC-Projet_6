import Template from './Template.js'

class OptionSelector {
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
            padding: 10px;
            cursor: pointer;
          `
        }
      }
    }

    Template.build(this._template)

    this.#initOptions(options)
    this.#initSelector()
  }

  #initOptions (options) {
    const optionsArray = Object.values(options)

    for (const option of optionsArray) {
      const optionElement = document.createElement('option')
      optionElement.setAttribute('value', option.value)
      optionElement.setAttribute('style', `
        padding: 10px;
        display: flex;
        justify-content: space-between;
        gap: 60px;
      `)

      optionElement.innerHTML = `<p>${option.name}</p>`

      this._optionElements.push(optionElement)
    }
  }

  #initSelector () {
    this._value = this._optionElements[0].value
    this._optionElements[0].insertAdjacentElement('beforeend', this._arrowElement)

    this._template.selector._.innerHTML = ''
    for (const optionElement of this._optionElements) {
      this._template.selector._.appendChild(optionElement)
    }
  }

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

  addTo (parent) {
    // parent.insertAdjacentElement('afterbegin', this._template._)
    parent.appendChild(this._template._)
    this._template.selector._.style.marginLeft = `${this._template.label._.clientWidth + 10}px`
    this.#initEvents()
    this.#toggleSelector()
  }

  set value (value) {
    this.#orderOptions(value)
    this.#initSelector()

    this._template._.dispatchEvent(new CustomEvent(`${this._name}-option-change`, {
      detail: { option: value }
    }))
  }

  get value () {
    return this._value
  }

  get element () {
    return this._template._
  }
}

export { OptionSelector as default }
