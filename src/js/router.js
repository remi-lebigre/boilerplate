class Router {
  INDEX_MATCHERS = ['index.html', '']
  POST_MATCHER = 'articles'

  constructor () {
    this.location = window.location
  }

  isIndex = _ => this.INDEX_MATCHERS.some(m => m === this.path())
  isPost = _ => this.path().includes(this.POST_MATCHER)
  path = _ => this.location.pathname.substring(1)
}

export default Router
