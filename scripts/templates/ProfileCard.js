import Template from './Template.js'

/**
 * Cette classe représente une carte de profil.
 */
class ProfileCard {
  /**
   * Crée une instance de ProfileCard.
   * @constructor
   * @param {object} entity - Une entité de profil.
   */
  constructor (entity) {
    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('div'),
      _attributes: {
        class: 'profile-card',
        role: 'listitem'
      },

      link: {
        _: document.createElement('a'),
        _attributes: {
          href: `profilePage.html?id=${entity.id}`,
          role: 'link',
          'aria-label': `Accéder au profil de ${entity.name}`
        },

        photo: {
          _: document.createElement('img'),
          _attributes: {
            src: entity.portrait.thumbnail,
            alt: `Photo de profil de ${entity.name}`
          }
        },

        title: {
          _: document.createElement('h2'),
          _textContent: entity.name
        },

        aside: {
          _: document.createElement('aside'),

          place: {
            _: document.createElement('p'),
            _textContent: `${entity.city}, ${entity.country}`,
            _attributes: { class: 'place' }
          },

          tagline: {
            _: document.createElement('p'),
            _textContent: entity.tagline,
            _attributes: { class: 'tagline' }
          },

          price: {
            _: document.createElement('p'),
            _textContent: `${entity.price} € / jour`,
            _attributes: { class: 'price' }
          }
        }
      }
    }

    Template.build(this._template)
  }

  /**
   * Ajoute la carte de profil à un élément parent.
   * @param {HTMLElement} parent - L'élément parent auquel ajouter la carte de profil.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Retourne l'élément racine de la carte de profil.
   * @returns {HTMLElement} L'élément racine de la carte de profil.
   */
  get element () {
    return this._template._
  }

  /**
   * Retourne l'élément 'link' de la carte de profil.
   * @returns {HTMLElement} L'élément 'link' de la carte de profil.
   */
  get link () {
    return this._template.link._
  }
}

export { ProfileCard as default }
