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
$(hash).parent().css("background-color", "#e6e6ff");

$(document).ready(function(){

  // Make video point to tab instead and add information
  $('a.video-tab').each(function () {
    var link = $(this);
    var video_url = link.attr('href');
    var video_id = video_url.split('?v=')[1];

    var key = link.closest('div.reference').attr('data-key');
    var target = '#' + key + '-video';

    link.attr('data-toggle', 'tab');
    link.attr('href', target);
    link.attr('video-id', video_id)
  });

  // handle the closing of active tabs
  $('div.reference a.nav-link').click(function (e) {
    var link = $(this);

    // Make sure that the current video stops playing
    if (link.is('[data-toggle]')) {
      // if we're switching to another tab -- remove the video.
      link.closest('div.reference').find('iframe').remove();
    } else if (link.is('[target]')) {
      // if we're going to an external website, let's untoggle any
      // active video tab
      // TODO: Pausing or reloading without autoplay would be better
      link.closest('div.reference').find('a.active.video-tab').trigger('click');
    }

    // Remove the active field (allow closing of open tabs)
    if (link.hasClass('active')) {
      // timeout to allow bootstrap code to finish
      window.setTimeout(function(){
        $(link.attr('href')).removeClass('active')
        link.removeClass('active')
      }, 1);
    } else if (link.hasClass('video-tab')) {
      // Add the current video
      var target = link.attr('href');
      var video_id = link.attr('video-id');
      $(target).append("<iframe class='embed-responsive-item' width='560' height='315' src='https://www.youtube.com/embed/"
                       + video_id
                       + "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
    };
  });

  // add code for close button on mobile
  $('a.duplicate').click(function () {
    var parent = $(this).attr('dublicate-target')
    $(parent).trigger('click')
  })
});
