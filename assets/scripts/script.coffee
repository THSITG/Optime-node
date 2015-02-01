window.addEventListener "polymer-ready", (e) ->
  console.log "loaded"
  $("#navbar")[0].pageTitle = "Optime"

  meta = document.createElement 'core-meta'
  meta.type='transition'
  transition = meta.byId "optime-card-fade"
  animated = $("#hint-wip")[0]
  transition.setup animated
