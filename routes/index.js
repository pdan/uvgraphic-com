var Project = require('../libs/project');
var siofu = require('socketio-file-upload');

module.exports = exports = function(app, db, router, io) {
  var project = new Project(db);
  app.use(siofu.router);
  router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
  });

  app.get('/', function(res, req) {
    req.render('index.html');
  });

  app.get('/admin', function(res, req) {
    req.render('admin.html');
  });

  io.on('connection', function(socket) {
    socket.on('create project', function(doc) {
      project.create(doc, function(result) {
        socket.emit('create project', result);
      });
    });

    socket.on('update project', function(doc) {
      project.update(doc, function(result) {
        socket.emit('update project', result);
      });
    });

    socket.on('get project', function(doc) {
      project.get(doc, function(result) {
        socket.emit('get project', result);
      });
    });

    socket.on('remove project', function(doc) {
      project.remove(doc, function(result) {
        socket.emit('remove project', result);
      });
    });

    socket.on('pagination project', function(doc) {
      project.pagination(doc, function(result) {
        socket.emit('pagination project', result);
      });
    });

    socket.on('files upload', function(doc) {
      project.upload(doc, function(result) {
        var uploader = new siofu();
        uploader.dir = '/public/images/' + result._id;
        uploader.listen(socket);
        socket.emit('pagination project', result);
      });
    });
  });

  app.use('/api', router);
};
