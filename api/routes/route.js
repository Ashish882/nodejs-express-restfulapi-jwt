var express = require('express');
var router = express.Router();
var todoList = require('../controllers/todoController');
var userHandlers = require('../controllers/authController');

//app and post request for /todo endpoints
 router.get("/",todoList.listAllTodos);

//  router.get("/todos",todoList.listAllTodos)
//  .post(userHandlers.loginRequired,todoList.createNewTodo);

// app.route("/todo/:id").put(userHandlers.loginRequired,todoList.updateTodo)
// .delete(userHandlers.loginRequired,todoList.deleteTodo);
router.post('/auth/register',userHandlers.register);
router.post('/auth/login',userHandlers.signIn);

router.post('/mytest',userHandlers.mytest);

router.get('/test', function (req, res) {
    res.send(' home page');
  })

  

  module.exports = router;
