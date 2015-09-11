define([
  'angular',
  'jquery',
  'admin/app',
  'admin/main.controller',
  'admin/new-post.directive',
  'admin/posts-list.directive',
  'admin/socket.factory',
  'semantic'
], function(angular, $, app) {

  // Boot angularjs to body
  angular.bootstrap(document.getElementsByTagName('body'), ['portfolio-admin']);

  // Clean up and show app after loading
  $('#loader').removeClass('active');
  $('#main').removeAttr('style');

  // Boot Semnatic-UI elements
  $('.ui.dropdown').dropdown();
});
