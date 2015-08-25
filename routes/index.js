var Project = require('../libs/project');

module.exports = exports = function(app, db, router, io) {
  var project = new Project(db);

  router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
  });

  app.get('/', function(res, req) {
    req.render('index.html');
  });

  io.on('connection', function(socket) {
    socket.on('create project', function(doc) {
      project.create(doc, function(result) {
        socket.emit('create project', result);
      });
    });

    socket.on('get project', function(doc) {
      project.get(doc, function(result) {
        socket.emit('get project', result);
      });
    });

    socket.on('pagination project', function(doc) {
      project.pagination(doc, function(result) {
        socket.emit('pagination project', result);
      });
    });
  });

  app.use('/api', router);
};
