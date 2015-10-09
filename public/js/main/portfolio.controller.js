class PortfolioController {
  constructor($scope, socket) {
    // var socket = socket.socket;
    socket.emit('pagination project',{
      clear: true,
      sort: 'date'
    });
    socket.on('pagination project', function(docs) {
      console.log(docs);
      $scope.projects = docs;
    });
  }
}

PortfolioController.$inject = ['$scope', 'socket'];

export default PortfolioController
