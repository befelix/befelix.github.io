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

  var parent = $(this).parent()

  $(this).replaceWith("<iframe width='560' height='315'         src='https://www.youtube.com/embed/" +
                      this.id +
                      "?autoplay=1' frameborder='0' allowfullscreen></iframe>")

  // Fit the video to the surrounding element (div)
  parent.fitVids();
});

// Make sure elements stay correct size afte resizing
$(window).resize(function () {
  $("div.youtube").each(function() {
    resize($(this))
  });
});
