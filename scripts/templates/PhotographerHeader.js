import { Template } from './Template.js'

export class PhotographerHeader {
  constructor (entity) {
    this._template = {
      _: document.createElement('div'),
      _attributes: { class: 'photographer-header' },

      informations: {
        _: document.createElement('div'),
        _attributes: { class: 'photographer-info' },

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
        _attributes: { class: 'contact-button' }
      },

      photo: {
        _: document.createElement('div'),
        _attributes: { class: 'photographer-photo' },

        img: {
          _: document.createElement('img'),
          _attributes: {
            src: entity.portrait.thumbnail,
            alt: `photo de ${entity.name}`
          }
        }
      }
    }
    Template.build(this._template)
  }

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  get contactButton () {
    return this._template.contactButton._
  }

  get element () {
    return this._template._
  }
}
