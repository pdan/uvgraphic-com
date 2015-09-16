define(['admin/app'], function(app) {
  app.directive('tagsToArray', function() {
    return {
      require: 'ngModel',
      link: function(scope, ele, attr, ngModel) {
        // view to model
        ngModel.$parsers.push(function(tags) {
          'use strict';

          var cleaned = [];

          var tagsArray = tags.split(',');

          for (var i = 0; i < tagsArray.length; i++) {
            if ((cleaned.indexOf(tagsArray[i]) === -1) && tagsArray[i] !== '') {
              cleaned.push(tagsArray[i].replace(/\s/g, ''));
            }
          }

          return cleaned;
        });
      }
    };
  });
});
