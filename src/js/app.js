import '../scss/app.scss'

import { $ } from './helpers'
import { Sticker } from './list'

let data = []
const stickerElement = $('#stiki')
new Sticker(data, stickerElement)
