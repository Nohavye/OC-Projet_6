//Mettre le code JavaScript lié à la page photographer.html
import { dataManager } from '../api/dataManager.js';
import { PhotographerEntity } from '../models/PhotographerEntity.js';
import { PhotographerHeader } from '../templates/PhotographerHeader.js';
import { MediaEntity } from '../models/MediaEntity.js';
import { MediaCard } from '../templates/MediaCard.js';

// Élements du DOM existants
const dElement = {
    browserSection: document.querySelector(".media-browser"),
    textWrapper: document.querySelector(".photographer-info"),
    imageWrapper: document.querySelector(".photographer-photo")
}

async function init() {
    // Récupère id du photographe dans les paramètres de la page
    const params = (new URL(document.location)).searchParams
    const id = parseInt(params.get('id'))

    // Récupère les datas du photographe f(id)
    await dataManager.loadData('data/photographers.json')
    const photographerEntity = new PhotographerEntity(dataManager.search('photographers', 'id', id)[0])

    // Mise à jour de bannière
    const header = new PhotographerHeader(photographerEntity)
    header.update(dElement.textWrapper, dElement.imageWrapper)

    // Récupère les photos (datas)
    const photosData = dataManager.search('media', 'photographerId', id)

    photosData.forEach(data => {
        dElement.browserSection.appendChild(
            new MediaCard(new MediaEntity(data)).create()
        )
    })
}

init()

