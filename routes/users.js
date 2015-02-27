var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var Board = require('../schemas/board');
var Task = require('../schemas/task');
var crypto = require('crypto');
var async = require('async');
var URLSafeBase64 = require('urlsafe-base64');

function generateBoardID() {
  var buf = crypto.randomBytes(6);
  return URLSafeBase64.encode(buf);
}

function generateTaskID() {
  var buf = crypto.randomBytes(8);
  return URLSafeBase64.encode(buf);
}

// 获取主页面
router.get('/:uid', function(req, res, next) {
  var result = {};
  result.tasks=[];
	User.findOne({name: req.params.uid}, function(err, user){

    if(err) console.log(err);
    if (user) {
      result.username = user.name;
      var boardsName = [];
      var tasks = [];
      var calls=[];
      for (var bid in user.boards.toObject()) {
        calls.push(function(callback) {
          Board.findOne({id: user.boards.toObject()[bid].id}, function(err, board) {
            if(err) console.log(err);
            boardsName.push(board.name);
            callback(null, null);
          });
        });
      }
      async.parallel([function(callback) {
        Board.findOne({id: user.initboard}, function(err, board) {
          if(err) console.log(err);
          if(board){
            for (var tid in board.tasks.toObject()) {
              calls.push(function(callback) {
                Task.findOne({id: board.tasks.toObject()[tid].id}, function(err, task) {
                  if(err) console.log(err);
                  else result.tasks.push(task);
                  callback(null, null);
                });
              });
            }
          }
          callback(null,null);
        });
      }],function(err,asyncresult) {
        async.parallel(calls, function(err, results) {
          result.boardsName = boardsName;
          res.send(result);
        });
      });
    }
  });
});

// 获取某个 board
router.get('/:uid/boards/:bid', function(req, res, next) {
  User.findOne({name: req.params.uid}, function(err, user) {

    if(err) console.log(err);
    if(user) {
      Board.findOne({id: req.params.bid}, function(err, board){
        if(err) console.log(err);
        if(board) {
          var tasks = [];
          var calls = [];
          for (var tid in board.tasks.toObject()) {
            calls.push(function(callback){
              Task.findOne({id: board.tasks.toObject()[tid].id}, function(err, task){
                if(err) console.log(err);
                if(task) {
                  tasks.push(task);
                }
                callback(null, null);
              });
            });
          }
          async.parallel(calls, function(err, reseults) {
            res.send({
              name: board.name,
              id: board.id,
              tasks: tasks
            });
          });
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
    if(user) {
      user.boards.push({id: generatedID});
      res.send({
        error: false,
        bid: generatedID
      });
    }
  });
});

// 删除 board
router.delete('/:uid/boards/:bid', function(req, res, next) {
  async.parallel([
    function(callback) {
      User.findOne({name: req.params.uid}, function(err, user) {
        user.boards.pull({id: req.params.bid});
      });
      callback(null, null);
    },
    function(callback) {
      Board.remove({id: req.params.bid}, function(err) {
        if(err) console.log(err);
      });
      callback(null, null);
    }], function(err, result) {
      if(err) console.log(err);
      else res.send({
        success: true
      });
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
    if(board) {
      board.tasks.push({id: generatedID});
      res.send({
        tid: generatedID
      });
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
	async.parallel([
    function(callback) {
      Board.findOne({name: req.params.bid}, function(err, board) {
        board.tasks.pull({id: req.params.tid});
      });
      callback(null, null);
    },
    function(callback) {
      Task.remove({id: req.params.tid}, function(err) {
        if(err) console.log(err);
      });
      callback(null, null);
    }
  ], function(err, results) {
    if(err) console.log(err);
    else res.send({
      deleted: 'success'
    });
  });
});

// 获取 board 信息
router.get('/:uid/boards/:bid/profile', function(req, res, next) {
	User.findOne({name: req.params.uid}, function(err, user) {

    if(err) console.log(err);
    if(user) {
      Board.findOne({id: req.params.bid}, function(err, board) {
        
        if(err) console.log(err);
        if(board) {
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
