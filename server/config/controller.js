var mongoose = require('mongoose');
    model = require('./model'),
    Schema = mongoose.Schema;

var controller = function(app) {
    var db = mongoose.connect('mongodb://localhost/TE-REST');

    require('./users')(app, model.User);

};

module.exports = controller;