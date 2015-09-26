import angular from 'angular';
import  'angular-route';
import 'sroze/ngInfiniteScroll';

import routes from 'js/main/routes';

import HomeController from 'js/main/home.controller';
import AboutController from 'js/main/about.controller';
import PortfolioController from 'js/main/portfolio.controller';

let app = angular
  .module('portfolio', ['infinite-scroll', 'ngRoute'])
  .config(routes)
  .controller('HomeController', HomeController)
  .controller('AboutController', AboutController)
  .controller('PortfolioController', PortfolioController);

export default app;
