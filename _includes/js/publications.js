var hash = window.location.hash;

// Default value for hash
if ($(hash).length == 0) {
  hash = "#1d_example";
}

// Expand the wanted element
$(hash).addClass("active");

// Activate the current link
$("a.jupyter").removeAttr("href");

// Highlight the element that we've nacigated too
var hash = window.location.hash;
$(hash).parent().css("background-color", "#e6e6ff");

$(document).ready(function(){
  $('div.reference a.nav-link').click(function (e) {
    var tab = $(this);
    if(tab.hasClass('active')){
      window.setTimeout(function(){
        $(tab.attr('href')).removeClass('active')
        tab.removeClass('active')
      }, 1);
    }
  });

  $('a.duplicate').click(function () {
    var parent = $(this).attr('dublicate-target')
    $(parent).trigger('click')
  })
})
