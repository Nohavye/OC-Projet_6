import { InputText, InputTextArea } from '../templates/TemplatesModule.js'
import Template from '../templates/Template.js'

function createSection (attributes) {
  const section = {
    _: document.createElement('section'),
    _attributes: attributes
  }
  Template.build(section)
  DOM.main.appendChild(section._)
  return section._
}

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

const filter = {

  options: {
    popularity: { name: 'Popularité', value: 'popularity' },
    date: { name: 'Date', value: 'date' },
    title: { name: 'Titre', value: 'title' }
  },

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

const contactForm = {

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

  succesMessage: (firstName, email) => {
    return `
      Merci ${firstName} pour votre message, il a bien été transmis.
      Notre artiste vous répondra dans les meilleurs délais à l'adresse suivante:
      ${email}
    `
  }
}

function addLikes (mediaEntityList) {
  let sumOfLikes = 0
  for (const entity of mediaEntityList) {
    sumOfLikes += entity.likes
  }
  return sumOfLikes
}

export { DOM, filter, contactForm, addLikes }
