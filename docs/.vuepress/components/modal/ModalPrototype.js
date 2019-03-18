import ModalComponent from './index'
import Vue from 'vue'

const Modal = Vue.extend(ModalComponent)
const modal = new Modal()
const modalEl = modal.$mount()
modalEl.open = (options) => {
  for (let key in options) {
    if (key in modalEl) {
      modalEl[key] = options[key]
    }
  }
  modalEl.isShow = true
}
document.body.append(modalEl.$el)

export default modalEl