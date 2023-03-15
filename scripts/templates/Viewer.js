import Template from './Template.js'

/**
 * Cette classe représente un viewer de médias qui permet d'afficher une liste
 * de médias sous forme d'une diapositive. Les médias peuvent être des images ou des vidéos.
 */
class Viewer {
  constructor () {
    this._mediaEntities = []
    this._currentIndex = null

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: 'viewer',
        style: `
          outline: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90vw;
          height: 90vh;
        `,
        tabindex: '0'
      },
      _events: {
        keydown: (e) => {
          switch (e.key) {
            case 'ArrowRight':
              this.#next()
              break
            case 'ArrowLeft':
              this.#last()
              break
            case 'Escape':
              this.#sendCloseEvent()
              break
          }
        }
      },

      accessibilityMessage: {
        _: document.createElement('div'),
        _attributes: {
          'aria-live': 'assertive',
          style: `
            color: transparent;
            position: absolute;
            top: 0; left: 0;
          `
        }
      },

      leftButton: {
        _: document.createElement('img'),
        _attributes: {
          class: 'viewer__button',
          role: 'button',
          title: 'Revenir au média précédent',
          alt: 'Revenir au média précédent',
          src: 'assets/icons/arrow_left_colortheme.svg',
          style: `
            cursor: pointer;
          `
        },
        _events: {
          click: () => {
            this.#last()
          }
        }
      },

      screen: {
        _: document.createElement('figure'),
        _attributes: {
          class: 'viewer__screen'
        },

        photo: {
          _: document.createElement('img'),
          _attributes: {
            class: 'viewer__screen__media',
            style: `
              display: none;
              border-radius: 10px;
              height: 45vw;
            `
          }
        },

        video: {
          _: document.createElement('video'),
          _attributes: {
            class: 'viewer__screen__media',
            controls: 'true',
            style: `
              display: none;
              border-radius: 10px;
              height: 45vw;
            `
          }
        },

        caption: {
          _: document.createElement('figcaption'),
          _attributes: {
            class: 'viewer__screen__legend',
            style: `
              color: #901c1c;
              font-weight: 400;
              font-size: 24px;
            `
          }
        }
      },

      rightButton: {
        _: document.createElement('img'),
        _attributes: {
          class: 'viewer__button',
          role: 'button',
          title: 'Passer au média suivant',
          alt: 'Passer au média suivant',
          src: 'assets/icons/arrow_right_colortheme.svg',
          style: `
            cursor: pointer;
          `
        },
        _events: {
          click: () => {
            this.#next()
          }
        }
      }
    }
    Template.build(this._template)
  }

  #describeMedia () {
    switch (this._mediaEntities[this._currentIndex].fileType) {
      case 'image':
        return `photo nommée '${this._mediaEntities[this._currentIndex].title}'`

      case 'video':
        return `vidéo nommée '${this._mediaEntities[this._currentIndex].title}'`
    }
  }

  /**
   * Définit la liste de lecture pour le visualiseur.
   * @param {Array} mediaCards - Un tableau d'objets de carte de média.
   */
  setPlaylist (mediaCards) {
    mediaCards.forEach(mediaCard => {
      this._mediaEntities.push(mediaCard.entity)
    })
  }

  /**
   * Met à jour l'affichage de l'écran avec le fichier multimédia correspondant à l'ID de média spécifié.
   * @param {number} mediaId - L'identifiant de l'entité multimédia à afficher.
   */
  setScreen (mediaId) {
    if (typeof (mediaId) !== 'undefined') {
      for (let i = 0; i < this._mediaEntities.length; i++) {
        if (this._mediaEntities[i].id === mediaId) {
          this._currentIndex = i
        }
      }
    }

    switch (this._mediaEntities[this._currentIndex].fileType) {
      case 'image':
        this._template.screen.photo._.src = this._mediaEntities[this._currentIndex].file
        this._template.screen.photo._.setAttribute('title', this.#describeMedia())
        this._template.screen.photo._.setAttribute('alt', this.#describeMedia())

        this._template.screen.photo._.style.display = 'block'
        this._template.screen.video._.style.display = 'none'
        break

      case 'video':
        this._template.screen.video._.src = this._mediaEntities[this._currentIndex].file
        this._template.screen.photo._.setAttribute('title', this.#describeMedia())
        this._template.screen.photo._.setAttribute('aria-label', this.#describeMedia())

        this._template.screen.video._.style.display = 'block'
        this._template.screen.photo._.style.display = 'none'
        break
    }

    this._template.screen.caption._.innerHTML = this._mediaEntities[this._currentIndex].title
    window.setTimeout(() => {
      this._template.accessibilityMessage._.innerHTML = this.#describeMedia()
    }, 10)
  }

  #next () {
    if (this._currentIndex < this._mediaEntities.length - 1) {
      this._currentIndex += 1
    } else {
      this._currentIndex = 0
    }
    this.setScreen()
  }

  #last () {
    if (this._currentIndex !== 0) {
      this._currentIndex -= 1
    } else {
      this._currentIndex = this._mediaEntities.length - 1
    }
    this.setScreen()
  }

  #sendCloseEvent () {
    this._template._.dispatchEvent(new Event('closeEvent'))
  }

  /**
   * Ajoute le viewer à un élément parent spécifié.
   * @param {HTMLElement} parent - L'élément HTML dans lequel ajouter le viewer.
   */
  addTo (parent) {
    parent.appendChild(this._template._)
  }

  /**
   * Retourne l'élément HTML principal du viewer.
   * @returns {HTMLElement} - L'élément HTML principal du viewer.
   */
  get element () {
    return this._template._
  }
}

export { Viewer as default }
