class DnD {
  position = {
    top: 'auto',
    left: 'auto'
  }

  shifts = {
    x: 0,
    y: 0
  }

  constructor(element) {
    this.element = element
    this.init()
  }

  init() {
    this.handleMousedown = this.handleMousedown.bind(this)
    this.handleMousemove = this.handleMousemove.bind(this)
    this.handleMousecancel = this.handleMousecancel.bind(this)
    this.handleonMouseover = this.handleonMouseover.bind(this)
    this.handleonMouseout = this.handleonMouseout.bind(this)

    this.element.addEventListener('mousedown', this.handleMousedown)
    this.element.addEventListener('mouseout', this.handleonMouseout)
    this.element.addEventListener('mouseover', this.handleonMouseover)
  }

  handleMousedown({ clientX, clientY }) {
    document.addEventListener('mousemove', this.handleMousemove)
    document.addEventListener('mouseup', this.handleMousecancel)
    this.calcShifts(clientX, clientY)

  }
  handleonMouseover() {
    this.element.style.zIndex = 10
  }
  handleonMouseout() {
    this.element.style.zIndex = 'unset'
  }

  handleMousemove({ clientX, clientY }) {
    this.setPosition(clientX, clientY)
  }

  handleMousecancel() {
    document.removeEventListener('mousemove', this.handleMousemove)
    document.removeEventListener('mouseup', this.handleMousecancel)
  }

  calcShifts(x, y) {
    const { left, top } = this.element.getBoundingClientRect()
    this.shifts.x = x - left
    this.shifts.y = y - top
  }

  setPosition(left, top) {
    this.position.left = left - this.shifts.x
    this.position.top = top - this.shifts.y
    this.element.style.left = this.position.left + 'px'
    this.element.style.top = this.position.top + 'px'
  }
}

export { DnD }
