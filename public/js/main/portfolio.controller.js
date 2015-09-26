class PortfolioController {
  constructor($routeParams, $location) {
    this.parameter = 'Welcome To This Site';
    if ($routeParams.tag === 'home') {
      $location.url('/');
    }
  }
}

PortfolioController.$inject = ['$routeParams', '$location'];

export default PortfolioController
