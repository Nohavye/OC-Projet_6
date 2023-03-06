import { FormElement as Form, InputText, InputTextArea } from './FormElement.js'
import InsertBox from './InsertBox.js'
import MediaCard from './MediaCard.js'
import ModalWrapper from './ModalWrapper.js'
import OptionSelector from './OptionSelector.js'
import ProfileBanner from './PhotographerHeader.js'
import ProfileCard from './PhotographerCard.js'
import Viewer from './Viewer.js'

const Templates = {
  Form,
  InsertBox,
  MediaCard,
  ModalWrapper,
  OptionSelector,
  ProfileBanner,
  ProfileCard,
  Viewer
}

const TemplatesforIndexPage = {
  ProfileCard
}

const TemplatesforProfilePage = {
  Form,
  InsertBox,
  MediaCard,
  ModalWrapper,
  OptionSelector,
  ProfileBanner,
  Viewer
}

export { Templates as default }
export { TemplatesforIndexPage, TemplatesforProfilePage }
export { Form, InputText, InputTextArea, InsertBox, MediaCard, ModalWrapper, OptionSelector, ProfileBanner, ProfileCard, Viewer }
