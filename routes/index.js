var Project = require('../libs/project');
var File = require('../libs/file');

module.exports = exports = function(app, db, router, io) {
  var project = new Project(db);
  var file = new File();

  router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
  });

  app.get('/admin', function(res, req) {
    req.render('admin.html');
  });

  io.on('connection', function(socket) {

    socket.on('get tags', function(doc) {
      project.getTags(doc, function(result) {
        socket.emit('get tags', result);
      });
    });

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

    socket.on('query count', function(doc) {
      project.queryCount(doc, function(result) {
        socket.emit('query count', result);
      });
    });

    socket.on('files upload', function(doc) {
      file.saveAttachment(doc, function(result) {
        socket.emit('files upload', result);
      });
    });
  });

  // app.use('/api', router);
  app.all('/*', function(res, req) {
    if (process.env.NODE_ENV === 'production') {
      req.render('build/index.html');
      return;
    }
    req.render('index.html');
  });
};
