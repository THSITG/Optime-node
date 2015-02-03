window.addEventListener "polymer-ready", (e) ->
  console.log "loaded"
  $("#navbar")[0].pageTitle = "Optime"

  meta = document.createElement 'core-meta'
  meta.type='transition'
  transition = meta.byId "optime-card-fade"
  targets = $ "[optime-animation]"
  targets.each( (i) ->
    meta = document.createElement 'core-meta'
    meta.type='transition'
    transition = meta.byId(this.getAttribute("optime-animation"))
    this.transitionMethod = transition
    transition.setup(this)
  )

  loads = $ "[optime-auto-load]"
  it = 0
  loader = () ->
    loads[it].show()
    it += 1
    window.setTimeout loader,100 if it < loads.length
  loader()
