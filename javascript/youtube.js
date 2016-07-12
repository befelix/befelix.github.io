$(document).ready(function () {

  function resize(element) {

    var height = element.height();
    var width = element.width();

    // Scale down/up div size to fit surrounding container
    var new_width = element.parent().width();
    var new_height = height * new_width / width;

    // Set css for element
    element.css({"width": new_width, "height": new_height});
  }

  var videos = $("div.youtube");

  // Rescale youtubes to fit page width
  videos.each(function() {
    // Current width/height of the enclosing div
    resize($(this))

    // Replace div with thumbs
    $(this).append('<img class="thumb" src="http://i.ytimg.com/vi/' + $(this).attr("id") + '/hqdefault.jpg"></img>');

    // Add play button overlay
    $(this).append('<div class="play"></div>');
  });

  // Add click to the video im
  videos.click(function () {

    var parent = $(this).parent()

    $(this).replaceWith("<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
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
});
