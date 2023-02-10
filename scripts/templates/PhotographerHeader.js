export class PhotographerHeader {

    constructor(photographerData) {
        this._data = photographerData
    }

    update(textWrapper, imageWrapper) {
        textWrapper.innerHTML = `
            <h2>${this._data.name}</h2>
            <p class="place">${this._data.city}, ${this._data.country}</p>
            <p class="tagline">${this._data.tagline}</p>
        `
        imageWrapper.innerHTML = `
            <img src="${this._data.portrait.thumbnail}" alt="photo de ${this._data.name}">
        `
    }
}