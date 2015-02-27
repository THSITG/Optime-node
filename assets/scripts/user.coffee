window.getUser = (credential,callback) ->
  $.post "/login",credential,(data) ->
    callback(data)

window.getBoard = (uname,bid,callback) ->
  $.get "/users/"+uname+"/boards/"+bid, (data) ->
    callback data

window.getBoards = (user,callback) ->
  boards = []
  tasks = []
  tot = 0
  user.boards.forEach (e) ->
    tot+=1
    tasks.push (cb) ->
      getBoard user.name,e.id, (data) ->
        cb data
  tasks.forEach (e) ->
    e (data) ->
      boards.push(data)
      tot-=1
      callback boards if tot == 0

window.getTask = (uname,bid,tid,callback) ->
  $.get "/users/"+uname+"/boards/"+bid+"/tasks/"+tid, (data) ->
    callback data

window.newTask = (uname,pdata,callback) ->
  $.post "/users/"+uname+"/boards/"+pdata.bid+"/tasks", {
    name: pdata.title,
    description: pdata.desc,
    importance: pdata.impt
  }, (data) ->
    callback data
