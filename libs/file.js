var fs = require('fs');
var path = require('path');

function File() {
  this.saveAttachment = function(doc, callback) {

    var filename = new Date().getTime() + '' + process.hrtime()[1]; // Generate a file name by date
    var dirPath = path.join('public', 'uploads', doc._id); // Create directory path
    var base64Image;

    // Create directory path if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, 0766, function(err) {
        if (err) {
          throw err;
        }
      });
    }

    // Filter based 64 image by type
    if (doc.type === 'png') {
      base64Image = doc.based64Image.replace(/^data:image\/png;base64,/, '');
    } else {
      base64Image = doc.based64Image.replace(/^data:image\/jpeg;base64,/, '');
    }

    // Write file into the disk
    fs.writeFile(path.join(dirPath, filename + '.' + doc.type), base64Image, 'base64', function(err) {
      if (err) {
        throw err;
      }
      callback({
        _id: doc._id,
        filename: filename + '.' + doc.type
      });
    });

  };
}

module.exports = File;
