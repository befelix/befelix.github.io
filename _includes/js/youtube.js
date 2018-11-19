function resize(element) {

  var height = element.height();
  var width = element.width();

  // Scale down/up div size to fit surrounding container
  var new_width = element.parents('div').width();
  var new_height = height * new_width / width;

  // Set css for element
  element.css({"width": new_width, "height": new_height});
}

var all_videos = $("div.video");

// Rescale youtubes to fit page width
all_videos.each(function() {
  resize($(this))
});

// // Make sure elements stay correct size afte resizing
$(window).resize(function () {
    $("div.video").each(function() {
        resize($(this))
    });
});

// Disable video link
$("a.videolink").click(function() { return false; });

// Add click to the youtube video
$("div.video.youtube").click(function () {

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


// Add click to the ETH videos
$("div.video.eth").click(function () {

    var placeholder = $(this);
    var div = placeholder.parent();

    placeholder.replaceWith("<iframe class='embed-responsive-item' width='560' height='315' src='" + this.id + "' frameborder='0' allowfullscreen></iframe>");
    div.addClass('embed-responsive embed-responsive-16by9');
});
