var fs = require('fs');
var path = require('path');

    
var router = function(app) {
  require('./controller')(app);

  app.get('/assets/*',function(req, res) {
    var fileName = app.locals.root_path + req.path;
      res.sendFile(fileName, function (err) {
        if (err) {
          console.log('/assets/* :'+fileName);
          console.log(err);
          res.status(err.status);
        }
        else {
          console.log('Sent:', req.path);
        }
      });
    });


  app.get('/node_modules/*',function(req, res) {
    var fileName = app.locals.root_path + req.path;
      res.sendFile(fileName, function (err) {
        if (err) {
          console.log('/node_modules/* :'+fileName);
          console.log(err);
          res.status(err.status);
        }
        else {
          console.log('Sent:', req.path);
        }
      });
    });

  app.get('/', function(req, res, next){
     var options = {
      root: app.locals.root_path,
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    res.sendFile('/index.html', options, function (err) {
      if (err) {
        res.redirect('/');
      }
      else {
        console.log('Sent');
      }
    });
  });

  app.get('/*',function(req, res) {
      console.log('/*');
      res.status(404).redirect('/');
    });
};

module.exports = router;