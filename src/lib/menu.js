import get from 'lodash/get'

import { globalModalManager } from '@obsidians/global'

const handlers = {}
if (window.require) {
  const { ipcRenderer } = window.require('electron')

  handlers.about = () => globalModalManager.openAboutModal()

  ipcRenderer.on('menu-click', (event, action) => {
    const handler = get(handlers, action)
    if (handler) {
      handler()
    } else {
      console.warn(new Error(`No handler for menu click: ${action}`))
    }
  })
}


export default handlers
