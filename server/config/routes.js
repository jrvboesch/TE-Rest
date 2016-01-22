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
          res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
        }
        else {
          console.log('Sent:', req.path);
        }
      });
    });

  app.get('/views/inc/*',function(req, res) {
    var fileName = app.locals.root_path + req.path;
      res.sendFile(fileName, function (err) {
        if (err) {
          console.log('/views/* :'+fileName);
          console.log(err);
          res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
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
          res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
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
        console.log('/');
        console.log(err);
        res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
      }
      else {
        console.log('Sent');
      }
    });
  });

  app.get('/views/:view?', function(req, res, next){
     var options = {
      root: app.locals.root_path + '/views/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    if(!!req.params.view)
      view = req.params.view;
    else
      view='home';

    console.log('seccion: ' + view);
    res.sendFile(view + '/index.html', options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
      }
      else {
        console.log('Sent:', view);
      }
    });
  });

  app.get('/:view?', function(req, res, next){
     var options = {
      root: app.locals.root_path + '/views/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    if(!!req.params.view)
      view = req.params.view;
    else
      view='home';

    console.log('seccion: ' + view);
    res.sendFile(view + '/index.html', options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).sendFile( app.locals.root_path + '/views/404/index.html');
      }
      else {
        console.log('Sent:', view);
      }
    });
  });
  app.get('/*',function(req, res) {
      console.log('/*');
      res.status(404).sendFile( app.locals.root_path + '/views/404/index.html');
    });
};

module.exports = router;