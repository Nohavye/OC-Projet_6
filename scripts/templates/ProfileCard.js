import Template from './Template.js'

class ProfileCard {
  constructor (entity) {
    this._template = {
      _: document.createElement('div'),
      _attributes: { class: 'profile-card' },

      link: {
        _: document.createElement('a'),
        _attributes: { href: `profilePage.html?id=${entity.id}` },

        photo: {
          _: document.createElement('img'),
          _attributes: {
            src: entity.portrait.thumbnail,
            alt: `photo de ${entity.name}`
          }
        },

        title: {
          _: document.createElement('h2'),
          _textContent: entity.name
        }
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
      },

      price: {
        _: document.createElement('p'),
        _textContent: `${entity.price} € / jour`,
        _attributes: { class: 'price' }
      }
    }

    Template.build(this._template)
  }

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  get element () {
    return this._template._
  }
}

export { ProfileCard as default }