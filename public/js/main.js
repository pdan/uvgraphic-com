define(['jquery', 'semantic'], function() {
  $('#loader').removeClass('active');
  $('#main').removeAttr('style');
  $('.ui.dropdown').dropdown();
  $('.browse.item').popup({
    inline: true,
    on: 'click',
    popup: '.ui.popup',
    position: 'bottom left',
    transition: 'fade left'
  });


  // // fix main menu to page on passing
  // $('.main.menu').visibility({
  //   type: 'fixed'
  // });
  // $('.overlay').visibility({
  //   type: 'fixed',
  //   offset: 80
  // });
  //
  // // show dropdown on hover
  // $('.main.menu  .ui.dropdown').dropdown({
  //   on: 'hover'
  // });
});
