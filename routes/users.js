var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var Board = require('../schemas/board');
var Task = require('../schemas/task');

function generateBoardID() {
  return 1;
}

function generateTaskID() {
  return 1;
}

// 获取主页面
router.get('/:uid', function(req, res, next) {
  var result = {};
	User.findOne({name: req.params.uid}, function(err, user){

    if(err) console.log(err);
    if (!user) {
      res.send({error: 'no user'});
    } else {
      result.username = user.name;
      var boardsName = [];
      var tasks = [];
      for (bid in user.boards) {
        Board.findOne({id: bid.id}, function(err, board) {

          if(err) console.log(err);
          if(!board) {
            res.send({error: 'no board'});
          } else {
            boardsName.push(board.name);
            result.boardsName = boardsName;
            Board.findOne({id: user.initboard}, function(err, board) {

              if(err) console.log(err);
              if(!board){
                res.send({error: 'no board'});
              } else {
              for (tid in board.tasks) {
                if(err) console.log(err);
                if(!task) {
                  res.send({error: 'no task'});
                } else {
                    Task.findOne({id: tid.id}, function(err, task) {

                      tasks.push(task);
                      result.tasks = tasks;
                      res.send(result);
                    });
                  }
                }
              }  
            });
          }
        });
      }
    }
  });
});

// 获取某个 board
router.get('/:uid/boards/:bid', function(req, res, next) {
  User.findOne({name: req.params.uid}, function(err, user) {

    if(err) console.log(err);
    if(!user) {
      res.send({error: 'no user'});
    } else {
      Board.findOne({id: req.params.bid}, function(err, board){

        if(err) console.log(err);
        if(!board) {
          res.send({error: 'no board'});
        } else {
          var tasks = [];
          for (tid in board.tasks) {
            Task.findOne({id: tid.id}, function(err, task){

              if(err) console.log(err);
              if(!task) {
                res.send({error: 'no task'});
              } else {
                tasks.push(task);
                res.send(tasks);
              }
            });
          }
        }
      });
    }
  });
});

// 创建 board
router.post('/:uid/boards', function(req, res, next) {
  var generatedID=generateBoardID();
  var board = new Board({
    id: generatedID,
    name: req.body.name,
    tasks: [],
    members: [{
      name: req.params.uid,
      admin: true
    }]
  });

  board.save(function(err, board) {
    if(err) console.log(err);
    console.log(board);
  });

  User.findOne({name: req.params.uid}, function(err, user) {
    if(err) console.log(err);
    if(!user) {
      res.send({error: 'no user'});
    } else {
      user.boards.push({id: generatedID});
      res.send({
        error: false,
        bid: generatedID
      });
    }
  });
  res.send();
});

// 删除 board
router.delete('/:uid/boards/:bid', function(req, res, next) {
  User.findOne({name: req.params.uid}, function(err, user) {
    user.boards.pull({id: req.params.bid});
  });
  Board.remove({id: req.params.bid}, function(err) {
    if(err) console.log(err);
  });
});

// 创建新 task
router.post('/:uid/boards/:bid/tasks', function(req, res, next) {
  var generatedID = generateTaskID();
  var task = new Task ({
    id: generatedID,
    name: req.body.name,
    description: req.body.description,
    importance: req.body.importance,
    finished: false
  });

  task.save(function(err, task) {
    if(err) console.log(err);
    console.log(task);
  });

  Board.findOne({id: req.params.bid}, function(err, board) {
    if(err) console.log(err);
    if(!board) {
      res.send({error: 'no board'});
    } else {
      board.tasks.push({id: generatedID});
      res.send();
    }
  });
});

// 更新 task
router.put('/:uid/boards/:bid/tasks/:tid', function(req, res, next) {
  Task.update({id: req.params.tid}, {
    name: req.body.name,
    description: req.body.des,
    finished: req.body.finished,
    importance: req.body.importance
  }, function(err) {
    if(err) console.log(err);
  });
});

// 删除 task
router.delete('/:uid/boards/:bid/tasks/:tid', function(req, res, next) {
	Board.findOne({name: req.params.bid}, function(err, board) {
    board.tasks.pull({id: req.params.tid});
  });
  Task.remove({id: req.params.tid}, function(err) {
    if(err) console.log(err);
  });
});

// 获取 board 信息
router.get('/:uid/boards/:bid/profile', function(req, res, next) {
	User.findOne({name: req.params.uid}, function(err, user) {

    if(err) console.log(err);
    if(!user) {
      res.send({error: 'no user'});
    } else {
      Board.findOne({id: req.params.bid}, function(err, board) {

        if(err) console.log(err);
        if(!board) {
          res.send({error: 'no board'});
        } else {
          res.send(board);
        }
      });
    }
  });
});

// 修改 board 信息
router.post('/:uid/boards/:bid/profile', function(req, res, next) {

});

module.exports = router;
