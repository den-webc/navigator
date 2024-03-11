$(document).ready(function() {
  
  // $("body").delegate('.js-collapse', "click", function(e) {
  //   if(e.target.tagName !== 'INPUT') {
  //     $(e.currentTarget.parentElement).toggleClass("open");
  //   }
  // });

  $("body").delegate('.js-collapse', "click", function(e) {

    if(e.target.closest('.collapse__header-buttons') !== null && e.target.tagName == 'INPUT') { return; }

    const collapse = e.target.closest(".collapse");

    if(collapse.classList.contains('collapse--disabled')) { return; }

    $(e.currentTarget.parentElement).toggleClass("open");

  });

  Fancybox.bind("[data-fancybox]", {});

});