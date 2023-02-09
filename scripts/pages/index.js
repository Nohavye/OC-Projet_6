import { dataApi } from '../api/dataApi.js';
import { PhotographerData } from '../models/PhotographerData.js';
import { PhotographerCard } from '../templates/PhotographerCard.js';

async function init() {
    // Récupère les datas des photographes
    await dataApi.initData('data/photographers.json')
    const photographersData = dataApi.getData('photographers')
    
    // Affiche les cartes de photographes
    photographersData.forEach(data => {
        new PhotographerCard(new PhotographerData(data)).create()
    })
};

init()
    
