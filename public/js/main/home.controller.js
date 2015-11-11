class HomeController {
  constructor($scope, socket, $timeout) {
    var query = {
      clear: true,
      sort: 'created',
      limit: 8,
      skip: 0
    };
    socket.init(['pagination project']);
    socket.init(['query count']);

    socket.on('pagination project', function(docs) {
      $scope.carousel = docs;
      $timeout(function() {
        $(".owl-carousel").owlCarousel({
          navigation: true,
          slideSpeed: 300,
          autoPlay: true,
          stopOnHover: true,
          rewindNav: false,
          pagination: false,
          singleItem: true,
          lazyLoad: true,
          rtl: true,
          navigationText: [
            '<i class="angle inverted big right icon"></i>',
            '<i class="angle inverted big left icon"></i>'
          ]
        });
      });

      query.sort = 'date';
      socket.init(['pagination project']);
      socket.init(['query count']);
      socket.emit('pagination project', query);
      socket.on('pagination project', function(docs) {
        $scope.projects = docs;
      });

    });
    socket.emit('pagination project', query);
  }
}

HomeController.$inject = ['$scope', 'socket', '$timeout'];

export default HomeController
