/** Constructor Pattern: Formatage des données relative au média */
export class MediaEntity {

    /**
     * Créer une entité média.
     * @param {object} data Données d'un média.
     */
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._file = data.image

        if(typeof(data.image) != 'undefined') {
            this._file = data.image
            this._fileType = 'image'
        } else if(typeof(data.video) != 'undefined') {
            this._file = data.video
            this._fileType = 'video'
        } else {
            this._file = null
            this._fileType = null
        }

        this._likes = data.likes
        this._date = data.date
        this._price = data.price
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get file() {
        return `assets/photographers/photos/${this._photographerId}/${this._file}`
    }

    get fileType() {
        return this._fileType
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}