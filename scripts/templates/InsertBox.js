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

    // Pattern pour la création du template.
    this._template = {

      // Conteneur principal.
      _: document.createElement('aside'),
      _attributes: {
        class: 'insertBox'
      },

      likes: {
        _: document.createElement('p'),
        _textContent: `${this._likes} \u2665`,
        _attributes: {
          title: this.#describeLikes(),
          'aria-label': this.#describeLikes()
        }
      },

      price: {
        _: document.createElement('p'),
        _textContent: `${price}€/jour`,
        _attributes: {
          title: `Le tarif journalier de l'artiste est de ${price} euros`,
          'aria-label': `Le tarif journalier de l'artiste est de ${price} euros`
        }
      }
    }

    Template.build(this._template)

    /**
     * Écouteur d'événement pour l'événement 'likeCardClick',
     * qui met à jour le nombre de likes affichés.
     */
    document.addEventListener('likeCardClick', (e) => {
      this._likes += e.detail.addedValue
      this._template.likes._.innerHTML = `${this._likes} \u2665`
      this._template.likes._.setAttribute('title', this.#describeLikes())
      this._template.likes._.setAttribute('aria-label', this.#describeLikes())
    })
  }

  #describeLikes () {
    return `L'artiste totalise en tout ${this._likes} mentions 'j'aime'`
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
