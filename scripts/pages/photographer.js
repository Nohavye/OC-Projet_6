import { dElements, filtreOptions, contactFormInputs } from '../utils/variables.js'
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
  // Récupère id du photographe dans les paramètres de la page
  const params = (new URL(document.location)).searchParams
  return parseInt(params.get('id'))
}

function formatPhotographerData (photographerData) {
  return new PhotographerEntity(photographerData)
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

function createFiltreSelector () {
  const filtreSelector = new OptionSelector('filter', 'Trier par', filtreOptions)
  // filtreSelector.addTo(dElements.main)
  return filtreSelector
}

function createPhotographerBanner (photographerEntity) {
  const photographerBanner = new PhotographerHeader(photographerEntity)
  // photographerBanner.addTo(dElements.main)
  return photographerBanner
}

function createContactModal (photographerName) {
  const contactForm = new FormElement('contact', contactFormInputs)

  const contactModal = new ModalWrapper('contact', `Contactez moi<br>${photographerName}`)
  contactModal.setCloseButtonImage('assets/icons/close.svg')
  contactModal.addContent(contactForm.element)

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

  // contactModal.addTo(dElements.main)
  return contactModal
}

function createViewerModal () {
  const viewer = new Viewer()
  const viewerModal = new ModalWrapper('viewer')
  viewerModal.addContent(viewer.element)

  // viewerModal.addTo(dElements.main)
  return { modal: viewerModal, viewer, addTo: parent => { viewerModal.addTo(parent) } }
}

function createInsertBox (mediasData, photographerPrice) {
  const insertBox = new InsertBox(addLikes(mediasData), photographerPrice)
  // insertBox.addTo(dElements.main)
  return insertBox
}

async function getData () {
  await dataManager.loadData('data/photographers.json') // Chargement des données JSON.
  const id = getId() // Récupère id du photographe.

  // Récupérer et formater les données du photographe.
  const photographer = formatPhotographerData(
    dataManager.search('photographers', 'id', id)[0]
  )

  // Récupérer et formater les données des médias.
  const media = formatMediasData(
    dataManager.search('media', 'photographerId', id)
  )

  return { photographer, media }
}

function createComponents (data) {
  const components = {
    photographerBanner: createPhotographerBanner(data.photographer), // Création de la bannière
    filtreSelector: createFiltreSelector(), // Création filtre
    contactModal: createContactModal(data.photographer.name), // Création de la modale pour le formulaire
    viewerModal: createViewerModal(), // Création de la modale pour le viewer
    insertBox: createInsertBox(data.media, data.photographer.price) // Afficher encart
  }

  Object.values(components).forEach(element => element.addTo(dElements.main))
  return components
}

function initEvents (components, mediaCards) {
  // Initialisation des évènements
  components.photographerBanner.contactButton.addEventListener('click', () => {
    components.contactModal.show()
  })

  components.filtreSelector.element.addEventListener('filter-option-change', (e) => {
    mediaCards = orderMediaCards(mediaCards, e.detail.option)
    displayMediaCards(mediaCards)
    components.viewerModal.viewer.setPlaylist(mediaCards)
  })

  document.addEventListener('likeCardClick', () => {
    if (components.filtreSelector.value === 'popularity') {
      mediaCards = orderMediaCards(mediaCards, 'popularity')
      displayMediaCards(mediaCards)
      components.viewerModal.viewer.setPlaylist(mediaCards)
    }
  })

  document.addEventListener('mediaCardClick', (e) => {
    components.viewerModal.viewer.setScreen(e.detail.mediaId)
    components.viewerModal.modal.show()
  })
}

async function init () {
  // Chargement des data JSON
  const data = await getData()
  const components = createComponents(data)
  const mediaCards = createMediaCards(data.media) // Création des cartes média
  initEvents(components, mediaCards)
  components.filtreSelector.value = 'date'
}

init()
