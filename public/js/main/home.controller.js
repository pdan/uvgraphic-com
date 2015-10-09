class HomeController {
  constructor($scope, socket) {
    var socket = socket.socket;
  }
}

HomeController.$inject = ['$scope', 'socket'];

export default HomeController
