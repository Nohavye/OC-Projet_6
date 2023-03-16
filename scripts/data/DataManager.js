import { MediaEntity, ProfileEntity } from './DataEntities.js'

/**
 * Objet Format utilisé pour représenter différents formats de données.
 * @property {Symbol} Media - Symbol pour représenter le format média.
 * @property {Symbol} Profile - Symbol pour représenter le format profil.
 */
const Format = Object.freeze({
  Media: Symbol('media'),
  Profile: Symbol('profile')
})

/**
 * Classe DataFactory utilisée pour créer des entités à partir de données et d'un format donnés.
 */
class DataFactory {
  /**
   * Crée une nouvelle instance d'une entité en fonction du format donné.
   * @param {*} data - Les données à utiliser pour créer l'entité.
   * @param {Symbol} format - Le format des données passées.
   * @returns {MediaEntity|ProfileEntity} Une instance d'entité correspondant au format donné.
   */
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
 * Classe DataManager utilisée pour gérer les données de l'application.
 */
class DataManager {
  /**
   * Les données chargées à partir d'une URL.
   */
  static #data

  /**
   * Charge les données à partir d'une URL.
   * @param {string} url - L'URL des données à charger.
   * @returns {Promise} Une promesse résolue avec les données chargées.
   */
  static async loadData (url) {
    this.#data = await fetch(url)
      .then(answer => answer.json())
      .catch(error => console.error(error))
  }

  /**
   * Récupère les données pour une section donnée.
   * @param {string} section - La section de données à récupérer.
   * @param {Symbol} [format] - Le format de données à utiliser pour formater les résultats.
   * @returns {Array|Object} Un tableau d'éléments formatés si un format est fourni, sinon un objet simple.
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
   * Effectue une recherche dans les données pour une propriété et une valeur donnée.
   *
   * @param {string} section - La section dans laquelle effectuer la recherche.
   * @param {string} property - La propriété à rechercher.
   * @param {any} value - La valeur de la propriété à rechercher.
   *
   * @param {Format} [format] - Le format dans lequel les résultats doivent être retournés.
   * Si spécifié, chaque élément correspondant sera formaté selon le format spécifié.
   * Si non spécifié, les éléments correspondants seront retournés sans formatage.
   *
   * @returns {Array} - Un tableau contenant les éléments correspondants à la recherche.
   * Si un format est spécifié, les éléments seront formatés selon ce format.
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
