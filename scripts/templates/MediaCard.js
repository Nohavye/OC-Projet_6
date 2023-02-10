/** Création d'une carte de média */
export class MediaCard {

    /**
     * Créer une carte de média
     * @param {MediaEntity} mediaEntity 
     */
    constructor(mediaEntity) {
        this._data = mediaEntity
    }

    create() {
        const card = document.createElement('div')
        card.classList.add('mediaCard')

        switch(this._data.fileType) {

            case 'image':
                card.insertAdjacentHTML('beforeend', `
                    <img src="${this._data.file}">
                `)
                break

            case 'video':
                card.insertAdjacentHTML('beforeend', `
                    <video controls>
                        <source src="${this._data.file}" type="video/mp4">
                    </video>
                `)
                break
        }

        card.insertAdjacentHTML('beforeend', `
            
            <div class="legend">
                <p class="title">${this._data.title}</p>
                <p class="likes">${this._data.likes} \u2665</p>
            </div>
        `)

        return card
    }
}