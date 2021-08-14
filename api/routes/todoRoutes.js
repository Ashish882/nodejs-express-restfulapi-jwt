'use strict';

module.exports = function (app){
    var todoList = require('./controllers/todoController');
    var userHandlers = require('./controllers/authController');

    //app and post request for /todo endpoints

     app.route("/todos").get(todoList.listAllTodos)
    .post(userHandlers.loginRequired,todoList.createNewTodo);

    app.route("/todo/:id").put(userHandlers.loginRequired,todoList.updateTodo)
    .delete(userHandlers.loginRequired,todoList.deleteTodo);

    app.route("auth/register")
    .post(userHandlers.register);

    app.route("auth/login")
    .post(userHandlers.signIn);
}