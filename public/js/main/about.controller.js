class AboutController {
  constructor($scope) {
    $scope.init = this.init;

    return angular.extend($scope, this);
  }
}

AboutController.$inject = ['$scope'];

export default  AboutController
