import { InputText, InputTextArea } from '../templates/Form.js'

export const dElements = {
    photographersSection: document.querySelector(".photographer_section"),
    main: document.querySelector("main"),
    browserSection: document.querySelector(".media-browser")
}

export const contactFormInputs = {
    firstName:  new InputText('Prénom', 'first-name', true,
                "^[A-Za-zéèêëôöûüùàáâäç\-]{2,}$",
                'Veuillez saisir votre prénom. (2 charactères minimum)'),

    lastName:   new InputText('Nom', 'last-name', true,
                "^[A-Za-zéèêëôöûüùàáâäç\-]{2,}$",
                'Veuillez saisir votre nom. (2 charactères minimum)'),

    eMail:      new InputText('Email', 'email', true,
                "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
                'Veuillez saisir une adresse mail valide.'),
            
    message:    new InputTextArea('Votre message', 'message', true, 30,
                'Ecrivez votre message ici. (30 charactères minimum)')
}