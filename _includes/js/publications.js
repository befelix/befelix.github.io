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
  // code for closing tabs
  $('div.reference a.nav-link').click(function (e) {
    var tab = $(this);
    if(tab.hasClass('active')){
      window.setTimeout(function(){
        $(tab.attr('href')).removeClass('active')
        tab.removeClass('active')
      }, 1);
    }
  });

  // add code for close button on mobile
  $('a.duplicate').click(function () {
    var parent = $(this).attr('dublicate-target')
    $(parent).trigger('click')
  })

  // Make video point to tab instead
  $('a.video-tab').each(function () {
    var link = $(this);
    var video_url = link.attr('href');
    var video_id = video_url.split('?v=')[1];

    var key = link.closest('div.reference').attr('data-key');
    var target = '#' + key + '-video';

    link.attr('data-toggle', 'tab');
    link.attr('href', target);

    // load / unload video as desired
    link.click(function() {
      var iframe = $(target).children('iframe');
      if (link.hasClass('active')) {
        iframe.remove();
      } else {
        $(target).append("<iframe class='embed-responsive-item' width='560' height='315' src='https://www.youtube.com/embed/"
                         + video_id
                         + "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
      };
    });
  });
});
