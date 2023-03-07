import Template from './Template.js'

/**
 * La classe InsertBox représente l'encart affichant le nombre
 * de likes et le tarif journalier sur la page de profil.
 */
class InsertBox {
  /**
   * Crée une nouvelle instance de la classe InsertBox.
   * @param {number} likes - Le nombre initial de likes à afficher.
   * @param {number} price - Le prix par jour à afficher.
   */
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

    /**
     * Écouteur d'événements pour l'événement 'likeCardClick',
     * qui met à jour le nombre de likes affichés.
     */
    document.addEventListener('likeCardClick', (e) => {
      this._likes += e.detail.addedValue
      this._template.likes._.innerHTML = `${this._likes} \u2665`
    })
  }

  /**
   * Ajoute l'élément HTML de la boîte InsertBox à un élément parent.
   * @param {HTMLElement} parent - L'élément parent.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Renvoie l'élément HTML de l'instance de la boîte InsertBox.
   * @returns {HTMLElement} L'élément HTML.
   */
  get element () {
    return this._template._
  }
}

export { InsertBox as default }
