var ObjectId = require('mongodb').ObjectId;

function Project(db) {
  var projects = db.collection('projects');

  this.create = function(doc, callback) {
    var project = {
      name: doc.name,
      description: doc.description,
      pictures: [],
      date: doc.created,
      tags: doc.tags,
      created: new Date().getTime()
    };
    projects.insert(project, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result.ops);
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
