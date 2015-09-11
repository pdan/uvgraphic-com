define(['admin/app', 'admin/socket.factory', 'angular', 'jquery'], function(app, io, angular, $) {
  app.controller('mainController', function($scope, socket) {

    $scope.newStatus = false;
    $scope.loader = false;
    $scope.projects = [];
    $scope.pagination = {
      skip: 0,
      limit: 10
    };
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

    socket.on('pagination project', function(docs) {
      angular.forEach(docs, function(doc, i, obj) {
        $scope.projects.push(doc);
        if (obj.length === i + 1) {
          $scope.infiniteScrollBusy = false;
        }
      });
    });

    socket.on('remove project', function(doc) {
      console.log(doc);

      for (var i in $scope.projects) {
        if (doc._id === $scope.projects[i]._id) {
          console.log($scope.projects[i]._id);
          $scope.projects.splice(i, 1);
        }
      }
    });

    $scope.createProject = function() {
      socket.emit('create project');
    };

    $scope.editProject = function(index) {
      $scope.newStatus = true;
      $scope.project = angular.copy($scope.projects[index]);
    };

    $scope.closeEdit = function() {
      $scope.newStatus = false;
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
