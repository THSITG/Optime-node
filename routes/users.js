var express = require('express');
var router = express.Router();

// 获取主页面
router.get('/:userid', function(req, res, next) {
	
});

// 获取某个 board
router.get('/:uid/boards/:bid', function(req, res, next) {

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
		
});

// 修改 board 信息
router.post('/:uid/boards/:bid/profile', function(req, res, next) {
		
});

module.exports = router;
