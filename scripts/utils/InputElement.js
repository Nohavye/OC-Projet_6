const inputChangeEvent = new Event('inputsChange')

class InputElement {
    constructor (label, className, required) {
        this._label = label
        this._className = className
        this._required = required
        this._inputHTML = ""
    }

    initEvent() {
        document.querySelector(`.${this._className}`).addEventListener('input', () => {
            console.log(`input: ${this._className} / validity: ${this.validity}`)
            document.dispatchEvent(inputChangeEvent)
        })
    }

    addTo(parent) {
        parent.insertAdjacentHTML('beforeend', this._inputHTML)
    }

    get name() {
        return this._className
    }

    get input() {
        return document.querySelector(`.${this._className}`)
    }

    get validity() {
        return document.querySelector(`.${this._className}`).validity.valid
    }
}

export class InputText extends InputElement {

    constructor(label, className, required, pattern, message) {
        super(label, className, required)

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

export class InputTextArea extends InputElement {

    constructor(label, className, required, minlength, message) {
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