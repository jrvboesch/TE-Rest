var mongoose = require('mongoose');
var Schema = mongoose.Schema;
	//Model father
	var model={};

    //Users Schema Example
    Users = Schema({
        name:     String,
        user:    String,
        email:    String,
        password: String
    });

    model.Users ={
        'schema': mongoose.model('users', Users),
        'name': 'users'
    };

    // Exports all Schemas
    module.exports = model;
    