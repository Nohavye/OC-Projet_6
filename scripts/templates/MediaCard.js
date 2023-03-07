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
      _attributes: { class: 'mediaCard' },

      thumbnail: {
        _: document.createElement('div'),
        _attributes: { style: 'cursor: pointer;' },
        _events: {
          click: () => {
            document.dispatchEvent(new CustomEvent('mediaCardClick', {
              detail: { mediaId: entity.id }
            }))
          }
        }
      },

      legend: {
        _: document.createElement('div'),
        _attributes: { class: 'legend' },

        title: {
          _: document.createElement('p'),
          _textContent: `${entity.title}`,
          _attributes: { class: 'title' }
        },

        likes: {
          _: document.createElement('p'),
          _textContent: `${this._likes} \u2661`,
          _attributes: {
            class: 'likes',
            style: 'cursor: pointer;'
          },
          _events: {
            click: () => {
              let addedValue = null

              if (this._likes === entity.likes) {
                addedValue = 1
                this._likes += addedValue
                this._template.legend.likes._.innerHTML = `${this._likes} \u2665`
              } else {
                addedValue = -1
                this._likes += addedValue
                this._template.legend.likes._.innerHTML = `${this._likes} \u2661`
              }

              document.dispatchEvent(new CustomEvent('likeCardClick', {
                detail: { addedValue }
              }))
            }
          }
        }
      }
    }

    Template.build(this._template)

    switch (entity.fileType) {
      case 'image':
        this._template.thumbnail._.innerHTML = `
          <img src="${entity.file}">
        `
        break

      case 'video':
        this._template.thumbnail._.innerHTML = `
          <video autoplay mute loop>
              <source src="${entity.file}" type="video/mp4">
          </video>
        `
        break
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
