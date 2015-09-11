define(['admin/app'], function(app) {
  app.directive('newPost', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/admin/new-post.html'
    };
  });
});
