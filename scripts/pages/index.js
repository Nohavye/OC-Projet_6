import Data from '../data/DataModule.js'
import { GlobalsforIndexPage as Globals } from '../utils/GlobalsModule.js'
import { TemplatesforIndexPage as Templates } from '../templates/TemplatesModule.js'

async function init () {
  // Récupère les datas des photographes
  await Data.Manager.loadData('data/photographers.json')
  const profiles = Data.Manager.getData('photographers', Data.Format.Profile)

  // Affiche les cartes de photographes
  profiles.forEach(data => {
    new Templates.ProfileCard(data).addTo(Globals.DOM.photographersSection)
  })
}

init()
