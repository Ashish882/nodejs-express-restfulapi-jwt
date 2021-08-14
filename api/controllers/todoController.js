const Todo = require("../models/todoModel");


exports.listAllTodos = (req,res) => {
Todo.find({}, (err,todo) => {
    if(err){
        res.status(500).send(err);
    }

    res.status(200).send(todo);
});
};

exports.createNewTodo = (req,res) => {
let newTodo = new Todo(req.body);
newTodo.save((err,todo)=>{
    if(err){
        res.status(500).send(err);
    }
    res.status(201).send(todo);
});

};


exports.deleteTodo = (req,res) =>{
    Todo.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            return res.status(500).send(err);
        }

        res.status(200).json({message:"Todo deleted"});
    })
}