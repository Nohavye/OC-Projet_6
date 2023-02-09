export class dataApi {

    /*  Classe: dataApi
        Récupère les données au format JSON
        */

    static #data

    static async initData(url) {
        const data = localStorage.getItem(url)

        if(data === null) {
            try {

                this.#data = await fetch(url)
                    .then(answer => answer.json())
                    .catch(error => console.error(error))

                localStorage.setItem(url, JSON.stringify(this.#data))

            } catch(error) {
                console.error(error)
            }
        } else {
            this.#data = JSON.parse(data)
        }
    }

    static getData(section) {
        try {
            return this.#data[`${section}`]
        } catch(error) {
            console.error(error)
        }
    }

    static search(section, property, value) {
        try {
            const data = this.#data[`${section}`]
            
            for(let element of data) {
                if(element[`${property}`] === value) {
                    return element
                }
            }
        } catch(error) {
            console.error(error)
        }
    }
}