module.exports = (app, User) => {

    app.get('/users', (req, res) => {
    	User.find((err, users) => { res.json(err ? err : users); });
    });

    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, users) => {
		    res.json(err ? err : users);
		});
    });

    app.post('/users', (req, res) => {
        User.create(req.body, (err, data) => { res.json(err ? err : data); });
    });

    app.put('/users', (req, res) => {
        User.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
        	res.json(err ? err : data);
        });
    });

    app.delete('/users', (req, res) => {
    	User.findByIdAndRemove(req.body._id, err => {
        	res.json(err ? err : 'Bien.');
        });
    });

    app.post('/users/login', (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) res.json(err);

            if (!user) res.json({ success: false, message: 'Usuario no existe.' });

            else
                res.json(user.password === req.body.password ? user : { success: false, message: 'Clave incorrecta.' });
        });
    });

};