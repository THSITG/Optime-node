var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var Board = require('../schemas/board');
var Task = require('../schemas/task');

// 获取主页面
router.get('/:uid', function(req, res, next) {
  var callback = {};
	User.findOne({name: req.params.uid}, function(err, user){

    if(err) console.log(err);
    if (!user) {
      res.send({error: 'no user'});
    } else {
      callback.username = user.name;
      var boardsName = [];
      var tasks = [];
      for (bid in user.boards) {
        Board.findOne({id: bid.id}, function(err, board) {

          if(err) console.log(err);
          if(!board) {
            res.send({error: 'no board'});
          } else {
            boardsName.push(board.name);
            callback.boardsName = boardsName;
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
                      callback.tasks = tasks;
                      res.send(callback);
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
		
});

// 删除 board
router.delete('/:uid/boards/:bid', function(req, res, next) {
		
});

// 创建新 task
router.post('/:uid/boards/:bid/tasks', function(req, res, next) {
		
});

// 更新 task
router.put('/:uid/boards/:bid/tasks/:tid', function(req, res, next) {
		
});

// 删除 task
router.delete('/:uid/boards/:bid/tasks/:tid', function(req, res, next) {
		
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
