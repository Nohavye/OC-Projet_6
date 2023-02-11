/** Création de l'encart */
export class InsertBox {
    #_inserBox

    constructor(likes, price) {
        this.#_inserBox = document.createElement('div')
        this.#_inserBox.classList.add('insertBox')

        this.#_inserBox.innerHTML = `
            <p>${likes} \u2665</p>
            <p>${price}€/jour</p>
        `
    }

    /** Retourne l'encart */
    get() {
        return this.#_inserBox
    }
}