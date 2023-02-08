import { dataApi } from '../api/dataApi.js';
import { PhotographerData } from '../models/PhotographerData.js';
import { PhotographerCard } from '../templates/PhotographerCard.js';

// Élements du DOM existants
const dElements = {
    photographersSection: document.querySelector(".photographer_section")
}

async function init() {
    // Récupère les datas des photographes
    await dataApi.initData('data/photographers.json')
    const photographersData = dataApi.getData('photographers')
    
    // Affiche les cartes de photographes
    photographersData.forEach(data => {
        dElements.photographersSection.appendChild(
            new PhotographerCard(new PhotographerData(data))
                .create()
        )
    })
};

init();
    
