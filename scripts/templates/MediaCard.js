/** 
 * Création d'une carte de média */
export class MediaCard {
    #_card
    #_mediaElement

    /**
     * Créer une carte de média
     * @param {MediaEntity} entity une entité média.
     */
    constructor(entity) {
        this.#_card = document.createElement('div')
        this.#_card.classList.add('mediaCard')

        this.#_mediaElement = document.createElement('div')
        this.#_mediaElement.setAttribute('style', `cursor: pointer;`)

        switch(entity.fileType) {

            case 'image':
                this.#_mediaElement.innerHTML = `
                    <img src="${entity.file}">
                `
                break

            case 'video':
                this.#_mediaElement.innerHTML = `
                    <video autoplay mute loop>
                        <source src="${entity.file}" type="video/mp4">
                    </video>
                `
                break
        }

        this.#_card.insertAdjacentElement('beforeend', this.#_mediaElement)
        this.#_card.insertAdjacentHTML('beforeend', `
            <div class="legend">
                <p class="title">${entity.title}</p>
                <p class="likes">${entity.likes} \u2665</p>
            </div>
        `)

        this.#_mediaElement.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('mediaClick', {
                detail: { mediaId: entity.id }
            }))
        })
    }

    /** 
     * Retourne la carte. */
    get get() {
        return this.#_card
    }
}