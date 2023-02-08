export class PhotographerData {

    /*  Constructor Pattern: Photographer
        Formatage des données relatives au photographe
        provenant de l'API
        */

    constructor(data) {
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return {
            pricture: `assets/photographers/portraits/${this._portrait}`,
            thumbnail: `assets/photographers/portraits/thumbnails/${this._portrait}`
        }
    }
}