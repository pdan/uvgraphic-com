define(['admin/app'], function(app) {
  app.directive('timeToStamp', function() {
    return {
      require: 'ngModel',
      link: function(scope, ele, attr, ngModel) {

        ngModel.$formatters.push(function (value) {
          return new Date(value);
        });

        ngModel.$parsers.push(function(value) {
          return new Date(value).getTime();
        });
      }
    };
  });
});
