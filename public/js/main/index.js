// import '/packages/github/OwlFonk/OwlCarousel@1.3.2/owl-carousel/owl.carousel.css!';
// import '/packages/github/OwlFonk/OwlCarousel@1.3.2/owl-carousel/owl.theme.css!';
import '../../css/main.css!';

import app from 'js/main/app';
import $ from 'jquery';
import 'OwlFonk/OwlCarousel';

// Boot angularjs to body
// angular.bootstrap(document.getElementsByTagName('body'), ['portfolio']);

angular.element(document).ready(function() {
  angular.bootstrap(document, [app.name], { strictDi: true });
});

// Clean up and show app after loading
$('#loader').removeClass('active');
$('#main').removeAttr('style');
