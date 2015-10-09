class ProjectController {
  constructor($scope, socket) {
    var socket = socket.socket;
    console.log('project');
  }
}

ProjectController.$inject = ['$scope', 'socket'];

export default ProjectController
