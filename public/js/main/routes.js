routing.$inject = ['$routeProvider', '$locationProvider'];

export default function routing($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
      templateUrl: '/templates/main/home.html',
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: '/templates/main/about.html',
      controller: 'AboutController'
    })
    .when('/contact', {
      templateUrl: '/templates/main/contact.html',
      controller: 'ContactController'
    })
    .when('/project/:id', {
      templateUrl: '/templates/main/project.html',
      controller: 'ProjectController'
    })
    .when('/portfolio', {
      templateUrl: '/templates/main/portfolio.html',
      controller: 'PortfolioController'
    })
    .when('/portfolio/:tag', {
      templateUrl: '/templates/main/portfolio.html',
      controller: 'PortfolioController'
    })
    .otherwise({
      redirectTo: '/'
    });
};
