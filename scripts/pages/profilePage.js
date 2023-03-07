// Import des modules nécessaires.
import Data from '../data/DataModule.js'
import { GlobalsforProfilePage as Globals } from '../utils/GlobalsModule.js'
import { TemplatesforProfilePage as Templates } from '../templates/TemplatesModule.js'

// Récupère l'ID du photographe dans les paramètres de l'URL.
function getId () {
  const params = (new URL(document.location)).searchParams
  return parseInt(params.get('id'))
}

// Crée les cartes de média à partir des entités de données.
function createMediaCards (mediaEntities) {
  const mediaCards = []
  mediaEntities.forEach(entity => {
    mediaCards.push(new Templates.MediaCard(entity))
  })
  return mediaCards
}

// Affiche les cartes de média dans la section de navigation.
function displayMediaCards (mediaCards) {
  Globals.DOM.browserSection.innerHTML = ''
  mediaCards.forEach(mediaCard => {
    mediaCard.addTo(Globals.DOM.browserSection)
  })
}

// Crée une modale pour le formulaire de contact.
function createContactModal (profileName) {
  const contactForm = new Templates.Form('contact', Globals.contactForm.inputs)

  const contactModal = new Templates.ModalWrapper('contact', `Contactez moi<br>${profileName}`)
  contactModal.setCloseButtonImage('assets/icons/close.svg')
  contactModal.addContent(contactForm.element)

  // Ajoute un événement pour afficher un message de succès lorsque le formulaire est soumis.
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

// Crée une modale pour le viewer.
function createViewerModal () {
  const viewer = new Templates.Viewer()
  const viewerModal = new Templates.ModalWrapper('viewer')
  viewerModal.addContent(viewer.element)
  return { modal: viewerModal, viewer, addTo: parent => { viewerModal.addTo(parent) } }
}

// Charge les données JSON pour le photographe spécifié dans l'URL et formate les données.
async function getData () {
  // Charge les datas depuis le fichier JSON.
  await Data.Manager.loadData('data/photographers.json')

  // Récupère id du photographe.
  const id = getId()

  // Récupérer et formater les données du photographe.
  const profile = Data.Manager.search('photographers', 'id', id, Data.Format.Profile)[0]

  // Récupérer et formater les données des médias.
  const media = Data.Manager.search('media', 'photographerId', id, Data.Format.Media)

  return { profile, media }
}

// Crée les différents composants de la page.
function createComponents (data) {
  const components = {
    profileBanner: new Templates.ProfileBanner(data.profile), // Création de la bannière.
    filtreSelector: new Templates.OptionSelector('filter', 'Trier par', Globals.filter.options), // Création filtre.
    contactModal: createContactModal(data.profile.name), // Création de la modale pour le formulaire.
    viewerModal: createViewerModal(), // Création de la modale pour le viewer.
    insertBox: new Templates.InsertBox(Globals.addLikes(data.media), data.profile.price) // Création de l'encart.
  }

  // Ajoute chaque élément à la section principale de la page.
  Object.values(components).forEach(element => element.addTo(Globals.DOM.main))
  return components
}

// Initialisation des évènements.
function initEvents (components, mediaCards) {
  // Ajout d'un événement au clic sur le bouton de contact du photographe.
  components.profileBanner.contactButton.addEventListener('click', () => {
    // Affichage de la modale de contact.
    components.contactModal.show()
  })

  components.filtreSelector.element.addEventListener('filter-option-change', (e) => {
    // Tri des cartes média en fonction de l'option sélectionnée dans le filtre.
    mediaCards = Globals.filter.sortMediaCards(mediaCards, e.detail.option)

    // Affichage des cartes triées.
    displayMediaCards(mediaCards)

    // Définition des cartes triées comme la playlist du viewer.
    components.viewerModal.viewer.setPlaylist(mediaCards)
  })

  // Ajout d'un événement au clic sur le bouton de like sur une carte média.
  document.addEventListener('likeCardClick', () => {
    // Si l'option de tri actuelle est la popularité on tri les carte de média.
    if (components.filtreSelector.value === 'popularity') {
      mediaCards = Globals.filter.sortMediaCards(mediaCards, Globals.filter.options.popularity.value)
      displayMediaCards(mediaCards)
      components.viewerModal.viewer.setPlaylist(mediaCards)
    }
  })

  // Ajout d'un événement au clic sur une carte média.
  document.addEventListener('mediaCardClick', (e) => {
    // Définition de l'écran du viewer comme étant la carte média cliquée.
    components.viewerModal.viewer.setScreen(e.detail.mediaId)

    // Affichage du viewer en mode modal.
    components.viewerModal.modal.show()
  })
}

async function init () {
  const data = await getData() // Charge les données JSON.
  const components = createComponents(await getData()) // Crée les composants de la page.
  const mediaCards = createMediaCards(data.media) // Création des cartes média.
  initEvents(components, mediaCards) // Initialise les événements pour les différents composants.
  components.filtreSelector.value = 'date' // Initialise le filtre de tri par date.
}

init()
