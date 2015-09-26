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
    .when('/portfolio/:tag', {
      templateUrl: '/templates/main/portfolio.html',
      controller: 'PortfolioController'
    })
    .otherwise({
      redirectTo: '/'
    });
};
