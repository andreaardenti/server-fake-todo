var express = require('express');
// var app = express(); come in app.js
var router = express.Router();
var fake = require('fakeuser9');

var validation = function(req, res, next) {
    var token = req.query.token;
    if(token && !isNaN(token) && token%2 === 0) {
        return next();
    } else {
        res.status(401).json();
    }
}

router.get('/', function(req, res){
    if (req.query.name) {
        res.json(fake.findUserByName(req.query.name));
    } else {
        res.json(fake.getUsers());
    }    
});

router.get('/count', function(req, res){
    res.json({count: fake.getUsers().length });
})
router.get('/reset',validation, function(req, res){
    fake.reset();
    res.json();
})

router.get('/:id', function(req, res){
    var id = parseInt(req.params.id);
    res.json(fake.findUserById(id));
})

router.delete('/:id', validation, function(req, res){
    var id = parseInt(req.params.id);
    res.json(fake.deleteUser(id));
})

router.post('/', validation,  function(req, res){
    fake.addUser(req.body.name, req.body.surname)
    res.status(201).json();
})

module.exports = router;