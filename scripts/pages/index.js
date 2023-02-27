import { dElements } from '../utils/variables.js'
import { dataManager } from '../api/dataManager.js'
import { PhotographerEntity } from '../models/PhotographerEntity.js'
import { PhotographerCard } from '../templates/PhotographerCard.js'

async function init () {
  // Récupère les datas des photographes
  await dataManager.loadData('data/photographers.json')
  const photographersData = dataManager.getData('photographers')

  // Affiche les cartes de photographes
  photographersData.forEach(data => {
    dElements.photographersSection.appendChild(
      new PhotographerCard(new PhotographerEntity(data)).get
    )
  })
}

init()
