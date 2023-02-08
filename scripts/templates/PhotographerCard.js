export class PhotographerCard {

    /*  Classe: PhotographerCard
        Création d'une carte de photographe
        */
       
    constructor(photographer) {
        this._data = photographer
    }

    create() {
        const card = document.createElement('div')
        card.classList.add('photographerCard')

        card.innerHTML = `
            <img src="${this._data.portrait.thumbnail}">
            <h2>${this._data.name}</h2>
            <p class="place">${this._data.city}, ${this._data.country}</p>
            <p class="tagline">${this._data.tagline}</p>
            <p class="price">${this._data.price}€/jour</p>
        `
        return card
    }
}