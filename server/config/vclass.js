var util = require('./utilities');

var virtualClass = function(app) {
    // virtualClass CRUD's
    // Create
    app.post('/vclass', function(req, res){

        var Vclass = {
            name:               req.body.name,
            users:              [],
            teacher:            req.body.teacher,
            coverImg:           req.body.CoverImg,
            previewImg:         req.body.previewImg,
            previewDescription: req.body.previewDescription,
            description:        req.body.description,
            youtubeUrl:         "",
            active:             true
        };
        model.VClass.schema.create(Vclass, function(err,vclass){
            if (err){
                console.log(err);
                res.json(util.response(vclass,err));
            }else{
                res.json(util.response(vclass));
            }
        });
    });
    // read
    app.get('/vclass/:vclass?', function(req, res){

        if(!!req.params.vclass){
            model.VClass.schema.findById(req.params.vclass, function(err, vclass){
                if (err){
                    console.log(err);
                    res.json(util.response(vclass,err));
                }else{
                    res.json(util.response(vclass));
                }
            });
        }else{
            model.VClass.schema.find( function(err, vclass){
                if (err){
                    console.log(err);
                    res.json(util.response(vclass,err));
                }else{
                    res.json(util.response(vclass));
                }
            });
        }
    });
    // Update
    app.put('/vclass/', function(req, res){
        if(!!req.body._id){
             var Vclass = {
                name:               req.body.name,
                teacher:            req.body.teacher,
                coverImg:           req.body.coverImg,
                previewImg:         req.body.previewImg,
                previewDescription: req.body.previewDescription,
                description:        req.body.description
            };
            model.VClass.schema.findByIdAndUpdate(req.body._id, Vclass, function(err, vclass){
                if (err){
                    console.log(err);
                    res.json(util.response(vclass,err));
                }else{
                    res.json(util.response(vclass));
                }
            });
        }else{
            res.json(util.response(Vclass,"update error!"));
        }
    });

    // Delete
    app.delete('/vclass/', function(req, res){
        
        if(!!req.body._id){
            model.VClass.schema.findByIdAndRemove(req.body._id,function(err, vclass){
                if (err){
                    console.log(err);
                    res.json(util.response(vclass,err));
                }else{
                    res.json(util.response(vclass));
                }
            });
        }else{
            res.json(util.response(vclass,"delete error!"));
        }
    });

    // addUserToClass
    app.put('/vclass/addUser', function(req, res){
        if(!!req.body._id){
            model.VClass.schema.findByIdAndUpdate(
                req.body._id,
                {$push: {
                    "users":{
                        "uid" :req.body.user,
                        "passcode": "quepotente504"
                    }
                }},
                {safe: true, upsert: true, new : true},
                function(err, vclass) {
                    console.log(err);
                    res.json(util.response(vclass));
                }
            );
        }else{
            res.json(util.response(vclass,"add User To Class error!"));
        }
    });

    // removeUserToClass
    app.put('/vclass/removeUser', function(req, res){
        if(!!req.body._id){
            model.VClass.schema.findByIdAndUpdate(
                req.body._id,
                {$pull: {"users":{"uid":req.body.user} }},
                {safe: true, upsert: true, new : true},
                function(err, vclass) {
                    console.log(err);
                    res.json(util.response(vclass));
                }
            );
        }
    });
    
    // Update url
    app.put('/vclass/youtube', function(req, res){
        console.log(req.body);
        if(!!req.body._id){

            model.VClass.schema.findByIdAndUpdate(req.body._id, { "youtubeUrl": req.body.youtubeUrl }, function(err, vclass){
                if (err){
                    console.log(err);
                    res.json(util.response(vclass,err));
                }else{
                    res.json(util.response(vclass));
                }
            });
        }else{
            res.json(util.response({},"update youtube URL error!"));
        }
    });
    
    // access vid
    app.get('/vclass/access/:vid', function(req, res){
        if(!!req.params.vid){
            model.VClass.schema.findById( req.params.vid, function(err, vclass){
               res.json(util.response(vclass.youtubeUrl));
            });
        }
    });
};

module.exports = virtualClass;