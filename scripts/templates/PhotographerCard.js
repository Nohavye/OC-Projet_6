/** Création d'une carte de photographe */
export class PhotographerCard {
    #_card

    /**
     * Créer une carte de photographe.
     * @param {PhotographerEntity} entity une entité photographe.
     */
    constructor(entity) {
        this.#_card = document.createElement('div')
        this.#_card.classList.add('photographerCard')

        this.#_card.innerHTML = `
            <a href="photographer.html?id=${entity.id}">
                <img src="${entity.portrait.thumbnail}" alt="photo de ${entity.name}">
                <h2>${entity.name}</h2>
            </a>

            <p class="place">${entity.city}, ${entity.country}</p>
            <p class="tagline">${entity.tagline}</p>
            <p class="price">${entity.price}€/jour</p>
        `
    }

    /** Retourne la carte. */
    get() {
        return this.#_card
    }
}