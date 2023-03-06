import Template from './Template.js'

class InsertBox {
  constructor (likes, price) {
    this._likes = likes

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: 'insertBox'
      },

      likes: {
        _: document.createElement('p'),
        _textContent: `${this._likes} \u2665`
      },

      price: {
        _: document.createElement('p'),
        _textContent: `${price}€/jour`
      }
    }

    Template.build(this._template)

    document.addEventListener('likeCardClick', (e) => {
      this._likes += e.detail.addedValue
      this._template.likes._.innerHTML = `${this._likes} \u2665`
    })
  }

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  get element () {
    return this._template._
  }
}

export { InsertBox as default }
