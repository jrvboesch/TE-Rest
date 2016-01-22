var mongoose = require('mongoose');
    model = require('./model'),
    Schema = mongoose.Schema;

var controller = function(app) {
    var db = mongoose.connect('mongodb://localhost/userExample');

    //get Example
    app.get('/getUser/:lookup', function(req, res){
        if(!!req.params.lookup){
            mongoose.model(model.User.name).find({email: { $regex: '.*'+req.params.lookup+'.*', $options: 'i' }}, function(err, lookup) {
                res.json(lookup);
            });
        }else{
             res.status(404).sendFile( app.locals.root_path + '/views/404/index.html');
        }
    });

    //Post Example
    app.post('/createUser', function(req, res){
         var user = new model.User.schema({
            name:     eq.body.name,
            user:    eq.body.user,
            email:    eq.body.email,
            password: eq.body.password
        });
        mongoose.model(model.User.name).add(user, function(err,data){
            if (err){
                console.log(err);
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    //update teams by name
    app.post('/updateUser', function(req, res){
        mongoose.model(model.User.name).find({email: { $regex: req.body.email, $options: 'i' }}, function(err, user){
            if (err){
                console.log(err);
                res.json(err);
            }else{

                user.save(function (err, data) {
                if (err){ 
                    console.log(err);
                    res.json(err);
                }else 
                    res.json(data);
                    console.log('Saved : ', data );
                });
            }
        });
    });

};

module.exports = controller;
































