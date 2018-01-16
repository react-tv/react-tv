import Navigation from './navigation'

class Spatial {
  constructor() {
    this.focusPaths = []
    this.focused = null
    this.setState = null
    this.initialized = false

    this.handleFocused = this.handleFocused.bind(this)
    document.addEventListener('sn:focused', this.handleFocused)
  }

  init(updateState) {
    if (!this.setState) {
      this.setState = updateState
    }

    Navigation.init()
    Navigation.focus()
  }

  destroy() {
    this.setState = null
    Navigation.uninit()
    document.removeEventListener('sn:focused', this.handleFocused)
  }

  handleFocused(ev) {
    if (this.focused !== ev.detail.sectionId) {
      this.setState(ev.detail.sectionId)
      Navigation.focus(ev.detail.sectionId)
    }
  }

  getCurrentFocusedPath() {
    return this.focused
  }

  setCurrentFocusedPath(focusPath) {
    this.focused = focusPath
    Navigation.focus(focusPath)
  }

  addFocusable(focusPath) {
    this.removeFocusable(focusPath)

    Navigation.add(focusPath, { selector: `#${focusPath}` })
    Navigation.makeFocusable(focusPath)
    this.focusPaths.push(focusPath)
  }

  removeFocusable(focusPath) {
    const index = this.focusPaths.indexOf(focusPath)
    if (index >= 0) {
      this.focusPaths = this.focusPaths.splice(index, 1)
    }
    Navigation.remove(focusPath)
  }
}

export default Spatial
