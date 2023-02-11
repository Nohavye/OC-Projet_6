/** Création d'une carte de média */
export class MediaCard {
    #_card

    /**
     * Créer une carte de média
     * @param {MediaEntity} entity une entité média.
     */
    constructor(entity) {
        this.#_card = document.createElement('div')
        this.#_card.classList.add('mediaCard')

        switch(entity.fileType) {

            case 'image':
                this.#_card.insertAdjacentHTML('beforeend', `
                    <img src="${entity.file}">
                `)
                break

            case 'video':
                this.#_card.insertAdjacentHTML('beforeend', `
                    <video controls>
                        <source src="${entity.file}" type="video/mp4">
                    </video>
                `)
                break
        }

        this.#_card.insertAdjacentHTML('beforeend', `
            <div class="legend">
                <p class="title">${entity.title}</p>
                <p class="likes">${entity.likes} \u2665</p>
            </div>
        `)
    }

    /** Retourne la carte. */
    get() {
        return this.#_card
    }
}