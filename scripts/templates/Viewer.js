import { Template } from './Template.js'

export class Viewer {
  constructor () {
    this._mediaEntities = []
    this._currentIndex = null

    this._template = {
      _: document.createElement('div'),
      _attributes: {
        class: 'viewer',
        style: `
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90vw;
          height: 90vh;
        `
      },

      leftButton: {
        _: document.createElement('img'),
        _attributes: {
          class: 'viewer__button',
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
        _: document.createElement('div'),
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
        legend: {
          _: document.createElement('p'),
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

  setPlaylist (mediaCards) {
    mediaCards.forEach(mediaCard => {
      this._mediaEntities.push(mediaCard.entity)
    })
  }

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
        this._template.screen.photo._.style.display = 'block'
        this._template.screen.video._.style.display = 'none'
        break

      case 'video':
        this._template.screen.video._.src = this._mediaEntities[this._currentIndex].file
        this._template.screen.video._.style.display = 'block'
        this._template.screen.photo._.style.display = 'none'
        break
    }
    this._template.screen.legend._.innerHTML = this._mediaEntities[this._currentIndex].title
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

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  get element () {
    return this._template._
  }
}
