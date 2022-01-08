import { DnD } from './dnd';
import { $ } from './helpers'
import { nanoid } from 'nanoid'

class Sticker {
  isEdit = false
  currentEdited = {}

  constructor(data, stickerElement) {
    this.stickElement = null
    this.stickerElement = stickerElement
    this.data = data
    this.init()
  }
  init() {
    this.handleClickRemoveButton = this.handleClickRemoveButton.bind(this)
    this.handleFormEditSave = this.handleFormEditSave.bind(this)
    this.handleClickCancelEditButton = this.handleClickCancelEditButton.bind(this)
    this.handleDblClick = this.handleDblClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    $('#stickerCreate').addEventListener('click', this.handleSubmit)
  }

  handleSubmit() {
    const sticker = {}

    if (!sticker.id) sticker.id = nanoid()
    if (!sticker.content) sticker.content = 'Привет'
    if (!sticker.position) {
      sticker.position = {
        top: 'auto',
        left: 'auto'
      }
    }
    this.data.push(sticker)
    this.renderStick(sticker)
  }

  handleClickRemoveButton({ target, currentTarget }) {
    const { role, id } = target.dataset

    if (role == 'remove') {
      // const removeStick=$(`#${id}`)
      // removeStick.remove()
      currentTarget.remove()

    }
    this.isEdit = false
  }

  handleClickCancelEditButton({ target, currentTarget }) {
    const { role } = target.dataset

    if (role == 'cancelEdit') {
      currentTarget.classList.remove('stick__edit')
    }
    this.isEdit = false
  }

  handleFormEditSave({ target, currentTarget }) {
    const { role, id } = target.dataset

    if (role == 'saveEdit') {
      this.data.forEach((item) => {
        if (item.id == id) {
          const textareaElement = currentTarget.querySelector('[name="content"]')
          item.content = textareaElement.value
          const text = currentTarget.querySelector("text")
          text.innerText = textareaElement.value
        }
      })
      currentTarget.classList.remove('stick__edit')
    }
    this.isEdit = false
  }

  createTemplate({ id, content }) {

    const template = `
      <div class="d-flex justify-content-end">
         <button type="button" data-role="remove" data-id="${id}" class="btn btn-sm btn-outline-danger ms-3">
           <svg class="pe-none" width="16" height="16"><use href="#trash"/></svg>
         </button>
      </div>
      <div class="stick__content">
          <text>${content}</text>
      </div>
      <form class="stick__form">
         <textarea name="content">${content}</textarea>
         <div class="d-flex justify-content-end ms-3">
           <button type="button" data-role="saveEdit" data-id="${id}" class="btn btn-sm btn-outline-secondary">
              <svg class="pe-none" width="16" height="16"><use href="#save"/></svg>
            </button>
            <button type="button" data-role="cancelEdit" data-id="${id}" class="btn btn-sm btn-outline-secondary">
              <svg class="pe-none" width="16" height="16"><use href="#cancel"/></svg>
            </button>
         </div>
      </form>
    `
    return template
  }

  createStickElement() {
    let result = ''
    this.data.forEach((sticker) => {
      result = this.createTemplate(sticker)
    })
    return result
  }

  handleDblClick({ currentTarget }) {
    currentTarget.classList.add('stick__edit')
    currentTarget.style.zIndex = 100
    if (this.isEdit == true) {
      alert('Уже редактируется')
      return
    }
    this.isEdit = true
  }

  renderStick(sticker) {
    this.stickElement = document.createElement('div')
    this.stickElement.classList.add('stick')
    this.stickElement.id = `${sticker.id}`
    this.stickElement.style.backgroundColor = getColor()

    function getColor() {
      const colors = ['#DAF7A6', '#A3E4D7', '#AED6F1', '#D7BDE2', '#F498AD', '#F9E79F', '#D4E6F1', '#F5CBA7', '#F8C471', '#A3E4D7', '#FCF3CF', '#E8DAEF', '#FADBD8', '#FFD829', '#58D68D']
      return colors[Math.floor(Math.random() * colors.length)]
    }

    new DnD(this.stickElement)
    this.stickElement.addEventListener('dblclick', this.handleDblClick)
    this.stickElement.addEventListener('click', this.handleClickRemoveButton)
    this.stickElement.addEventListener('click', this.handleFormEditSave)
    this.stickElement.addEventListener('click', this.handleClickCancelEditButton)

    this.stickElement.innerHTML = this.createStickElement()
    this.stickerElement.append(this.stickElement)
    this.isEdit = false
  }

}
export { Sticker }
