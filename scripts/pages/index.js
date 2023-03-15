// Import des modules nécessaires.
import Data from '../data/DataModule.js'
import { GlobalsforIndexPage as Globals } from '../utils/GlobalsModule.js'
import { TemplatesforIndexPage as Templates } from '../templates/TemplatesModule.js'

// Charge les données JSON pour le photographe spécifié dans l'URL et formate les données.
async function getData () {
  // Charge les datas depuis le fichier JSON.
  await Data.Manager.loadData('data/photographers.json')

  // Récupère les données de profil des photographes formatées pour afficher leurs cartes.
  const profiles = Data.Manager.getData('photographers', Data.Format.Profile)

  return { profiles }
}

// Créer les cartes de profil.
function createProfileCard (profileEntities) {
  const profileCards = []
  profileEntities.forEach(entity => {
    profileCards.push(new Templates.ProfileCard(entity))
  })
  return profileCards
}

function displayProfileCards (profileCards) {
  Globals.DOM.browserSection.innerHTML = ''
  profileCards.forEach(profileCard => {
    profileCard.addTo(Globals.DOM.profilesSection)
  })
}

// Fonction d'initialisation asynchrone.
async function init () {
  const data = await getData() // Charge les données JSON.
  const profileCards = createProfileCard(data.profiles) // Créer les cartes de profil.
  displayProfileCards(profileCards) // Affiche les cartes des photographes.
}

init()
