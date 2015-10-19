class ProjectController {
  constructor($scope, $routeParams, socket) {
    var query = {
      _id: $routeParams.id
    };
    $scope.project = {};
    socket.init(['get project']);
    socket.emit('get project', query);
    socket.on('get project', function(doc) {
      $scope.project = doc;
    });
  }
}

ProjectController.$inject = ['$scope', '$routeParams', 'socket'];

export default ProjectController
