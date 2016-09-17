var mongoose = require('mongoose');
    model = require('./model'),
    util = require('./utilities'),
    Schema = mongoose.Schema;

var controller = function(app) {
    var db = mongoose.connect('mongodb://localhost/TE-REST');

    require('./users')(app, model.Users.schema);

};

module.exports = controller;
