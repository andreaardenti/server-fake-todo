var express = require('express');
// var app = express(); come in app.js
var router = express.Router();
var idGen = 0;
var todos = [];
var users = ["tizio", "caio", "sempronio"];

router.get('/', function(req, res){
    if (req.query.completed) {
        var temp = [];
        for(var todo of todos) {
            if (String(todo.completed) === req.query.completed) {
                temp.push(todo);
            }
        }
        return res.json(temp);
    } else if (req.query.byUser) {
        var temp = [];
        for(var todo of todos) {
            if (todo.assignedTo === req.query.byUser) {
                temp.push(todo);
            }
        }
        return res.json(temp);
    }
    res.json(todos);
});

router.get('/count', function(req, res){
    res.json({count: todos.length });
})
router.get('/reset', function(req, res){
    todos = [];
    idGen = 0;
    res.json();
})

router.get('/:id', function(req, res){
    for(var todo of todos) {
        if (todo.id === parseInt(req.params.id)) {
            res.json(todo);
        }
    }
    res.status(404).json('To do not found');
})

router.delete('/:id', function(req, res){
    for(var i=0;  i < todos.length; i++) {
        if (todos[i].id === parseInt(req.params.id)) {
            todos.splice(i, 1);
            return res.json('To do deleted');
        }
    }
    res.status(404).json('To do not found');
})

router.post('/',  function(req, res){
    if (users.indexOf(req.body.assignedTo) === -1) {
        return res.status(400).json('assignedTo not supported');
    }
    todos.push({
        id: idGen++,
        name: req.body.name,name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
        assignedTo: req.body.assignedTo,
    })
    res.status(201).json();
})

module.exports = router;