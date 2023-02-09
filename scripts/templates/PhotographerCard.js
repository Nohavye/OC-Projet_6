// Élements du DOM existants
const dElements = {
    photographersSection: document.querySelector(".photographer_section")
}

export class PhotographerCard {

    /*  Classe: PhotographerCard
        Création d'une carte de photographe
        */
       
    constructor(photographerData) {
        this._data = photographerData
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
        dElements.photographersSection.appendChild(card)
        // return card
    }
}