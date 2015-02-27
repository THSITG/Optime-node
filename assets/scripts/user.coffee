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
    
    
    
 
