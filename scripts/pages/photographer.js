//Mettre le code JavaScript lié à la page photographer.html
import { dataApi } from '../api/dataApi.js';
import { PhotographerData } from '../models/PhotographerData.js';
import { PhotographerHeader } from '../templates/PhotographerHeader.js';

async function init() {
    // Récupère id du photographe dans les paramètres de la page
    const params = (new URL(document.location)).searchParams
    const id = parseInt(params.get('id'))
    console.log(id)

    // Récupère les datas du photographe f(id)
    await dataApi.initData('data/photographers.json')
    const photographerData = new PhotographerData(dataApi.search('photographers', 'id', id))
    console.log(photographerData)

    // Mise à jour de bannière
    const header = new PhotographerHeader(photographerData)
    header.update()
}

init()

