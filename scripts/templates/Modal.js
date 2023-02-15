export class Modal {
    #_name
    #_title
    #_wrapper
    #_box
    #_contentBox
    #_closeButton

    #_styles = {

        closeButton: `
            cursor: pointer;
        `,

        title: `
            font-size: 64px;
            font-weight: normal;
            text-align: center;
        `,

        header: `
            justify-content: space-between;
            width: 100%;
        `,

        contentBox: `
            width: 100%;
        `,

        box: `
            padding: 35px;
            min-width: 50%;
        `,
        
        wrapper: (lightBox) => {
            let bgColor = 'background-color: transparent;'
            if(lightBox) { bgColor = 'background-color: rgba(0, 0, 0, 0.75);'}
            return `
                ${bgColor}
                display: none;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            `
        }
        
    }

    constructor(name, title, lightBox) {
        lightBox = lightBox || false

        this.#_name = name
        this.#_title = title

        this.#initBox()
        this.#initWrapper(lightBox)
        this.#initEvents()
    }

    #initBox() {
        // Create CloseButton Box
        this.#_closeButton = document.createElement('img')
        this.#_closeButton.src = "assets/icons/close.svg"
        this.#_closeButton.setAttribute('style', this.#_styles.closeButton)

        // Create Title Box
        const title = document.createElement('h2')
        title.innerHTML = `${this.#_title}`
        title.setAttribute('style', this.#_styles.title)

        // Create header Box
        const header = document.createElement('header')
        header.appendChild(title)
        header.appendChild(this.#_closeButton)
        header.setAttribute('style', this.#_styles.header)

        // Create content Box
        this.#_contentBox = document.createElement('div')
        this.#_contentBox.setAttribute('style', this.#_styles.contentBox)

        // Init Box
        this.#_box = document.createElement('div')
        this.#_box.classList.add(`${this.#_name}-modal`)
        this.#_box.appendChild(header)
        this.#_box.appendChild(this.#_contentBox)
        this.#_box.setAttribute('style', this.#_styles.box)
    }

    #initWrapper(lightBox) {
        this.#_wrapper = document.createElement('div')
        this.#_wrapper.appendChild(this.#_box)
        this.#_wrapper.setAttribute('style', this.#_styles.wrapper(lightBox))
    }

    #initEvents() {
        this.#_closeButton.addEventListener('click', () => {
            this.hide()
        })
    }

    addContent(child) {
        this.#_contentBox.insertAdjacentElement('beforeend', child)
    }

    show() {
        this.#_wrapper.style.display = "flex"
    }
    
    hide() {
        this.#_wrapper.style.display = "none"
    }

    get modal() {
        return this.#_wrapper
    }
}