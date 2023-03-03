import { InputText, InputTextArea } from '../templates/FormElement.js'

export const dElements = {
  photographersSection: document.querySelector('.photographer_section'),
  main: document.querySelector('main'),
  browserSection: document.querySelector('.media-browser')
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
