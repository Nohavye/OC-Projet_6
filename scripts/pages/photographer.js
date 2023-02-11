//Mettre le code JavaScript lié à la page photographer.html
import { dataManager } from '../api/dataManager.js';
import { PhotographerEntity } from '../models/PhotographerEntity.js';
import { PhotographerHeader } from '../templates/PhotographerHeader.js';
import { MediaEntity } from '../models/MediaEntity.js';
import { MediaCard } from '../templates/MediaCard.js';
import { InsertBox } from '../templates/InsertBox.js';
import { addLikes } from '../lib/function.js';

// Élements du DOM existants
const dElement = {
    main: document.querySelector("main"),
    browserSection: document.querySelector(".media-browser")
}

async function init() {
    // Récupère id du photographe dans les paramètres de la page
    const params = (new URL(document.location)).searchParams
    const id = parseInt(params.get('id'))

    // Récupère les datas du photographe f(id)
    await dataManager.loadData('data/photographers.json')
    const photographerEntity = new PhotographerEntity(dataManager.search('photographers', 'id', id)[0])

    // Création de la bannière
    const header = new PhotographerHeader(photographerEntity)
    dElement.main.insertAdjacentElement('afterbegin', header.get())

    // Récupère les médias (datas)
    const photosData = dataManager.search('media', 'photographerId', id)

    // Afficher les médias
    photosData.forEach(data => {
        dElement.browserSection.appendChild(
            new MediaCard(new MediaEntity(data)).get()
        )
    })

    // Afficher encart
    const insertBox = new InsertBox(addLikes(photosData), photographerEntity.price)
    dElement.main.appendChild(insertBox.get())
}

init()

