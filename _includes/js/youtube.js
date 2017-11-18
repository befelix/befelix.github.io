function resize(element) {

  var height = element.height();
  var width = element.width();

  // Scale down/up div size to fit surrounding container
  var new_width = element.parents('div').width();
  var new_height = height * new_width / width;

  // Set css for element
  element.css({"width": new_width, "height": new_height});
}

var videos = $("div.youtube");

// Rescale youtubes to fit page width
videos.each(function() {
  resize($(this))
});

// Disable video link
$("a.videolink").click(function() { return false; });

// Add click to the video
videos.click(function () {

  var placeholder = $(this);
  var div = placeholder.parent();

  var url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1";

  // Add starttime if defined
  var starttime = placeholder.attr('start');
  if (typeof starttime !== 'undefined') {
      url += "&start=" + starttime;
  }

  placeholder.replaceWith("<iframe class='embed-responsive-item' width='560' height='315' src='" + url + "' frameborder='0' allowfullscreen></iframe>");

  div.addClass('embed-responsive embed-responsive-16by9');
});

// Make sure elements stay correct size afte resizing
$(window).resize(function () {
  $("div.youtube").each(function() {
    resize($(this))
  });
});
