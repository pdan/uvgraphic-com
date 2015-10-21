class PortfolioController {
  constructor($scope, $routeParams, socket) {
    var query = {
      clear: true,
      sort: 'created',
      limit: 20,
      skip: 0
    };
    $scope.pagination = [];

    if ($routeParams.tag) {
      query.tags = [$routeParams.tag];
    }

    if ($routeParams.page) {
      query.skip = ($routeParams.page - 1) * 20;
    }

    socket.init(['pagination project']);
    socket.init(['query count']);

    socket.on('pagination project', function(docs) {
      $scope.projects = docs;
    });
    socket.on('query count', function(count) {
      var pagination = Math.ceil(count / query.limit);
      var page = $routeParams.page > 0 ? $routeParams.page : 1;

      for (var i = 1; i <= pagination; i++) {
        var activeClass = page == i ? "active" : "";
        $scope.pagination.push({
          number: i,
          class: activeClass
        });
      }

      // if ($scope.pagination.length > 10) {
      //   $scope.pagination.splice(page * 1 + 5, $scope.pagination.length - page * 1 + 5 - 20);
      // }
    });

    socket.emit('pagination project', query);
    socket.emit('query count', query);
  }
}

PortfolioController.$inject = ['$scope', '$routeParams', 'socket'];

export default PortfolioController
