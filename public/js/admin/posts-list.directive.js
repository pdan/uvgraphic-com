define(['admin/app'], function(app) {
  app.directive('postsList', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/admin/posts-list.html'
    };
  });
});
