// Import des modules nécessaires.
import { InputText, InputTextArea } from '../templates/TemplatesModule.js'
import Template from '../templates/Template.js'

// Créer une section dans la balise <main> avec les attributs spécifiés.
function createSection (attributes) {
  const section = {
    _: document.createElement('section'),
    _attributes: attributes
  }
  Template.build(section)
  DOM.main.appendChild(section._)
  return section._
}

// Elements du DOM nécessaires au scripts de page.
const DOM = {

  body: document.querySelector('body'),
  main: document.querySelector('main'),

  get profilesSection () {
    if (document.querySelector('.profiles-section')) {
      return document.querySelector('.profiles-section')
    } else {
      return createSection({
        class: 'profiles-section',
        'aria-label': 'Photographes',
        role: 'list'
      })
    }
  },

  get browserSection () {
    if (document.querySelector('.browser-section')) {
      return document.querySelector('.browser-section')
    } else {
      return createSection({
        class: 'browser-section',
        'aria-label': 'Médias',
        role: 'list'
      })
    }
  }
}

// Constantes nécessaires au filtre.
const filter = {

  // Options pour le sélecteur.
  options: {
    popularity: { name: 'Popularité', value: 'popularity' },
    date: { name: 'Date', value: 'date' },
    title: { name: 'Titre', value: 'title' }
  },

  // Fonction pour le tri des cartes.
  sortMediaCards: (mediaCards, option) => {
    switch (option) {
      case filter.options.popularity.value:
        mediaCards.sort((a, b) => b.likes - a.likes)
        break

      case filter.options.date.value:
        mediaCards.sort((a, b) => new Date(a.entity.date) - new Date(b.entity.date))
        break

      case filter.options.title.value:
        mediaCards.sort((a, b) => a.entity.title.localeCompare(b.entity.title))
        break
    }
    return mediaCards
  }
}

// Constantes nécessaires au formulaire.
const contactForm = {

  // Implémentation des entrées du formulaire.
  inputs: {

    firstName: new InputText(
      'first-name',
      'Prénom',
      /^[A-Za-zéèêëôöûüùàáâäç-]{2,}$/,
      'Veuillez saisir votre prénom. (2 charactères minimum)'
    ),

    lastName: new InputText(
      'last-name',
      'Nom',
      /^[A-Za-zéèêëôöûüùàáâäç-]{2,}$/,
      'Veuillez saisir votre nom. (2 charactères minimum)'
    ),

    eMail: new InputText(
      'email',
      'Email',
      /^(?=.{1,64}@)[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/,
      'Veuillez saisir une adresse mail valide.'
    ),

    message: new InputTextArea(
      'message',
      'Votre message',
      30,
      'Ecrivez votre message ici. (30 charactères minimum)'
    )
  },

  // Message de succès après validation du formulaire.
  succesMessage: (firstName, email) => {
    return `
      Merci ${firstName} pour votre message, il a bien été transmis.
      Notre artiste vous répondra dans les meilleurs délais à l'adresse suivante:
      ${email}
    `
  }
}

// Fonction pour le total des mention 'j'aime'.
function addLikes (mediaEntityList) {
  let sumOfLikes = 0
  for (const entity of mediaEntityList) {
    sumOfLikes += entity.likes
  }
  return sumOfLikes
}

export { DOM, filter, contactForm, addLikes }
