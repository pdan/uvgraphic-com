System.config({
  baseURL: '/',
  defaultJSExtensions: true,
  transpiler: 'none',
  paths: {},
  map: {
    'io': '/socket.io/socket.io',
    'angular': '/js/vendor/angular.min',
    'jquery': '/js/vendor/jquery.min',
    'semantic': '/semantic/semantic.min',
    'css': '/js/vendor/css.js',
    'admin': '/js/admin/',
    'ngInfiniteScroll': '/js/vendor/ng-infinite-scroll'
  },
  meta: {
    'angular': {
      deps: ['jquery']
    },
    'semantic': {
      deps: [
        'jquery',
        '/css/admin.css!css'
      ]
    }
  }
});
