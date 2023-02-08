export class dataApi {

    /*  Classe: dataApi
        Récupère les données au format JSON
        */

    static #data

    static async initData(url) {
        this.#data = await fetch(url)
            .then(answer => answer.json())
            .catch(error => console.error(error))
    }

    static getData(section) {
        try {
            return this.#data[`${section}`]
        } catch(error) {
            console.error(error)
        }
    }
}