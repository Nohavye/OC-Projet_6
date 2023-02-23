export class Modal {
    #_name
    #_title
    #_wrapper
    #_box
    #_contentBox
    #_closeButton
    #_lightBox
    #_darkmode = false

    #_elements = {
        title: document.createElement('h2')
    }

    #_styles = {

        closeButton: `
            cursor: pointer;
        `,

        title: `
            transform: translateY(-25px);
            font-size: 64px;
            font-weight: normal;
            text-align: left;
        `,

        header: `
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
            height: max-content;
        `,

        contentBox: `
            width: 100%;
        `,

        box: `
            padding: 35px;
            min-width: 30%;
        `,
        
        wrapper: () => {
            let bgColor = 'background-color: transparent;'
            if(this.#_lightBox) { bgColor = `background-color: ${this.#lightBoxBrightness()};`}
            return `
                ${bgColor}
                z-index: 1;
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

    /**
     * Création d'une modale.
     * @param {string} name - Nom de la modale.
     * @param {string} title - Titre affiché dans la modale.
     * @param {boolean} [lightBox] - Mode lightBox.
     */
    constructor(name, title, lightBox) {
        this.#_lightBox = lightBox || false

        this.#_name = name
        this.#_title = title

        this.#initBox()
        this.#initWrapper()
        this.#initEvents()
    }

    #lightBoxBrightness() {
        if(this.#_darkmode) {
            return 'rgba(0, 0, 0, 0.75)'
        } else {
            return 'rgba(255, 255, 255, 0.75)'
        }
    }

    #initBox() {
        // Create CloseButton Box
        this.#_closeButton = document.createElement('img')
        this.#_closeButton.src = "assets/icons/close.svg"
        this.#_closeButton.setAttribute('style', this.#_styles.closeButton)

        // Create Title Box
        // const title = document.createElement('h2')
        this.#_elements.title.innerHTML = `${this.#_title}`
        this.#_elements.title.setAttribute('style', this.#_styles.title)

        // Create header Box
        const header = document.createElement('header')
        header.appendChild(this.#_elements.title)
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

    #initWrapper() {
        this.#_wrapper = document.createElement('div')
        this.#_wrapper.appendChild(this.#_box)
        this.#_wrapper.setAttribute('style', this.#_styles.wrapper())
    }

    #initEvents() {
        this.#_closeButton.addEventListener('click', () => {
            this.hide()
        })
    }

    setDarkMode(isTrue) {
        this.#_darkmode = isTrue
        this.#_wrapper.setAttribute('style', this.#_styles.wrapper())
    }

    setTitle(title) {
        this.#_elements.title.innerHTML = title
    }

    /**
     * Ajouter un élement dans la modal.
     * @param {Element} child - Element enfant.
     */
    addContent(child) {
        this.#_contentBox.insertAdjacentElement('beforeend', child)
    }

    /**
     * Afficher la modale. */
    show() {
        this.#_wrapper.style.display = "flex"
    }
    
    /**
     * Cacher la modale. */
    hide() {
        this.#_wrapper.style.display = "none"
    }

    /**
     * Retourne la modale. */
    get get() {
        return this.#_wrapper
    }
}