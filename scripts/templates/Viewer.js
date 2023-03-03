import { _Template } from './_Template.js'

export class Viewer extends _Template {
  #_mediaEntities
  #_currentIndex

  constructor () {
    super(); this._create(this.#_viewer)
  }

  #next () {
    if (this.#_currentIndex < this.#_mediaEntities.length - 1) {
      this.#_currentIndex += 1
    } else {
      this.#_currentIndex = 0
    }
    this.setScreen()
  }

  #last () {
    if (this.#_currentIndex !== 0) {
      this.#_currentIndex -= 1
    } else {
      this.#_currentIndex = this.#_mediaEntities.length - 1
    }
    this.setScreen()
  }

  setScreen (mediaId) {
    if (typeof (mediaId) !== 'undefined') {
      for (let i = 0; i < this.#_mediaEntities.length; i++) {
        if (this.#_mediaEntities[i].id === mediaId) {
          this.#_currentIndex = i
        }
      }
    }

    switch (this.#_mediaEntities[this.#_currentIndex].fileType) {
      case 'image':
        this.#_viewer.screen.photo._element.src = this.#_mediaEntities[this.#_currentIndex].file
        this.#_viewer.screen.photo._element.style.display = 'block'
        this.#_viewer.screen.video._element.style.display = 'none'
        break

      case 'video':
        this.#_viewer.screen.video._element.src = this.#_mediaEntities[this.#_currentIndex].file
        this.#_viewer.screen.video._element.style.display = 'block'
        this.#_viewer.screen.photo._element.style.display = 'none'
        break
    }
    this.#_viewer.screen.legend._element.innerHTML = this.#_mediaEntities[this.#_currentIndex].title
  }

  setPlaylist (mediaEntities) {
    this.#_mediaEntities = mediaEntities
  }

  get get () {
    return this.#_viewer._element
  }

  #_viewer = {
    _element: document.createElement('div'),
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
      _element: document.createElement('img'),
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
      _element: document.createElement('div'),
      _attributes: {
        class: 'viewer__screen'
      },
      photo: {
        _element: document.createElement('img'),
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
        _element: document.createElement('video'),
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
        _element: document.createElement('p'),
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
      _element: document.createElement('img'),
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
}
