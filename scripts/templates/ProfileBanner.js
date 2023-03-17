import Template from './Template.js'

/**
 * Représente une bannière de profil.
 */
class ProfileBanner {
  /**
   * Crée une instance de ProfileBanner.
   * @param {ProfileEntity} entity - Une entité de profil.
   */
  constructor (entity) {
    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('header'),
      _attributes: {
        class: 'profile-banner',
        'aria-label': 'Bannière de profil'
      },

      informations: {
        _: document.createElement('div'),
        _attributes: {
          role: 'region',
          'aria-label': `Informations sur ${entity.name}`
        },

        title: {
          _: document.createElement('h2'),
          _textContent: entity.name
        },

        place: {
          _: document.createElement('p'),
          _textContent: `${entity.city}, ${entity.country}`,
          _attributes: { class: 'place' }
        },

        tagline: {
          _: document.createElement('p'),
          _textContent: entity.tagline,
          _attributes: { class: 'tagline' }
        }
      },

      contactButton: {
        _: document.createElement('button'),
        _textContent: 'Contactez-moi',
        _attributes: {
          class: 'contact-button',
          title: `Cliquez pour envoyer un message à ${entity.name}`,
          'aria-label': `Cliquez pour envoyer un message à ${entity.name}`
        }
      },

      img: {
        _: document.createElement('img'),
        _attributes: {
          src: entity.portrait.thumbnail,
          alt: `photo de ${entity.name}`
        }
      }
    }
    Template.build(this._template)
  }

  /**
   * Ajoute la bannière de profil à un élément parent.
   * @param {HTMLElement} parent - L'élément parent où ajouter la bannière de profil.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Retourne le bouton de contact de la bannière de profil.
   * @returns {HTMLElement} - Le bouton de contact.
   */
  get contactButton () {
    return this._template.contactButton._
  }

  /**
   * Retourne l'élément racine de la bannière de profil.
   * @returns {HTMLElement} - La bannière.
   */
  get element () {
    return this._template._
  }
}

export { ProfileBanner as default }
