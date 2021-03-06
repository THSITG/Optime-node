importList = [
  '/bower/core-elements/core-elements.html',
  '/bower/paper-elements/paper-elements.html',
  '/bower/paper-input/paper-autogrow-textarea.html',
  '/bower/core-icons/core-icons.html',
  '/bower/core-meta/core-meta.html',
  '/elements/frame.html',
  '/elements/card.html',
  '/elements/animation.html',
]


setupPage = () ->
  console.log("Finished loading resources")
  document.getElementById("frame").pageTitle = "Optime"

  # Setup templates
  $(".optime-tmpl").each( (it) ->
    $.templates this.id,"#"+this.id
  )

  # Setup styles
  CoreStyle.g.paperInput.focusedColor = "#0f9d58" # From toggle button

  # Set cards' animation methods
  meta = document.createElement 'core-meta'
  meta.type='transition'
  targets = $ "[optime-animation]"
  targets.each( (i) ->
    meta = document.createElement 'core-meta'
    meta.type='transition'
    transition = meta.byId(this.getAttribute("optime-animation"))
    this.transitionMethod = transition
    transition.setup(this)
  )

  # Finished Load
  console.log("Page loaded")
  $("body").addClass("optime-loaded")
  window.setTimeout( ()->
    $("#loading-overlap").remove()
    console.log("Ready to use")
  ,500)

  # Auto-loads cards
  loads = $ "[optime-auto-load]"
  it = 0
  loader = () ->
    loads[it].show()
    it += 1
    window.setTimeout loader,100 if it < loads.length
  loader()


window.addEventListener "polymer-ready", (e) ->
  console.log("Loading resources")
  $("body").addClass("optime-loading")
  Polymer.import(importList,setupPage)

