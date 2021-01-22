import LocomotiveScroll from 'locomotive-scroll'
import DebugGrid from "./debug-grid"
import Router from "./router"
import Darkmode from "./darkmode"
import Transitions from "./transitions"
import Slider from "./slider"
import {throttle} from "./utilities"

class App {
  locomotive = null
  container = document
  is_desktop = true

  mobileInit = _ => {
    console.debug('--- App mobile init')
    this.is_desktop = false
    this.init()
  }

  init = _ => {
    console.debug('--- App init')
    this.startServices()
    new Transitions({
      callback: _ => {
        this.locomotive.destroy()
        this.startServices()
      }
    })

    window.addEventListener('resize', throttle(this.onWindowResize, 300))
  }

  onWindowResize = _ => {
  }

  startServices = _ => {
    this.initScrollonImageLoad()
    const router = new Router()
    if (router.isIndex()) {
    } else if (router.isPost()) {
    }
    if (this.is_desktop) {
    } else {
      new Slider()
    }

    // non critical load
    this.disablePageReloadOnSamePageLink()
    new DebugGrid()
    new Darkmode()
  }

  initScrollonImageLoad = _ => {
    Promise.all([...this.container.querySelectorAll('img')]
      .filter(img => !img.complete)
      .map(img => new Promise(resolve => {
        img.onload = img.onerror = resolve
      }))).then(this.initScroll)
  }

  disablePageReloadOnSamePageLink = _ => this.container.querySelectorAll('a[href]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.currentTarget.href === window.location.href) {
        e.preventDefault()
        e.stopPropagation()
      }
    })
  })

  initScroll = _ => {
    console.debug('New scroll')
    setTimeout(_ => {
      this.locomotive = new LocomotiveScroll({
        el: this.container.querySelector('[data-scroll-container]'),
        smooth: true,
      })
    }, 200)
  }

}

export default App
