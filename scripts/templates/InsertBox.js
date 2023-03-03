import { Template } from './Template.js'

export class InsertBox {
  constructor (likes, price) {
    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: 'insertBox'
      },

      likes: {
        _: document.createElement('p'),
        _textContent: `${likes} \u2665`
      },

      price: {
        _: document.createElement('p'),
        _textContent: `${price}€/jour`
      }
    }
    Template.build(this._template)
  }

  get element () {
    return this._template._
  }
}
