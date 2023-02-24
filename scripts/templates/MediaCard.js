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

        const legend = document.createElement('div')
        legend.classList.add('legend')

        const title = document.createElement('p')
        title.classList.add('title')
        title.innerHTML = `${entity.title}`

        const likes = document.createElement('p')
        likes.classList.add('likes')
        likes.innerHTML = `${entity.likes} \u2665`
        likes.style.cursor = 'pointer'

        legend.appendChild(title)
        legend.appendChild(likes)

        this.#_card.insertAdjacentElement('beforeend', legend)

        likes.addEventListener('click', () => {
            entity._likes += 1
            likes.innerHTML = `${entity.likes} \u2665`
            document.dispatchEvent(new Event('likeClick'))
        })

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