import Template from './Template.js'

/**
 * Représente une carte pour afficher un média (image ou vidéo)
 * avec son titre et son nombre de likes.
 */
class MediaCard {
  /**
   * Crée une instance de MediaCard.
   * @param {MediaEntity} entity - L'Entité représentant le média.
   */
  constructor (entity) {
    this._likes = entity.likes
    this._entity = entity

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: 'mediaCard',
        role: 'listitem'
      },

      thumbnail: {
        _: document.createElement('figure'),

        media: {
          _attributes: {
            class: 'media-link',
            title: `Afficher la ${this.#describeMedia()}`,
            alt: `Afficher la ${this.#describeMedia()}`,
            role: 'button',
            tabindex: '0',
            style: 'cursor: pointer;'
          },

          _events: {
            click: () => {
              document.dispatchEvent(new CustomEvent('mediaCardSelect', {
                detail: { mediaId: entity.id }
              }))
            },

            keydown: (e) => {
              if (e.key === 'Enter') {
                document.dispatchEvent(new CustomEvent('mediaCardSelect', {
                  detail: { mediaId: entity.id }
                }))
              }
            }
          }
        },

        caption: {
          _: document.createElement('figcaption'),
          _attributes: { class: 'legend' },

          title: {
            _: document.createElement('p'),
            _textContent: entity.title,
            _attributes: { class: 'title' }
          },

          likes: {
            _: document.createElement('p'),
            _textContent: `${this._likes} \u2661`,
            _attributes: {
              class: 'likes',
              title: this.#describeLikes(),
              'aria-label': this.#describeLikes(),
              role: 'button',
              tabindex: '0',
              style: 'cursor: pointer;'
            },
            _events: {
              click: () => {
                this.#clickToLike()
              },

              keyup: (e) => {
                if (e.key === 'Enter') {
                  this.#clickToLike()
                }
              }
            }
          }
        }
      }
    }

    switch (entity.fileType) {
      case 'image':
        this._template.thumbnail.media._ = document.createElement('img')
        this._template.thumbnail.media._attributes.src = entity.file
        break

      case 'video':
        this._template.thumbnail.media._ = document.createElement('video')
        this._template.thumbnail.media._attributes.autoplay = 'true'
        this._template.thumbnail.media._attributes.mute = 'true'
        this._template.thumbnail.media._attributes.loop = 'true'

        this._template.thumbnail.media.source = {
          _: document.createElement('source'),
          _attributes: {
            src: entity.file,
            type: 'video/mp4'
          }
        }
        break
    }

    Template.build(this._template)
  }

  #describeMedia () {
    switch (this._entity.fileType) {
      case 'image':
        return `photo nommée '${this._entity.title}'`

      case 'video':
        return `vidéo nommée '${this._entity.title}'`
    }
  }

  #describeLikes () {
    if (this._likes === this._entity.likes) {
      return `${this._likes} mention 'j'aime'. Attribuer une mention 'j'aime' à la ${this.#describeMedia()}`
    } else {
      return `${this._likes} mention 'j'aime'. Retirer votre mention 'j'aime' de la ${this.#describeMedia()}`
    }
  }

  #clickToLike () {
    let addedValue = null

    if (this._likes === this._entity.likes) {
      addedValue = 1
      this._likes += addedValue
      this._template.thumbnail.caption.likes._.innerHTML = `${this._likes} \u2665`
    } else {
      addedValue = -1
      this._likes += addedValue
      this._template.thumbnail.caption.likes._.innerHTML = `${this._likes} \u2661`
    }

    this._template.thumbnail.caption.likes._.setAttribute('title', this.#describeLikes())
    this._template.thumbnail.caption.likes._.setAttribute('aria-label', this.#describeLikes())

    document.dispatchEvent(new CustomEvent('likeCardClick', {
      detail: { addedValue }
    }))
  }

  /**
   * Ajoute la carte au parent spécifié.
   * @param {HTMLElement} parent - L'élément HTML parent.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Retourne le nombre de likes du média.
   * @returns {number} - Le nombre de likes.
   */
  get likes () {
    return this._likes
  }

  /**
   * Retourne l'objet représentant le média.
   * @returns {MediaEntity} - L'objet représentant le média.
   */
  get entity () {
    return this._entity
  }

  /**
   * Retourne l'élément HTML correspondant à la carte.
   * @returns {HTMLElement} - L'élément HTML de la carte.
   */
  get element () {
    return this._template._
  }
}

export { MediaCard as default }
