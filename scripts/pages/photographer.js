import { dElements, contactFormInputs } from '../utils/variables.js'
import { dataManager } from '../api/dataManager.js'
import { PhotographerEntity } from '../models/PhotographerEntity.js'
import { PhotographerHeader } from '../templates/PhotographerHeader.js'
import { OptionSelector } from '../templates/OptionSelector.js'
import { MediaEntity } from '../models/MediaEntity.js'
import { MediaCard } from '../templates/MediaCard.js'
import { InsertBox } from '../templates/InsertBox.js'
import { addLikes } from '../utils/functions.js'

import { ModalWrapper } from '../templates/ModalWrapper.js'
import { Form } from '../templates/Form.js'
import { Viewer } from '../templates/Viewer.js'

function getId () {
  const params = (new URL(document.location)).searchParams
  return parseInt(params.get('id'))
}

function displayCards (mediaEntitys) {
  dElements.browserSection.innerHTML = ''
  mediaEntitys.forEach(entity => {
    dElements.browserSection.appendChild(new MediaCard(entity).get)
  })
}

async function init () {
  // Chargement des data JSON
  await dataManager.loadData('data/photographers.json')

  // Récupère id du photographe dans les paramètres de la page
  const photographerId = getId()

  // Récupère les datas du photographe f(id)
  const photographerEntity = new PhotographerEntity(dataManager.search('photographers', 'id', photographerId)[0])

  // Récupère les médias (datas)
  const mediasData = dataManager.search('media', 'photographerId', photographerId)

  // Création filtre
  const filtreSelector = new OptionSelector('filter', 'Trier par', {
    popularity: { name: 'Popularité', value: 'popularity' },
    date: { name: 'Date', value: 'date' },
    title: { name: 'Titre', value: 'title' }
  })
  filtreSelector.addTo(dElements.main)

  // Création de la bannière
  const photographerHeader = new PhotographerHeader(photographerEntity)
  dElements.main.insertAdjacentElement('afterbegin', photographerHeader.get)

  // Création de la modale pour le formulaire
  const contactForm = new Form('contact', contactFormInputs)

  const contactModal = new ModalWrapper('contact', `Contactez moi<br>${photographerEntity.name}`)
  contactModal.setCloseButton('assets/icons/close.svg')
  contactModal.addContent(contactForm.get)

  dElements.main.appendChild(contactModal.element)

  contactForm.startListeners()

  contactForm.get.addEventListener('submit-contact', (e) => {
    const answers = e.detail.answers
    for (const entry of answers) { console.log(`${entry[0]}: ${entry[1]}`) }
    contactForm.displaySuccesMessage(`
            Merci ${answers.get('first-name')} pour votre message, il a bien été transmis.
            Notre artiste vous répondra dans les meilleurs délais à l'adresse suivante:
            ${answers.get('email')}
        `, 'Nouveau message')
  })

  photographerHeader.contactButton.addEventListener('click', () => {
    contactModal.show()
  })

  // Afficher les médias
  const mediaEntities = []
  mediasData.forEach(data => {
    mediaEntities.push(new MediaEntity(data))
  })

  const viewer = new Viewer()

  filtreSelector.get.addEventListener('filter-option-change', (e) => {
    switch (e.detail.option) {
      case 'popularity':
        mediaEntities.sort((a, b) => b.likes - a.likes)
        displayCards(mediaEntities)
        viewer.setPlaylist(mediaEntities)
        break

      case 'date':
        mediaEntities.sort((a, b) => new Date(a.date) - new Date(b.date))
        displayCards(mediaEntities)
        viewer.setPlaylist(mediaEntities)
        break

      case 'title':
        mediaEntities.sort((a, b) => a.title.localeCompare(b.title))
        displayCards(mediaEntities)
        viewer.setPlaylist(mediaEntities)
        break
    }
  })

  filtreSelector.value = 'date'

  const viewerModal = new ModalWrapper('viewer')
  viewerModal.addContent(viewer.get)

  dElements.main.appendChild(viewerModal.element)

  document.addEventListener('mediaClick', (e) => {
    console.log(e.detail.mediaId)
    viewer.setScreen(e.detail.mediaId)
    viewerModal.show()
  })

  // Afficher encart
  const insertBox = new InsertBox(addLikes(mediasData), photographerEntity.price)
  dElements.main.appendChild(insertBox.get)
}

init()
