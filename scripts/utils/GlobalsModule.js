import { DOM, filter, contactForm, addLikes } from './Globals.js'

const Globals = {
  addLikes,
  contactForm,
  DOM,
  filter
}

const GlobalsforIndexPage = {
  DOM
}

const GlobalsforProfilePage = {
  addLikes,
  contactForm,
  DOM,
  filter
}

export { Globals as default }
export { GlobalsforIndexPage, GlobalsforProfilePage }
export { addLikes, contactForm, DOM, filter }
