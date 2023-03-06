import Data from '../data/DataModule.js'
import { GlobalsforProfilePage as Globals } from '../utils/GlobalsModule.js'
import { TemplatesforProfilePage as Templates } from '../templates/TemplatesModule.js'

function getId () {
  // Récupère id du photographe dans les paramètres de la page
  const params = (new URL(document.location)).searchParams
  return parseInt(params.get('id'))
}

function createMediaCards (mediaEntities) {
  const mediaCards = []
  mediaEntities.forEach(entity => {
    mediaCards.push(new Templates.MediaCard(entity))
  })
  return mediaCards
}

function displayMediaCards (mediaCards) {
  Globals.DOM.browserSection.innerHTML = ''
  mediaCards.forEach(mediaCard => {
    mediaCard.addTo(Globals.DOM.browserSection)
  })
}

function createFiltreSelector () {
  const filtreSelector = new Templates.OptionSelector('filter', 'Trier par', Globals.filter.options)
  return filtreSelector
}

function createProfileBanner (profileEntity) {
  return new Templates.ProfileBanner(profileEntity)
}

function createContactModal (profileName) {
  const contactForm = new Templates.Form('contact', Globals.contactForm.inputs)

  const contactModal = new Templates.ModalWrapper('contact', `Contactez moi<br>${profileName}`)
  contactModal.setCloseButtonImage('assets/icons/close.svg')
  contactModal.addContent(contactForm.element)

  contactForm.element.addEventListener('submit-contact', (e) => {
    const { answers } = e.detail

    for (const entry of answers) {
      console.log(`${entry[0]}: ${entry[1]}`)
    }

    contactForm.displaySucces(
      Globals.contactForm.succesMessage(answers.get('first-name'), answers.get('email')),
      'Nouveau message'
    )
  })
  return contactModal
}

function createViewerModal () {
  const viewer = new Templates.Viewer()
  const viewerModal = new Templates.ModalWrapper('viewer')
  viewerModal.addContent(viewer.element)
  return { modal: viewerModal, viewer, addTo: parent => { viewerModal.addTo(parent) } }
}

function createInsertBox (mediasData, profilePrice) {
  const insertBox = new Templates.InsertBox(Globals.addLikes(mediasData), profilePrice)
  return insertBox
}

async function getData () {
  await Data.Manager.loadData('data/photographers.json') // Chargement des données JSON.
  const id = getId() // Récupère id du photographe.

  // Récupérer et formater les données du photographe.
  const profile = Data.Manager.search('photographers', 'id', id, Data.Format.Profile)[0]

  // Récupérer et formater les données des médias.
  const media = Data.Manager.search('media', 'photographerId', id, Data.Format.Media)

  return { profile, media }
}

function createComponents (data) {
  const components = {
    profileBanner: createProfileBanner(data.profile), // Création de la bannière
    filtreSelector: createFiltreSelector(), // Création filtre
    contactModal: createContactModal(data.profile.name), // Création de la modale pour le formulaire
    viewerModal: createViewerModal(), // Création de la modale pour le viewer
    insertBox: createInsertBox(data.media, data.profile.price) // Afficher encart
  }

  Object.values(components).forEach(element => element.addTo(Globals.DOM.main))
  return components
}

function initEvents (components, mediaCards) {
  // Initialisation des évènements
  components.profileBanner.contactButton.addEventListener('click', () => {
    components.contactModal.show()
  })

  components.filtreSelector.element.addEventListener('filter-option-change', (e) => {
    mediaCards = Globals.filter.sortMediaCards(mediaCards, e.detail.option)
    displayMediaCards(mediaCards)
    components.viewerModal.viewer.setPlaylist(mediaCards)
  })

  document.addEventListener('likeCardClick', () => {
    if (components.filtreSelector.value === 'popularity') {
      mediaCards = Globals.filter.sortMediaCards(mediaCards, Globals.filter.options.popularity.value)
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
  const components = createComponents(await getData())
  const mediaCards = createMediaCards(data.media) // Création des cartes média
  initEvents(components, mediaCards)
  components.filtreSelector.value = 'date'
}

init()
