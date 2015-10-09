import '../../css/main.css!';

import app from 'js/main/app';
import $ from 'jquery';

// Boot angularjs to body
// angular.bootstrap(document.getElementsByTagName('body'), ['portfolio']);

angular.element(document).ready(function() {
  angular.bootstrap(document, [app.name], { strictDi: true });
});

// Clean up and show app after loading
$('#loader').removeClass('active');
$('#main').removeAttr('style');
