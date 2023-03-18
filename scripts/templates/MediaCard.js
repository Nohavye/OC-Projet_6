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

    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('div'),
      _attributes: {
        class: 'mediaCard',
        role: 'listitem'
      },

      // Vignette basée sur l'élément <figure>.
      figure: {
        _: document.createElement('figure'),

        // Implémentation des paramètres communs au média
        // affiché dans la carte. sous la forme d'un bouton.
        media: {
          _attributes: {
            class: 'media-link',
            title: `Afficher la ${this.#describeMedia()}`,
            alt: `Afficher la ${this.#describeMedia()}`,
            'aria-hashpopup': 'viewer-modal',
            role: 'link',
            tabindex: '0',
            style: 'cursor: pointer;'
          },

          // Evènements de la carte.
          _events: {
            click: this.#eventListeners.media.click,
            keydown: this.#eventListeners.media.keydown
          }
        },

        // Légende de la vignette.
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
              role: 'checkbox',
              'aria-checked': false,
              tabindex: '0',
              style: 'cursor: pointer;'
            },
            _events: {
              click: this.#eventListeners.likes.click,
              keyup: this.#eventListeners.likes.keyup
            }
          }
        }
      }
    }

    // Fin de l'implémentation du média affiché dans la carte
    // en fonction du type de média. ( image ou vidéo )
    switch (entity.fileType) {
      case 'image':
        this._template.figure.media._ = document.createElement('img')
        this._template.figure.media._attributes.src = entity.file
        break

      case 'video':
        this._template.figure.media._ = document.createElement('video')
        this._template.figure.media._attributes.autoplay = 'true'
        this._template.figure.media._attributes.mute = 'true'
        this._template.figure.media._attributes.loop = 'true'

        this._template.figure.media.source = {
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

  // Accessibilité:
  // Description du média fontion de son type.
  #describeMedia () {
    switch (this._entity.fileType) {
      case 'image':
        return `photo nommée '${this._entity.title}'`

      case 'video':
        return `vidéo nommée '${this._entity.title}'`
    }
  }

  // Accessibilité:
  // Description de l'intéractivité possible sur la mention 'j'aime'.
  #describeLikes () {
    if (this._likes === this._entity.likes) {
      return `${this._likes} mention 'j'aime'. Attribuer une mention 'j'aime' à la ${this.#describeMedia()}`
    } else {
      return `${this._likes} mention 'j'aime'. Retirer votre mention 'j'aime' de la ${this.#describeMedia()}`
    }
  }

  // Gestion de l'intéractivité sur la mention 'j'aime'.
  #handleClickToLike () {
    let addedValue = null

    if (this._likes === this._entity.likes) {
      addedValue = 1
      this._likes += addedValue
      this._template.figure.caption.likes._.innerHTML = `${this._likes} \u2665`
      this._template.figure.caption.likes._.setAttribute('aria-checked', true)
    } else {
      addedValue = -1
      this._likes += addedValue
      this._template.figure.caption.likes._.innerHTML = `${this._likes} \u2661`
      this._template.figure.caption.likes._.setAttribute('aria-checked', false)
    }

    this._template.figure.caption.likes._.setAttribute('title', this.#describeLikes())
    this._template.figure.caption.likes._.setAttribute('aria-label', this.#describeLikes())

    document.dispatchEvent(new CustomEvent('likeCardClick', {
      detail: { addedValue }
    }))
  }

  // Fonctions liées au évènements de la carte.
  #eventListeners = {

    // Diffusion d'un évènement 'mediaCardSelect' au clique
    // et sur pression de la touche 'Enter'.
    media: {
      click: () => {
        document.dispatchEvent(new CustomEvent('mediaCardSelect', {
          detail: { mediaId: this._entity.id }
        }))
      },

      keydown: (e) => {
        if (e.key === 'Enter') {
          document.dispatchEvent(new CustomEvent('mediaCardSelect', {
            detail: { mediaId: this._entity.id }
          }))
        }
      }
    },

    // Gestion de l'intéractivité sur la mention 'j'aime'
    // au clique et sur pression de la touche 'Enter'.
    likes: {
      click: () => {
        this.#handleClickToLike()
      },

      keyup: (e) => {
        if (e.key === 'Enter') {
          this.#handleClickToLike()
        }
      }
    }
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
