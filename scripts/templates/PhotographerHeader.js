// Élements du DOM existants
const dElements = {
    wrapperInfo: document.querySelector(".photographer-info"),
    wrapperPhoto: document.querySelector(".photographer-photo")
}

export class PhotographerHeader {

    constructor(photographerData) {
        this._data = photographerData
    }

    update() {
        dElements.wrapperInfo.innerHTML = `
            <h2>${this._data.name}</h2>
            <p class="place">${this._data.city}, ${this._data.country}</p>
            <p class="tagline">${this._data.tagline}</p>
        `
        dElements.wrapperPhoto.innerHTML = `
            <img src="${this._data.portrait.thumbnail}" alt="photo de ${this._data.name}">
        `
    }
}