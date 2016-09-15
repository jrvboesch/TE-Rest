
var controller = function(app) {
    // VClass CRUD's
    // Create
    app.post('/vclass', function(req, res){
        var vclass = new model.VClass.schema({
            name:               eq.body.name,
            users:              [],
            teacher:            eq.body.teacher,
            CoverImg:           eq.body.CoverImg,
            previewImg:         eq.body.previewImg,
            previewDescription: eq.body.previewDescription,
            description:        eq.body.description,
            youtubeUrl:         "",
            active:             false
        });

        mongoose.model(model.VClass.name).add(vclass, function(err,data){
            if (err){
                console.log(err);
                res.json(util.response(data,err));
            }else{
                res.json(util.response(data));
            }
        });
    });
    // read
    app.post('/vclass/:vclass', function(req, res){
        
        if(!!req.params.vclass){
            mongoose.model(model.User.name).find({_id: vclass}, function(err, vclass){
                
                res.json(util.response(vclass));
            });
        }else{
            mongoose.model(model.User.name).find({}, function(err, vclass){

                res.json(util.response(vclass));
            });
        }
    });
    // Update
    app.post('/vclass/update/:vclass', function(req, res){
        if(!!req.params.vclass){
            mongoose.model(model.User.name).find({email: { $regex: '.*'+req.params.vclass+'.*', $options: 'i' }}, function(err, vclass) {
                vclass.name =               eq.body.name,
                vclass.users =              eq.body.users,
                vclass.CoverImg =           eq.body.CoverImg,
                vclass.previewImg =         eq.body.previewImg,
                vclass.previewDescription = eq.body.previewDescription,
                vclass.description =        eq.body.description,
                vclass.active =             eq.body.active;

                vclass.save();
                res.json(util.response(vclass));
            });
        }else{
             res.status(404).sendFile( app.locals.root_path + '/views/404/index.html');
        }
    });
    // Delete
    app.post('/vclass/remove/:vclass', function(req, res){
        
        if(!!req.params.vclass){
            //remove from db
        }
    });
};

module.exports = vclass;