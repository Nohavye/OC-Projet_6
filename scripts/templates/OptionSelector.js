export class OptionSelector {
    #_name
    #_label
    #_value

    #_isDeployed = true

    #_elements = {
        optionSelector: document.createElement('div'),
        label: document.createElement('label'),
        selector: document.createElement('div'),
        arrow: document.createElement('p'),
        options: []
    }

    #_styles = {

        optionSelector: `
            display: flex;
        `,
        
        label: `
            padding: 20px;
        `,

        selector: (xOffset) => {
            
            return `
                position: absolute;
                overflow: hidden;
                margin-left: ${xOffset + 10}px;
                padding: 10px;
                cursor: pointer
            `
        },

        option: `
            padding: 10px;
            display: flex;
            justify-content: space-between;
            gap: 60px;
        `
    }

    constructor(name, label, options) {
        this.#_name = name
        this.#_label = label

        // class names
        this.#_elements.label.classList.add(`${this.#_name}-label`)
        this.#_elements.selector.classList.add(`${this.#_name}-selector`)
        this.#_elements.optionSelector.classList.add(`${this.#_name}-option-selector`)

        this.#init(options)
    }

    #initOptions(options) {

        const optionsArray = Object.values(options)

        for(let option of optionsArray) {
            const optionElement = document.createElement('option')
            optionElement.setAttribute('value', option.value)
            optionElement.setAttribute('style', this.#_styles.option)
            
            optionElement.innerHTML = `<p>${option.name}</p>`

            this.#_elements.options.push(optionElement)
        }
    }

    #initSelector() {
        this.#_value = this.#_elements.options[0].value
        this.#_elements.options[0].insertAdjacentElement('beforeend', this.#_elements.arrow)

        this.#_elements.selector.innerHTML = ""
        for(let optionElement of this.#_elements.options) {
            this.#_elements.selector.insertAdjacentElement('beforeend', optionElement)
        }
    }

    #initLabel() {
        this.#_elements.label.setAttribute('style', this.#_styles.label)
        this.#_elements.label.setAttribute('for', `${this.#_name}-selector`)
        this.#_elements.label.innerHTML = this.#_label
    }

    #init(options) {

        this.#initOptions(options)
        this.#initSelector()
        this.#initLabel()

        // option-selector
        this.#_elements.optionSelector.setAttribute('style', this.#_styles.optionSelector)
        this.#_elements.optionSelector.insertAdjacentElement('beforeend', this.#_elements.label)
        this.#_elements.optionSelector.insertAdjacentElement('beforeend', this.#_elements.selector)
    }

    #initStyles() {
        this.#_elements.selector.setAttribute('style', this.#_styles.selector(
            this.#_elements.label.clientWidth
        ))
    }

    #initEvents() {

        for(let option of this.#_elements.options) {
            option.addEventListener('click', () => {
                this.#_elements.selector.dispatchEvent(new CustomEvent('click-option', {
                    detail: { selectedOption: option.value }
                }))
            })
        }

        this.#_elements.selector.addEventListener('click-option', (e) => {

            if(this.#_value == e.detail.selectedOption) {
                this.#toggleSelector()
            } else {
                this.#orderOptions(e.detail.selectedOption)
                this.#initSelector()
                this.#toggleSelector()

                this.#_elements.optionSelector.dispatchEvent(new CustomEvent (`${this.#_name}-option-change`, {
                    detail: { option: e.detail.selectedOption }
                }))
            }
        })
    }

    #toggleSelector() {

        if(this.#_isDeployed) {        
            this.#_isDeployed = false
            this.#_elements.selector.style.height = `
                ${this.#_elements.optionSelector.clientHeight - 22}px
            `
            this.#_elements.arrow.innerHTML = '\u23f7'
        } else {
            this.#_isDeployed = true
            this.#_elements.selector.style.height = 'max-content'
            this.#_elements.arrow.innerHTML = '\u23f6'
        }
    }

    #orderOptions(selectedOption) {
        let seletedItem
        let i = 0

        for(let option of this.#_elements.options) {
            if(option.value == selectedOption) {
                seletedItem = { option: option, index: i }
                break
            }
            i++
        }

        this.#_elements.options.splice(seletedItem.index, 1)
        this.#_elements.options.splice(0, 0, seletedItem.option)
    }

    addTo(parent) {
        parent.insertAdjacentElement('afterbegin', this.#_elements.optionSelector)
        this.#initStyles()
        this.#initEvents()
        this.#toggleSelector()
    }

    get value() {
        return this.#_value
    }

    set value(option) {
        this.#orderOptions(option)
        this.#initSelector()

        this.#_elements.optionSelector.dispatchEvent(new CustomEvent (`${this.#_name}-option-change`, {
            detail: { option: option }
        }))
    }

    get get() {
        return this.#_elements.optionSelector
    }
}