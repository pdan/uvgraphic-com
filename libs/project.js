var ObjectId = require('mongodb').ObjectId;

function Project(db) {
  var projects = db.collection('projects');

  this.create = function(doc, callback) {
    var project = {
      name: 'New Project',
      date: new Date().getTime()
    };
    projects.insert(project, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result.ops);
    });
  };

  this.update = function(doc, callback) {
    var query = {
      '_id': new ObjectId(doc._id)
    };

    var project = {
      '$set': {
        name: doc.name,
        description: doc.description,
        pictures: doc.pictures,
        tags: doc.tags,
        created: doc.created
      }
    };
    projects.update(query, project, function(err, result) {
      if (err) {
        throw err;
      }
      result.result._id = query._id;
      callback(result);
    });
  };

  this.get = function(doc, callback) {
    var query = {
      '_id': new ObjectId(doc._id)
    };

    projects.findOne(query, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  };

  this.remove = function(doc, callback) {
    var query = {
      '_id': new ObjectId(doc._id)
    };

    projects.remove(query, function(err, result) {
      if (err) {
        throw err;
      }

      callback({
        result: result,
        _id: doc._id
      });
    });

  };

  this.pagination = function(doc, callback) {
    var options = {
      sort: [
        [doc.sort, -1]
      ],
      skip: doc.skip,
      limit: doc.limit
    };
    projects.find({}, options).toArray(function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  };
}

module.exports = Project;
