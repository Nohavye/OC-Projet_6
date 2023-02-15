/** 
 * Gestion de données JSON. */
export class dataManager {
    static #data

    /**
     * Charger des données depuis un fichier JSON.
     * @param {string} url Chemin du fichier JSON.
     */
    static async loadData(url) {
        this.#data = await fetch(url)
            .then(answer => answer.json())
            .catch(error => console.error(error))
    }

    /**
     * Récupérer les données d'une section.
     * @param {string} section Section de fichier JSON.
     * @returns Retourne les données compris dans la section.
     */
    static getData(section) {
        try {
            return this.#data[`${section}`]
        } catch(error) {
            console.error(error)
        }
    }

    /**
     * Récupérer un objet en fonction de la valeur d'une de ses propriété.
     * @param {string} section Section de fichier JSON visée.
     * @param {string} property Propriété visée.
     * @param {any} value Valeur de cette propriété.
     * @returns Un tableau contenant tout les objets ayant la propriété visée à la valeur spécifiée.
     */
    static search(section, property, value) {
        const results = []

        try {
            const data = this.#data[`${section}`]
            
            for(let element of data) {
                if(element[`${property}`] === value) {
                    results.push(element)
                }
            }

            return results

        } catch(error) {
            console.error(error)
        }
    }
}