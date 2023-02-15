/** 
 * Création de l'encart */
export class InsertBox {
    #_inserBox

    /**
     * Création de l'encart likes / tarif.
     * @param {number} likes - Nombre de likes.
     * @param {number} price - Tarif journalier.
     */
    constructor(likes, price) {
        this.#_inserBox = document.createElement('div')
        this.#_inserBox.classList.add('insertBox')

        this.#_inserBox.innerHTML = `
            <p>${likes} \u2665</p>
            <p>${price}€/jour</p>
        `
    }

    /** 
     * Retourne l'encart. */
    get get() {
        return this.#_inserBox
    }
}