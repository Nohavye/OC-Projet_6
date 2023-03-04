import { contactFormInputs, dElements } from '../utils/variables.js'
import { dataManager } from '../api/dataManager.js'
import { PhotographerEntity } from '../models/PhotographerEntity.js'
import { PhotographerHeader } from '../templates/PhotographerHeader.js'
import { OptionSelector } from '../templates/OptionSelector.js'
import { MediaEntity } from '../models/MediaEntity.js'
import { MediaCard } from '../templates/MediaCard.js'
import { InsertBox } from '../templates/InsertBox.js'
import { addLikes } from '../utils/functions.js'

import { ModalWrapper } from '../templates/ModalWrapper.js'
import { FormElement } from '../templates/FormElement.js'
import { Viewer } from '../templates/Viewer.js'

function getId () {
  const params = (new URL(document.location)).searchParams
  return parseInt(params.get('id'))
}

function formatMediasData (mediasData) {
  const mediaEntities = []
  mediasData.forEach(data => {
    mediaEntities.push(new MediaEntity(data))
  })
  return mediaEntities
}

function createMediaCards (mediaEntities) {
  const mediaCards = []
  mediaEntities.forEach(entity => {
    mediaCards.push(new MediaCard(entity))
  })
  return mediaCards
}

function orderMediaCards (mediaCards, orderOption) {
  switch (orderOption) {
    case 'popularity':
      mediaCards.sort((a, b) => b.likes - a.likes)
      break

    case 'date':
      mediaCards.sort((a, b) => new Date(a.entity.date) - new Date(b.entity.date))
      break

    case 'title':
      mediaCards.sort((a, b) => a.entity.title.localeCompare(b.entity.title))
      break
  }
  return mediaCards
}

function displayMediaCards (mediaCards) {
  dElements.browserSection.innerHTML = ''
  mediaCards.forEach(mediaCard => {
    dElements.browserSection.appendChild(mediaCard.element)
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
  /* ------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------ */

  const filtreSelector = new OptionSelector('filter', 'Trier par', {
    popularity: { name: 'Popularité', value: 'popularity' },
    date: { name: 'Date', value: 'date' },
    title: { name: 'Titre', value: 'title' }
  })
  filtreSelector.addTo(dElements.main)

  /* ------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------ */

  // Création de la bannière
  const photographerHeader = new PhotographerHeader(photographerEntity)
  dElements.main.insertAdjacentElement('afterbegin', photographerHeader.element)

  // Création de la modale pour le formulaire
  const contactForm = new FormElement('contact', contactFormInputs)

  const contactModal = new ModalWrapper('contact', `Contactez moi<br>${photographerEntity.name}`)
  contactModal.setCloseButtonImage('assets/icons/close.svg')
  contactModal.addContent(contactForm.element)

  dElements.main.appendChild(contactModal.element)

  contactForm.element.addEventListener('submit-contact', (e) => {
    const { answers } = e.detail

    for (const entry of answers) {
      console.log(`${entry[0]}: ${entry[1]}`)
    }

    contactForm.displaySucces(`
              Merci ${answers.get('first-name')} pour votre message, il a bien été transmis.
              Notre artiste vous répondra dans les meilleurs délais à l'adresse suivante:
              ${answers.get('email')}
          `, 'Nouveau message')
  })

  photographerHeader.contactButton.addEventListener('click', () => {
    contactModal.show()
  })

  // Afficher les médias
  /* ------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------ */

  const mediaEntities = formatMediasData(mediasData)
  let mediaCards = createMediaCards(mediaEntities)

  const viewer = new Viewer()

  /* ------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------ */

  filtreSelector.element.addEventListener('filter-option-change', (e) => {
    mediaCards = orderMediaCards(mediaCards, e.detail.option)
    displayMediaCards(mediaCards)
    viewer.setPlaylist(mediaCards)
  })

  filtreSelector.value = 'date'

  document.addEventListener('likeCardClick', () => {
    if (filtreSelector.value === 'popularity') {
      mediaCards = orderMediaCards(mediaCards, 'popularity')
      displayMediaCards(mediaCards)
      viewer.setPlaylist(mediaCards)
    }
  })

  /* ------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------ */

  const viewerModal = new ModalWrapper('viewer')
  viewerModal.addContent(viewer.element)

  dElements.main.appendChild(viewerModal.element)

  document.addEventListener('mediaCardClick', (e) => {
    console.log(e.detail.mediaId)
    viewer.setScreen(e.detail.mediaId)
    viewerModal.show()
  })

  // Afficher encart
  const insertBox = new InsertBox(addLikes(mediasData), photographerEntity.price)
  dElements.main.appendChild(insertBox.element)
}

init()
