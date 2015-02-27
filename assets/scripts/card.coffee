window.buildTaskCard = (task) ->
  card = document.createElement "optime-card"
  cont=$.render['tmpl-task'] {
    title: task.name,
    paras: task.description.split '\n'
  }
  card.innerHTML=cont
  cont.dismissAction = () ->
    #TODO: remove function
    this.hide()

  card.dismissable=true
  card.acceptable=false

  card.setAttribute "wide",""

  meta = document.createElement 'core-meta'
  meta.type='transition'
  meta.byId("optime-card-fade").setup card

  return card
