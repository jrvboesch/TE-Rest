var mongoose = require('mongoose');
var Schema = mongoose.Schema;
	//Model father
	var model={};

    //VClass Schema Example
    VClass = Schema({
        name:     String,
        users:    [Schema.Types.ObjectId],
        teacher:    Schema.Types.ObjectId,
        CoverImg: String,
        previewImg: String,
        previewDescription: String,
        description: String,
        youtubeUrl: String,
        active: Boolean

    });

    //Users Schema Example
    Users = Schema({
        user:    String,
        password:    String,
        email:    String,
        role:    Number
    });

    model.VClass ={
        'schema': mongoose.model('vclass', VClass),
        'name': 'vclass'
    };

    model.Users ={
        'schema': mongoose.model('users', Users),
        'name': 'users'
    };

    // Exports all Schemas
    module.exports = model;
    