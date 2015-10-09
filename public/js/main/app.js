import angular from 'angular';
import  'angular-route';
import 'sroze/ngInfiniteScroll';

import routes from 'js/main/routes';

import HomeController from 'js/main/home.controller';
import AboutController from 'js/main/about.controller';
import ContactController from 'js/main/contact.controller';
import PortfolioController from 'js/main/portfolio.controller';
import ProjectController from 'js/main/project.controller';

import HeaderMenu from 'js/main/header-menu.directive';

import SocketService from 'js/main/socket.service';

import MainPicture from 'js/main/main-picture.filter';

let app = angular
  .module('portfolio', ['infinite-scroll', 'ngRoute'])
  .config(routes)
  .controller('HomeController', HomeController)
  .controller('AboutController', AboutController)
  .controller('PortfolioController', PortfolioController)
  .controller('ContactController', ContactController)
  .controller('ProjectController', ProjectController)
  .directive('headerMenu', HeaderMenu)
  .service('socket', SocketService)
  .filter('MainPicture', MainPicture);

export default app;
