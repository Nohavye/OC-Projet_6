import { MediaEntity, ProfileEntity } from './DataEntities.js'

const Format = Object.freeze({
  Media: Symbol('media'),
  Profile: Symbol('profile')
})

class DataFactory {
  constructor (data, format) {
    switch (format) {
      case Format.Media:
        return new MediaEntity(data)

      case Format.Profile:
        return new ProfileEntity(data)
    }
  }
}

/**
 * Gestion de données JSON. */
class DataManager {
  static #data

  /**
     * Charger des données depuis un fichier JSON.
     * @param {string} url Chemin du fichier JSON.
     */
  static async loadData (url) {
    this.#data = await fetch(url)
      .then(answer => answer.json())
      .catch(error => console.error(error))
  }

  /**
     * Récupérer les données d'une section.
     * @param {string} section Section de fichier JSON.
     * @returns Retourne les données compris dans la section.
     */
  static getData (section, format) {
    try {
      if (typeof (format) !== 'undefined') {
        const formatedData = []
        this.#data[section].forEach(data => {
          formatedData.push(new DataFactory(data, format))
        })
        return formatedData
      } else {
        return this.#data[section]
      }
    } catch (error) {
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
  static search (section, property, value, format) {
    const results = []

    try {
      const data = this.#data[`${section}`]

      for (const element of data) {
        if (element[`${property}`] === value) {
          if (typeof (format) !== 'undefined') {
            results.push(new DataFactory(element, format))
          } else {
            results.push(element)
          }
        }
      }

      return results
    } catch (error) {
      console.error(error)
    }
  }
}

export { Format, DataManager }
