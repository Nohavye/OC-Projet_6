/** Création d'une carte de photographe */
export class PhotographerCard {

    /**
     * Créer une carte de photographe.
     * @param {object} photographerEntity 
     */
    constructor(photographerEntity) {
        this._data = photographerEntity
    }

    create() {
        const card = document.createElement('div')
        card.classList.add('photographerCard')

        card.innerHTML = `
            <a href="photographer.html?id=${this._data.id}">
                <img src="${this._data.portrait.thumbnail}" alt="photo de ${this._data.name}">
                <h2>${this._data.name}</h2>
            </a>

            <p class="place">${this._data.city}, ${this._data.country}</p>
            <p class="tagline">${this._data.tagline}</p>
            <p class="price">${this._data.price}€/jour</p>
        `
        return card
    }
}