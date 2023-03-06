import Template from './Template.js'

class MediaCard {
  constructor (entity) {
    this._likes = entity.likes
    this._entity = entity

    this._template = {
      _: document.createElement('div'),
      _attributes: { class: 'mediaCard' },

      thumbnail: {
        _: document.createElement('div'),
        _attributes: { style: 'cursor: pointer;' },
        _events: {
          click: () => {
            document.dispatchEvent(new CustomEvent('mediaCardClick', {
              detail: { mediaId: entity.id }
            }))
          }
        }
      },

      legend: {
        _: document.createElement('div'),
        _attributes: { class: 'legend' },

        title: {
          _: document.createElement('p'),
          _textContent: `${entity.title}`,
          _attributes: { class: 'title' }
        },

        likes: {
          _: document.createElement('p'),
          _textContent: `${this._likes} \u2661`,
          _attributes: {
            class: 'likes',
            style: 'cursor: pointer;'
          },
          _events: {
            click: () => {
              let addedValue = null

              if (this._likes === entity.likes) {
                addedValue = 1
                this._likes += addedValue
                this._template.legend.likes._.innerHTML = `${this._likes} \u2665`
              } else {
                addedValue = -1
                this._likes += addedValue
                this._template.legend.likes._.innerHTML = `${this._likes} \u2661`
              }

              document.dispatchEvent(new CustomEvent('likeCardClick', {
                detail: { addedValue }
              }))
            }
          }
        }
      }
    }

    Template.build(this._template)

    switch (entity.fileType) {
      case 'image':
        this._template.thumbnail._.innerHTML = `
          <img src="${entity.file}">
        `
        break

      case 'video':
        this._template.thumbnail._.innerHTML = `
          <video autoplay mute loop>
              <source src="${entity.file}" type="video/mp4">
          </video>
        `
        break
    }
  }

  addTo (parent) {
    parent.appendChild(this._template._)
  }

  get likes () {
    return this._likes
  }

  get entity () {
    return this._entity
  }

  get element () {
    return this._template._
  }
}

export { MediaCard as default }
