function HeaderMenu($location, socket) {
  return {
    restrict: 'E',
    templateUrl: '/templates/main/header-menu.html',
    link: function(scope) {
      scope.submenu = true;
      scope.tags = [];
      socket.emit('get tags');
      socket.on('get tags', function (tags) {
        var swap = {};
        for (var i in tags) {
          var item = tags[i].names.shift();
          swap[item] = tags[i].names;
        }
        angular.forEach(swap, function(value, index) {
          scope.tags.push([index, value]);
        });
      });

      scope.updateMenuBasedOnLocation = function () {
          var prefix = $location.path().split('/')[1];
          scope.submenu = false;
          if (prefix === 'portfolio' || prefix === undefined) {
            scope.submenu = true;
          }
          return prefix;
      }
    }
  };
}

HeaderMenu.$inject = ['$location', 'socket'];

export default HeaderMenu;
