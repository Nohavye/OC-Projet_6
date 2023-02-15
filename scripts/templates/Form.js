export class Form {
    #_name
    #_inputs
    #_form
    #_button
    #_hasBeenSubmitted

    constructor(name, inputs) {
        this.#_name = name
        this.#_inputs = inputs

        this.#_form = document.createElement('form')
        this.#_form.classList.add(`${this.#_name}-form`)

        this.#initForm()
        this.#initEvents()
    }

    #initForm() {
        this.#_hasBeenSubmitted = false
        this.#_form.innerHTML = ""

        for(let input in this.#_inputs) {
            this.#_inputs[input].addTo(this.#_form)
        }

        this.#_button = document.createElement('button')
        this.#_button.classList.add(`${this.#_name}-button`)
        this.#_button.innerHTML = "Envoyer"

        this.#_form.appendChild(this.#_button)
    }

    #initEvents() {
        this.#_form.onsubmit = (e) => {
            e.preventDefault()

            if(this.#_hasBeenSubmitted) {
                this.reset()
            } else {
                this.#_hasBeenSubmitted = true

                const answers = new Map()
    
                for(let input in this.#_inputs) {
                    const inputName = this.#_inputs[input].name
                    const inputValue = this.#_inputs[input].input.value
                    answers.set(inputName, inputValue)
                }
    
                this.#_form.dispatchEvent(new CustomEvent(`submit-${this.#_name}`, {
                    detail: { answers: answers}
                }))
            }
        }
    }

    get #formValidity() {
        let validity = true

        for(let input in this.#_inputs) {
            if(this.#_inputs[input].validity == false) {
                validity = false
                break
            }
        }

        return validity
    }

    reset() {
        this.#initForm()
        this.#initEvents()
    }

    displaySuccesMessage(message) {
        this.#_form.innerHTML = `
            <p class="succes-message">${message}</p>
        `
        this.#_button = document.createElement('button')
        this.#_button.classList.add(`${this.#_name}-button`)
        this.#_button.innerHTML = "Nouveau message"
        this.#_form.appendChild(this.#_button)
    }

    startListeners() {
        this.#_button.disabled = !this.#formValidity
        
        for(let input in this.#_inputs) {
            this.#_inputs[input].initEvent()
        }

        document.addEventListener('inputsChange', () => {
            this.#_button.disabled = !this.#formValidity
        })
    }

    get form() {
        return this.#_form
    }
}