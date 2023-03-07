// Import des modules nécessaires.
import Data from '../data/DataModule.js'
import { GlobalsforIndexPage as Globals } from '../utils/GlobalsModule.js'
import { TemplatesforIndexPage as Templates } from '../templates/TemplatesModule.js'

// Fonction d'initialisation asynchrone.
async function init () {
  // Charge les datas depuis le fichier JSON.
  await Data.Manager.loadData('data/photographers.json')

  // Récupère les données de profil des photographes formatées pour afficher leurs cartes.
  const profiles = Data.Manager.getData('photographers', Data.Format.Profile)

  // Affiche les cartes des photographes dans la section appropriée.
  profiles.forEach(data => {
    new Templates.ProfileCard(data).addTo(Globals.DOM.profilesSection)
  })
}

init()
