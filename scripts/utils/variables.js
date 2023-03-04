import { InputText, InputTextArea } from '../templates/FormElement.js'

export const dElements = {
  photographersSection: document.querySelector('.photographer_section'),
  main: document.querySelector('main'),
  get browserSection () {
    if (document.querySelector('.media-browser')) {
      return document.querySelector('.media-browser')
    } else {
      const element = document.createElement('div')
      element.classList.add('media-browser')
      dElements.main.appendChild(element)
      return element
    }
  }
}

export const filtreOptions = {
  popularity: { name: 'Popularité', value: 'popularity' },
  date: { name: 'Date', value: 'date' },
  title: { name: 'Titre', value: 'title' }
}

export const contactFormInputs = {
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
}
