class ContactController {
  constructor($scope, socket) {
    var socket = socket.socket;
  }
}

ContactController.$inject = ['$scope', 'socket'];

export default ContactController
