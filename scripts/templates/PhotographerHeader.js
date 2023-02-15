/** Création du header photographe */
export class PhotographerHeader {
    #_header

    /**
     * Créer le header photographe.
     * @param {PhotographerEntity} entity Une entité photographe.
     */
    constructor(entity) {
        this.#_header = document.createElement('div')
        this.#_header.classList.add('photograph-header')

        this.#_header.innerHTML = `
            <div class="photographer-info">
                <h2>${entity.name}</h2>
                <p class="place">${entity.city}, ${entity.country}</p>
                <p class="tagline">${entity.tagline}</p>
            </div>

            <button class="contact_button">Contactez-moi</button>

            <div class="photographer-photo">
                <img src="${entity.portrait.thumbnail}" alt="photo de ${entity.name}">
            </div>
        `
    }

    /** Retourne le header. */
    get() {
        return this.#_header
    }

    get contactButton() {
        return document.querySelector(".contact_button")
    }
}