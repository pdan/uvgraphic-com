define(['admin/app', 'admin/socket.factory', 'angular', 'jquery'], function(app, io, angular, $) {
  app.controller('mainController', function($scope, socket) {

    $scope.newStatus = false;
    $scope.loader = false;
    $scope.projects = [];
    $scope.pagination = {
      skip: 0,
      limit: 10
    };
    $scope.images = [];
    $scope.infiniteScrollBusy = false;

    socket.on('create project', function(data) {
      $scope.projects.unshift(data[0]);
    });

    socket.on('update project', function(doc) {
      if (doc.ok) {
        $scope.newStatus = false;
        for (var i in $scope.projects) {
          if (doc._id === $scope.projects[i]._id && doc._id === $scope.project._id) {
            $scope.projects[i] = angular.copy($scope.project);
          }
        }
      }
      $scope.switchLoader(false);
    });

    socket.on('files upload', function(doc) {
      if ($scope.project.pictures === undefined || $scope.project.pictures === null) {
        $scope.project.pictures = [];
      }
      if ($scope.project._id === doc._id) {
        $scope.project.pictures.push({
          filename: doc.filename
        });
      }
    });

    socket.on('pagination project', function(docs) {
      angular.forEach(docs, function(doc, i, obj) {
        $scope.projects.push(doc);
        if (obj.length === i + 1) {
          $scope.infiniteScrollBusy = false;
        }
      });
    });

    socket.on('remove project', function(doc) {

      for (var i in $scope.projects) {
        if (doc._id === $scope.projects[i]._id) {
          $scope.projects.splice(i, 1);
        }
      }
    });

    $scope.createProject = function() {
      socket.emit('create project');
    };

    $scope.editProject = function(index) {
      $scope.newStatus = true;
      $scope.infiniteScrollBusy = true;
      $scope.project = angular.copy($scope.projects[index]);
      // $scope.project.created = new Date($scope.project.created);
    };

    $scope.setAsMainPhoto = function(index) {
      angular.forEach($scope.project.pictures, function(value) {
        value.main = false;
      });
      $scope.project.pictures[index].main = true;
    };

    $scope.removePhoto = function(index) {
      $scope.project.pictures.splice(index, 1);
    };

    $scope.closeEdit = function() {
      $scope.newStatus = false;
      $scope.infiniteScrollBusy = false;
      $scope.images = [];
    };

    $scope.cancelEditProject = function() {
      $scope.project = {};
      $scope.closeEdit();
    };

    $scope.switchLoader = function(action) {
      if (action) {
        $('#internalLoader').addClass('active');
        return true;
      }
      $('#internalLoader').removeClass('active');
    };

    $scope.updateProject = function() {
      $scope.switchLoader(true);
      socket.emit('update project', $scope.project);
    };

    $scope.uploadImages = function(element) {
      var ImageLoader = function(imageIndex) {

        return function(evt) {
          $scope.images[imageIndex].src = evt.target.result;
          window.gsm = evt;
          socket.emit('files upload', {
            _id: $scope.project._id,
            name: $scope.images[imageIndex].fileName,
            type: $scope.images[imageIndex].fileType,
            based64Image: evt.target.result
          });
          $scope.$apply();
        };
      };

      for (var i = 0; i < element.files.length; i++) {
        var imageType = element.files[i].type.match('image/(png|jpeg)');
        if (imageType === null) {
          continue;
        }

        var imageIndex = $scope.images.push(new Image());
        $scope.images[imageIndex - 1].fileName = element.files[i].name;
        $scope.images[imageIndex - 1].fileType = imageType[1];
        var reader = new FileReader();
        reader.onloadend = new ImageLoader(imageIndex - 1);
        //And now, read the image and base64
        reader.readAsDataURL(element.files[i]);
      }
    };

    $scope.getProjects = function() {
      socket.emit('pagination project', {
        sort: 'date',
        limit: $scope.pagination.limit,
        skip: $scope.pagination.skip * $scope.pagination.limit
      });
      $scope.pagination.skip++;
      $scope.infiniteScrollBusy = true;
    };
    $scope.getProjects();

    $scope.removeProject = function(index) {
      // Disable remove button to prevent to multi-removing
      $('#postsList .item .remove-project').eq(index).attr('disabled', '');
      socket.emit('remove project', {
        _id: $scope.projects[index]._id
      });
    };
  });
});
