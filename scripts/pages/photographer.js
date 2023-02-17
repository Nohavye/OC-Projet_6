import { dElements, contactFormInputs } from '../utils/variables.js';
import { dataManager } from '../api/dataManager.js';
import { PhotographerEntity } from '../models/PhotographerEntity.js';
import { PhotographerHeader } from '../templates/PhotographerHeader.js';
import { OptionSelector } from '../templates/OptionSelector.js';
import { MediaEntity } from '../models/MediaEntity.js';
import { MediaCard } from '../templates/MediaCard.js';
import { InsertBox } from '../templates/InsertBox.js';
import { addLikes, sortMediaCarsByLikes } from '../utils/functions.js';
import { Modal } from '../templates/Modal.js';
import { Form } from '../templates/Form.js';

function getId() {
    const params = (new URL(document.location)).searchParams
    return parseInt(params.get('id'))
}

function displayCards(mediaEntitys) {
    dElements.browserSection.innerHTML = ""
    mediaEntitys.forEach(entity => {
        dElements.browserSection.appendChild(new MediaCard(entity).get)
    })
}

async function init() {
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

    // Création de la modale
    const contactForm = new Form('contact', contactFormInputs)
    const contactModal = new Modal('contact', `Contactez moi<br>${photographerEntity.name}`, true)
    contactModal.addContent(contactForm.get)
    dElements.main.appendChild(contactModal.get)

    contactForm.startListeners()

    contactForm.get.addEventListener('submit-contact', (e) => {
        const answers = e.detail.answers
        for(let entry of answers) { console.log(entry) }
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
    const mediaEntitys = []
    mediasData.forEach(data => {
        mediaEntitys.push(new MediaEntity(data))
    })

    filtreSelector.get.addEventListener('filter-option-change', (e) => {
        console.log(e.detail.option)

        switch(e.detail.option) {
            
            case 'popularity':
                mediaEntitys.sort((a, b) => b.likes - a.likes)
                displayCards(mediaEntitys)
                break

            case 'date':
                mediaEntitys.sort((a, b) => new Date(a.date) - new Date(b.date))
                displayCards(mediaEntitys)
                mediaEntitys.forEach((entity) => {console.log(entity.date)})
                break

            case 'title':
                mediaEntitys.sort((a, b) => a.title.localeCompare(b.title))
                displayCards(mediaEntitys)
                break
        }
    })

    filtreSelector.value = 'date'

    // mediasData.forEach(data => {
    //     dElements.browserSection.appendChild(
    //         new MediaCard(new MediaEntity(data)).get
    //     )
    // })

    // Afficher encart
    const insertBox = new InsertBox(addLikes(mediasData), photographerEntity.price)
    dElements.main.appendChild(insertBox.get)
}

init()

