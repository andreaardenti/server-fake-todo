var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var todos = require('./routes/todos');
app.use('/todos', todos);


app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), function () {
    console.log('Server has started! http://localhost:' + app.get('port') + '/');
});
module.exports = app;