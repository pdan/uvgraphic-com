import app from 'js/main/app';
import $ from 'jquery';

// Boot angularjs to body
angular.bootstrap(document.getElementsByTagName('body'), ['portfolio']);

// Clean up and show app after loading
$('#loader').removeClass('active');
$('#main').removeAttr('style');
