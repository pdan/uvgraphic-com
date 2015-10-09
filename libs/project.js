var ObjectId = require('mongodb').ObjectId;

function Project(db) {
  var projects = db.collection('projects');
  var tags = db.collection('tags');

  this.create = function(doc, callback) {
    var self = this;
    var project = {
      name: 'New Project',
      date: new Date().getTime()
    };
    projects.insert(project, function(err, result) {
      if (err) {
        throw err;
      }

      self.updateTags();
      callback(result.ops);
    });
  };

  this.update = function(doc, callback) {
    var self = this;
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
      self.updateTags();
      callback(result);
    });
  };

  this.updateTags = function(callback) {
    tags.drop();

    projects.aggregate([{
      '$match': {
        'tags': {
          '$exists': true
        }
      }
    }, {
      '$group': {
        '_id': '$tags'
      }
    }]).each(function(err, doc) {
      if (err) {
        throw err;
      }
      if (doc) {
        tags.insert({
          names: doc._id
        }, function(err, result) {
          if (err) {
            throw err;
          }
        });
      } else if (callback) {
        callback();
      }
    });
  };

  this.getTags = function(doc, callback) {
    var query = {};

    tags.find(query).toArray(function(err, result) {
      if (err) {
        throw err;
      }

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
    var self = this;
    var query = {
      '_id': new ObjectId(doc._id)
    };

    projects.remove(query, function(err, result) {
      if (err) {
        throw err;
      }

      self.updateTags();
      callback({
        result: result,
        _id: doc._id
      });
    });

  };

  this.pagination = function(doc, callback) {
    var query = {};
    var options = {
      sort: [
        [doc.sort, -1]
      ],
      skip: doc.skip,
      limit: doc.limit
    };

    if (doc.clear) {
      query['pictures.main'] = true;
    }

    if (doc.tags && doc.tags.constructor === Array) {
      query.tags = {'$in': doc.tags};
    }

    projects.find(query, options).toArray(function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  };
}

module.exports = Project;
