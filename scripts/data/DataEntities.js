/**
 * Constructor Pattern: Formatage des données relative au média */
class MediaEntity {
  /**
     * Créer une entité média.
     * @param {object} data Données d'un média.
     */
  constructor (data) {
    this._id = data.id
    this._photographerId = data.photographerId
    this._title = data.title
    this._file = data.image

    if (typeof (data.image) !== 'undefined') {
      this._file = data.image
      this._fileType = 'image'
    } else if (typeof (data.video) !== 'undefined') {
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

  get id () {
    return this._id
  }

  get photographerId () {
    return this._photographerId
  }

  get title () {
    return this._title
  }

  get file () {
    return `assets/photographers/photos/${this._photographerId}/${this._file}`
  }

  get fileType () {
    return this._fileType
  }

  get likes () {
    return this._likes
  }

  get date () {
    return this._date
  }

  get price () {
    return this._price
  }
}

/**
 * Constructor Pattern: Formatage des données relative au photographe */
class ProfileEntity {
  /**
     * Créer une entité photographe.
     * @param {object} data Données d'un photographe.
     */
  constructor (data) {
    this._name = data.name
    this._id = data.id
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._portrait = data.portrait
  }

  get name () {
    return this._name
  }

  get id () {
    return this._id
  }

  get city () {
    return this._city
  }

  get country () {
    return this._country
  }

  get tagline () {
    return this._tagline
  }

  get price () {
    return this._price
  }

  get portrait () {
    return {
      pricture: `assets/photographers/portraits/${this._portrait}`,
      thumbnail: `assets/photographers/portraits/thumbnails/${this._portrait}`
    }
  }
}

export { MediaEntity, ProfileEntity }
