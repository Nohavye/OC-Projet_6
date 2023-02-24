/**
 * Création de l'encart */
export class InsertBox {
  #_inserBox
  #_likesCounter

  /**
     * Création de l'encart likes / tarif.
     * @param {number} likes - Nombre de likes.
     * @param {number} price - Tarif journalier.
     */
  constructor (likes, price) {
    this.#_likesCounter = likes
    this.#_inserBox = document.createElement('div')
    this.#_inserBox.classList.add('insertBox')

    const likesElement = document.createElement('p')
    likesElement.innerHTML = `${this.#_likesCounter} \u2665`

    const priceElement = document.createElement('p')
    priceElement.innerHTML = `${price}€/jour`

    this.#_inserBox.appendChild(likesElement)
    this.#_inserBox.appendChild(priceElement)

    document.addEventListener('likeClick', () => {
      this.#_likesCounter += 1
      likesElement.innerHTML = `${this.#_likesCounter} \u2665`
    })
  }

  /**
     * Retourne l'encart. */
  get get () {
    return this.#_inserBox
  }
}
